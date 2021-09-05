import { dragEvent } from "./blockDragAndDrop.js";
export default function TextBlock({ targetElement }) {
  const textBlockElement = document.createElement("div");
  textBlockElement.contentEditable = true;
  textBlockElement.tabIndex = 0;
  textBlockElement.className = "editor-text-block";
  targetElement.appendChild(textBlockElement);
  this.element = textBlockElement;

  dragEvent(textBlockElement);
}
