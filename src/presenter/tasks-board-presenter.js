import TasksListComponent from "../view/task-list-component.js";
import TaskComponent from "../view/task-component.js";
import TaskBoardComponent from "../view/taskboard-component.js";
import { render } from "../framework/render.js";
import { StatusLabel } from "../const.js";
import EmptyTasksComponent from "../view/empty-tasks-component.js";

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
    // Копируем задачи из модели
    this.#boardTasks = [...this.#tasksModel];
    this.#renderBoard();
  }

  #renderTask(task, container) {
    const taskComponent = new TaskComponent(task);
    render(taskComponent, container);
  }

  #renderBoard() {
    render(this.#tasksBoardComponent, this.#boardContainer);

    // Группируем задачи по статусу
    const groupedTasks = this.#boardTasks.reduce((acc, task) => {
      acc[task.status] = acc[task.status] || [];
      acc[task.status].push(task);
      return acc;
    }, {});

    // Проходим по всем статусам из StatusLabel
    for (const status in StatusLabel) {
      const tasksListComponent = new TasksListComponent({
        status: status,
        label: StatusLabel[status], // Убедитесь, что StatusLabel определен
      });
      render(tasksListComponent, this.#tasksBoardComponent.getElement());

      // Проверяем, есть ли задачи для данного статуса
      if (!groupedTasks[status] || groupedTasks[status].length === 0) {
        const emptyTasksComponent = new EmptyTasksComponent();
        render(emptyTasksComponent, tasksListComponent.getTaskListElement());
      } else {
        groupedTasks[status].forEach((taskData) => {
          this.#renderTask(taskData, tasksListComponent.getTaskListElement());
        });
      }
    }
  }
}