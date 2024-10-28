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

export default class FormAddTaskComponent extends AbstractComponent {
    constructor({ onClick }) {
        super();
        this._handleClick = onClick;
        this.element.addEventListener('submit', this._clickHandler.bind(this)); 
    }

    get template() {
        return createFormAddTaskComponentTemplate();
    }

    _clickHandler(evt) {
        evt.preventDefault();
        const input = this.element.querySelector('#add-task');
        const taskTitle = input.value.trim();
        if (!taskTitle) return;

        this._handleClick(taskTitle); 
        input.value = ''; 
    }
}