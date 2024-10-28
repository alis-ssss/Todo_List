import { createElement } from "../framework/render.js";
import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTaskListComponentTemplate(status, label) {
  return `
        <div class="tasks-cont ${status}">
            <span>${label}</span>
            <ul class="task-list">
            </ul>
        </div>`;
}

export default class TaskListComponent extends AbstractComponent  {
  constructor(obj) {
    super();
    this.status = obj.status;
    this.label = obj.label;
  }

  get template() {
    return createTaskListComponentTemplate(this.status, this.label);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  getTaskListElement() {
    return this.getElement().querySelector(".task-list");
  }

  removeElement() {
    this.element = null;
  }
}
