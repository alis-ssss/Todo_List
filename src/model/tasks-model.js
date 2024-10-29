import { generateId } from "../utils.js";
import { tasks } from "../mock/task.js";

export default class TasksModel {
  #boardTasks = tasks;
  #observers = [];

  get tasks() {
    return this.#boardTasks;
  }

  addTask(title) {
    const newTask = {
      title,
      status: "backlog",
      id: generateId(),
    };
    this.#boardTasks.push(newTask);
    this._notifyObservers();
    return newTask;
  }

  clearBasket() {
    this.#boardTasks = this.#boardTasks.filter(
      (task) => task.status !== "basket"
    );
    this._notifyObservers();
  }

  updateTaskStatus(taskId, newStatus, position) {
    const taskIndex = this.#boardTasks.findIndex((task) => task.id == taskId);
    if (taskIndex !== -1) {
      const task = this.#boardTasks[taskIndex];

      this.#boardTasks.splice(taskIndex, 1);

      task.status = newStatus;

      this.#boardTasks.splice(position, 0, task);

      this._notifyObservers();
    }
  }

  addObserver(observer) {
    this.#observers.push(observer);
  }

  removeObserver(observer) {
    this.#observers = this.#observers.filter((obs) => obs !== observer);
  }

  _notifyObservers() {
    this.#observers.forEach((observer) => observer());
  }
}
