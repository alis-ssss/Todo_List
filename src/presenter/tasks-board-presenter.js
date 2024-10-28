import TasksListComponent from "../view/task-list-component.js";
import TaskComponent from "../view/task-component.js";
import TaskBoardComponent from "../view/taskboard-component.js";
import ResetButtonComponent from "../view/reset-button-component.js";
import { render, RenderPosition } from "../framework/render.js";

export default class TasksBoardPresenter {
  tasksBoardComponent = new TaskBoardComponent();

  constructor({ boardContainer, tasksModel }) {
    this.boardContainer = boardContainer;
    this.tasksModel = tasksModel;
  }

  init() {
        render(this.tasksBoardComponent, this.boardContainer);
        
        const tasks = this.tasksModel.getTasks();
        
        const groupedTasks = tasks.reduce((acc, task) => {
            acc[task.status] = acc[task.status] || [];
            acc[task.status].push(task);
            return acc;
        }, {});

        for (const status in groupedTasks) {
            const tasksListComponent = new TasksListComponent(status);
            render(tasksListComponent, this.tasksBoardComponent.getElement());
            
            groupedTasks[status].forEach(taskData => {
                const taskComponent = new TaskComponent(taskData); 
                render(taskComponent, tasksListComponent.getElement().querySelector('.task-list'), RenderPosition.BEFOREEND);
            });

            if(status == 'basket'){
              const resetButton = new ResetButtonComponent();
              render(resetButton, tasksListComponent.getElement().querySelector('.task-list'), RenderPosition.BEFOREEND);
            }
        }
    }
}
