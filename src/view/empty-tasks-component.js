import { AbstractComponent } from "../framework/view/abstract-component.js";

export default class EmptyTasksComponent extends AbstractComponent {
  get template() {
    return "<div class='empty'>Перетащите карточку</div>";
  }
}
