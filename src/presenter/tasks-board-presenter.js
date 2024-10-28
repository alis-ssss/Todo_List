import TasksListComponent from "../view/task-list-component.js";
import TaskComponent from "../view/task-component.js";
import TaskBoardComponent from "../view/taskboard-component.js";
import { render } from "../framework/render.js";
import { StatusLabel } from "../const.js";
import EmptyTasksComponent from "../view/empty-tasks-component.js";
import ResetButtonComponent from "../view/reset-button-component.js";

export default class TasksBoardPresenter {
  #boardContainer = null;
  #tasksModel = null;
  #tasksBoardComponent = new TaskBoardComponent();
  #boardTasks = [];

  constructor({ boardContainer, tasksModel }) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
  }

  init() {
    this.#boardTasks = [...this.#tasksModel];
    this.#renderBoard();
  }

  #renderTask(task, container) {
    const taskComponent = new TaskComponent(task);
    render(taskComponent, container);
  }

  #renderBoard() {
    render(this.#tasksBoardComponent, this.#boardContainer);

    
    const groupedTasks = this.#boardTasks.reduce((acc, task) => {
      acc[task.status] = acc[task.status] || [];
      acc[task.status].push(task);
      return acc;
    }, {});

    
    for (const status in StatusLabel) {
      const tasksListComponent = new TasksListComponent({
        status: status,
        label: StatusLabel[status], 
      });
      render(tasksListComponent, this.#tasksBoardComponent.getElement());

      
      if (!groupedTasks[status] || groupedTasks[status].length === 0) {
        const emptyTasksComponent = new EmptyTasksComponent();
        render(emptyTasksComponent, tasksListComponent.getTaskListElement());
      } else {
        groupedTasks[status].forEach((taskData) => {
          this.#renderTask(taskData, tasksListComponent.getTaskListElement());
        });
      }
    }
    const resetButtonComponent = new ResetButtonComponent();
    render(
      resetButtonComponent,
      this.#tasksBoardComponent.getElement().querySelector(".basket")
    );
  }
}