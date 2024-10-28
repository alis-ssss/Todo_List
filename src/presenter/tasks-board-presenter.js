import TasksListComponent from "../view/task-list-component.js";
import TaskComponent from "../view/task-component.js";
import TaskBoardComponent from "../view/taskboard-component.js";
import { render } from "../framework/render.js";

export default class TasksBoardPresenter {
  tasksBoardComponent = new TaskBoardComponent();

  constructor({ boardContainer, tasksModel }) {
    this.boardContainer = boardContainer;
    this.tasksModel = tasksModel;
  }

  init() {
        render(this.tasksBoardComponent, this.boardContainer);
        
        const tasks = this.tasksModel.getTasks();
        // Группируем задачи по статусу
        const groupedTasks = tasks.reduce((acc, task) => {
            acc[task.status] = acc[task.status] || [];
            acc[task.status].push(task);
            return acc;
        }, {});

        for (const status in groupedTasks) {
            const tasksListComponent = new TasksListComponent(status); // Передае�� статус в компонент
            render(tasksListComponent, this.tasksBoardComponent.getElement());
            
            groupedTasks[status].forEach(taskData => {
                const taskComponent = new TaskComponent(taskData); // Передаем данные задачи в компонент
                render(taskComponent, tasksListComponent.getElement());
            });
        }
    }
}
