import { generateId } from "../utils.js";
import { UpdateType, UserAction } from "../const.js";
import Observable from "../framework/observable.js";
import { render, RenderPosition } from "../framework/render.js";
import LoadingViewComponent from "../view/loading-view-component.js";

export default class TasksModel extends Observable {
  #boardTasks = [];
  #tasksApiService = null;

  constructor({ tasksApiService }) {
    super();
    this.#tasksApiService = tasksApiService;
    this.loadingView = new LoadingViewComponent();
  }

  async init() {
    try {
      const tasks = await this.#tasksApiService.tasks;
      this.#boardTasks = tasks;
    } catch (err) {
      this.#boardTasks = [];
    }
    this._notify(UpdateType.INIT);
  }

  get tasks() {
    return this.#boardTasks;
  }

  async addTask(title) {
    render(
      this.loadingView,
      document.querySelector(".board-app"),
      RenderPosition.AFTERBEGIN
    );
    const newTask = {
      title,
      status: "backlog",
      id: generateId(),
    };
    try {
      const createdTask = await this.#tasksApiService.addTask(newTask);
      this.#boardTasks.push(createdTask);
      this._notify(UserAction.ADD_TASK, createdTask);
      this.loadingView.removeElement();
      return createdTask;
    } catch (err) {
      this.loadingView.removeElement();
      console.error("Ошибка при добавлении задачи на сервер: ", err);
      throw err;
    }
  }

  deleteTask(taskId) {
    this.#boardTasks = this.#boardTasks.filter((task) => task.id !== taskId);
    this._notify(UserAction.DELETE_TASK, { id: taskId });
  }

  async clearBasket() {
    render(
      this.loadingView,
      document.querySelector(".board-app"),
      RenderPosition.AFTERBEGIN
    );
    const basketTasks = this.#boardTasks.filter(
      (task) => task.status === "basket"
    );

    try {
      await Promise.all(
        basketTasks.map((task) => this.#tasksApiService.deleteTask(task.id))
      );

      this.#boardTasks = this.#boardTasks.filter(
        (task) => task.status !== "basket"
      );
      this._notify(UserAction.DELETE_TASK, { status: "basket" });
    } catch (err) {
      console.error("Ошибка при удалении задач из корзины на сервере: ", err);
      throw err;
    }
    this.loadingView.removeElement();
  }

  hasBasketTasks() {
    return this.#boardTasks.some((task) => task.status === "basket");
  }

  async updateTaskStatus(taskId, newStatus) {
    render(
      this.loadingView,
      document.querySelector(".board-app"),
      RenderPosition.AFTERBEGIN
    );
    const task = this.#boardTasks.find((task) => task.id == taskId);
    if (task) {
      let previousStatus = task.status;
      task.status = newStatus;

      try {
        const updateTask = await this.#tasksApiService.updateTask(task);
        Object.assign(task, updateTask);
        this._notify(UserAction.UPDATE_TASK, task);
      } catch (err) {
        console.error("Ошибка при обновлении статуса задачи на сервере: ", err);
        task.status = previousStatus;
        throw err;
      }
    }
    this.loadingView.removeElement();
  }
}
