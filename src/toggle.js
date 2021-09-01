import { setItem } from "./storage.js";

const toggleChildHide = (targetElement) => {
  targetElement.childNodes.forEach((child) => {
    if (child.tagName !== "UL") return;
    child.classList.toggle("hide");
    setItem(child.id, child.classList);
  });
};
export const toggleWrap = (id) => {
  const targetElement = document.getElementById(id);
  const hasChild = targetElement.lastElementChild.tagName === "UL";
  targetElement.classList.toggle("wrap");
  if (!hasChild) {
    targetElement.classList.remove("wrap");
  }
  toggleChildHide(targetElement);
  setItem(targetElement.id, targetElement.classList);
};

export const initializeToggle = (id) => {
  const documents = document.getElementById(id);
  documents.childNodes.forEach((node) => {
    if (node.tagName !== "UL") return;
    node.classList.remove("hide");
    window.localStorage.removeItem(node.id, node.className);
  });
};
