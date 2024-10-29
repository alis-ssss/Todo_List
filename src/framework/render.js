import { AbstractComponent } from "./view/abstract-component.js";

export const RenderPosition = {
  AFTERBEGIN: "afterbegin",
  BEFOREEND: "beforeend",
  BEFOREBEGIN: "beforebegin",
  AFTEREND: "afterend",
};

export const createElement = (template) => {
  const div = document.createElement("div");
  div.innerHTML = template;
  return div.firstElementChild;
};

export const render = (
  component,
  container,
  place = RenderPosition.BEFOREEND
) => {
  if (!(component instanceof AbstractComponent)) {
    throw new Error("Can render only components");
  }
  if (container === null) {
    throw new Error("Container element doesn't exist");
  }
  container.insertAdjacentElement(place, component.element);
};

export const remove = (component) => {
  if (!(component instanceof AbstractComponent)) {
    throw new Error("Can remove only components");
  }
  component.removeElement();
};
