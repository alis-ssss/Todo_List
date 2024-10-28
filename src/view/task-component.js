import {createElement} from '../framework/render.js';
import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTaskComponentTemplate(task) {
    return (
        `<li class="task">
            ${task}
        </li>`
    );
}

export default class TaskComponent extends AbstractComponent  {
    constructor(task) {
        super();
        this.task = task.title;
    }

    get template() {
        return createTaskComponentTemplate(this.task);
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