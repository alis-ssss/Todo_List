import { AbstractComponent } from "../framework/view/abstract-component.js";

function createNoTaskTemplate() {
  return `
        <div class="board__no-tasks">Loading...</div>
        `;
}

export default class LoadingViewComponent extends AbstractComponent {
  get template() {
    return createNoTaskTemplate();
  }
}
