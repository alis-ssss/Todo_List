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

export default class TasksListComponent extends AbstractComponent {
  constructor({ status, label, onTaskDrop }) {
    super();
    this.status = status;
    this.label = label;
    this.#setDropHandler(onTaskDrop);
  }

  get template() {
    return createTaskListComponentTemplate(this.status, this.label);
  }

  #setDropHandler(onTaskDrop) {
    const container = this.element.querySelector(".task-list");
    container.addEventListener("dragover", (event) => {
      event.preventDefault();

      const dropZone = event.target.closest(".task");
      if (dropZone) {
        dropZone.classList.add("highlight");
      }
    });

    container.addEventListener("dragleave", (event) => {
      const dropZone = event.target.closest(".task");
      if (dropZone) {
        dropZone.classList.remove("highlight");
      }
    });

    container.addEventListener("drop", (event) => {
      event.preventDefault();
      const taskId = event.dataTransfer.getData("text/plain");

      onTaskDrop(taskId, this.status);
      
      const dropZone = event.target.closest(".task");

      if (dropZone) {
        dropZone.classList.remove("highlight");
      }
    });
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
