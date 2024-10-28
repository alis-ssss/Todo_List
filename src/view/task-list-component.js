import { createElement } from "../framework/render.js";
import { StatusLabel } from "../const.js";

function createTaskListComponentTemplate(status) {
  return `
        <div class="tasks-cont ${status}">
            <span>${StatusLabel[status]}</span>
            <ul class="task-list">
            </ul>
        </div>`;
}

export default class TaskListComponent {
  constructor(status) {
    this.status = status;
    this.element = null;
  }

  getTemplate() {
    return createTaskListComponentTemplate(this.status);
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
