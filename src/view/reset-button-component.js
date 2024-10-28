import { createElement } from "../framework/render.js";

function createResetButtonComponent() {
  return `
    <button class="clear_btn">Очистить корзину</button>
  `;
}

export default class ResetButtonComponent {
  getTemplate() {
    return createResetButtonComponent();
  }
  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }
  removeElement() {
    this.element = null;
  }
}
