import HeaderComponent from "./view/header-component.js";
import FormAddTaskComponent from "./view/form-add-task-component.js";
import TaskListComponent from "./view/task-list-component.js";
import TaskComponent from "./view/task-component.js";
import TaskboardComponent from "./view/taskboard-component.js";
import { render, RenderPosition } from "./framework/render.js";

const bodyContainer = document.querySelector(".board-app");
const formContainer = document.querySelector(".add-task");
const taskboardContainer = document.querySelector(".taskboard");

// Отрисовка заголовка
render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);

// Отрисовка формы добавления задачи
render(new FormAddTaskComponent(), formContainer);

// Отрисовка доски задач
const taskboardComponent = new TaskboardComponent();
render(taskboardComponent, taskboardContainer, RenderPosition.AFTERBEGIN);

const taskListComponent1 = new TaskListComponent("Название");
render(taskListComponent1, taskboardComponent.getElement());

const taskComponent11 = new TaskComponent("Задача");
render(taskComponent11, taskListComponent1.getTaskListElement());
const taskComponent12 = new TaskComponent("Задача");
render(taskComponent12, taskListComponent1.getTaskListElement());
const taskComponent13 = new TaskComponent("Задача");
render(taskComponent13, taskListComponent1.getTaskListElement());

const taskListComponent2 = new TaskListComponent("Название");
render(taskListComponent2, taskboardComponent.getElement());

const taskComponent21 = new TaskComponent("Задача");
render(taskComponent21, taskListComponent2.getElement());
const taskComponent22 = new TaskComponent("Задача");
render(taskComponent22, taskListComponent2.getElement());
const taskComponent23 = new TaskComponent("Задача");
render(taskComponent23, taskListComponent2.getElement());

const taskListComponent3 = new TaskListComponent("Название");
render(taskListComponent3, taskboardComponent.getElement());

const taskComponent31 = new TaskComponent("Задача");
render(taskComponent31, taskListComponent3.getElement());
const taskComponent32 = new TaskComponent("Задача");
render(taskComponent32, taskListComponent3.getElement());
const taskComponent33 = new TaskComponent("Задача");
render(taskComponent33, taskListComponent3.getElement());

const taskListComponent4 = new TaskListComponent("Название");
render(taskListComponent4, taskboardComponent.getElement());

const taskComponent41 = new TaskComponent("Задача");
render(taskComponent41, taskListComponent4.getElement());
const taskComponent42 = new TaskComponent("Задача");
render(taskComponent42, taskListComponent4.getElement());
const taskComponent43 = new TaskComponent("Задача");
