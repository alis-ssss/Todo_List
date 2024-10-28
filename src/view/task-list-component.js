import { createElement } from "../framework/render.js";

function createTaskListComponentTemplate(title) {
  return `
        <div class="tasks-cont">
            <span>${title}</span>
            <ul class="task-list">
            </ul>
        </div>`;
}

export default class TaskListComponent {
  constructor(title) {
    this.title = title;
    this.element = null; 
  }

  getTemplate() {
    return createTaskListComponentTemplate(this.title);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element; 
  }

  getTaskListElement() {
    return this.getElement().querySelector('.task-list'); 
  }

  removeElement() {
    this.element = null;
  }
}