import { createElement } from "../framework/render.js";
import { AbstractComponent } from "../framework/view/abstract-component.js";

function createFormAddTaskComponentTemplate() {
  return `<form class="add-task__form" aria-label="Форма добавления задачи">
            <label for="add-task">Новая задача</label>
            <div class="add-task__input-wrapper">
                <input type="text" name="task-name" id="add-task" placeholder="Название задачи..." required>
                <button class="add-task__button button" type="submit">
                    <span>Добавить</span>
                </button>
            </div>
        </form>`;
}

export default class FormAddTaskComponent extends AbstractComponent  {
  get template() {
    return createFormAddTaskComponentTemplate();
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
