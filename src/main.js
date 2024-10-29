import HeaderComponent from "./view/header-component.js";
import FormAddTaskComponent from "./view/form-add-task-component.js";
import TasksBoardPresenter from "./presenter/tasks-board-presenter.js";
import TasksModel from "./model/tasks-model.js";
import { render, RenderPosition } from "./framework/render.js";
import TasksApiService from "./tasks-api-service.js";

const END_POINT = "https://672100c398bbb4d93ca70e11.mockapi.io/";
const bodyContainer = document.querySelector(".board-app");
const tasksBoardContainer = document.querySelector(".taskboard");
const formContainer = document.querySelector(".add-task");

const tasksModel = new TasksModel({
  tasksApiService: new TasksApiService(END_POINT),
});

const tasksBoardPresenter = new TasksBoardPresenter({
  boardContainer: tasksBoardContainer,
  tasksModel: tasksModel,
});

const formAddTaskComponent = new FormAddTaskComponent({
  onClick: (title) => {
    tasksModel.addTask(title);
  },
});

render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);
render(formAddTaskComponent, formContainer, RenderPosition.AFTERBEGIN);
tasksBoardPresenter.init();
