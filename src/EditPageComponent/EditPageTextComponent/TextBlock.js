export default function TextBlock({ targetElement }) {
  const textBlockElement = document.createElement("div");
  textBlockElement.contentEditable = true;
  textBlockElement.tabIndex = 0;
  textBlockElement.className = "editor-text-block";
  targetElement.appendChild(textBlockElement);
  textBlockElement.draggable = true;
  this.element = textBlockElement;

  textBlockElement.addEventListener("dragstart", (e) => {
    e.target.style.opacity = "0.5";
  });

  textBlockElement.addEventListener("dragend", (e) => {
    e.target.style.opacity = "";
  });
}
