import Store from '../../store/store2'
import Component from '../component'
import ModalComponent from '../modal/modal'
import MenuContentPart from '../menu-modal/parts/content-part/content-part'
import UtilsService from '../../services/utils-service'
import template from './header.html'
import titleTemplate from '../menu-modal/parts/title-part/title-part.html'

export default class HeaderComponent extends Component {
    mount(anchor) {
        super.mount({
            anchor,
            template
        })
        
        const warDay = UtilsService.warDay
        const daysInput = this.find('#war-day-input')
        daysInput.value = warDay
        daysInput.maxLength = warDay.toString().length
        daysInput.addEventListener('input', () => {
            daysInput.value < 1 || daysInput.value > warDay && (daysInput.value = warDay)
            Store.mut('daysInput', daysInput.value)
        })

        daysInput.addEventListener('keypress', e => e.key.length === 1 && /\D/.test(e.key) && e.preventDefault())

        const menu = this.find('#menu')
        menu.addEventListener('click', () => {
            new ModalComponent().mount({ modalData: {
                titleTemplate,
                contentRef: MenuContentPart
            }})
        })
    }
}
