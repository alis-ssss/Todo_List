import { createElement } from "../framework/render.js";
import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTaskboardComponentTemplate() {
  return `
    <div class="taskboard__list"></div>
  `;
}

export default class TaskboardComponent extends AbstractComponent {
  get template() {
    return createTaskboardComponentTemplate();
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
