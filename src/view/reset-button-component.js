import { AbstractComponent } from "../framework/view/abstract-component.js";

export default class ResetButtonComponent extends AbstractComponent {
    get template() {
        return `<button class="clear_btn">Очистить корзину</button>`;
    }
}