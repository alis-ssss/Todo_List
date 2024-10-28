import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TasksBoardPresenter from './presenter/tasks-board-presenter.js';
import TasksModel from './model/tasks-model.js';
import { render, RenderPosition } from './framework/render.js';

const bodyContainer = document.querySelector('.board-app');
const tasksBoardContainer = document.querySelector('.taskboard');
const formContainer = document.querySelector('.add-task');

const tasksModel = new TasksModel();
const tasksBoardPresenter = new TasksBoardPresenter({
    boardContainer: tasksBoardContainer,
    tasksModel: tasksModel,
});

// Компонент для добавления задачи
const formAddTaskComponent = new FormAddTaskComponent({
    onClick: (title) => {
        tasksModel.addTask(title);
    },
});

render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);
render(formAddTaskComponent, formContainer, RenderPosition.AFTERBEGIN); // Добавляем форму в тело
tasksBoardPresenter.init();