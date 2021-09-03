export default function TextBlock({ targetElement }) {
  const textBlockElement = document.createElement("div");
  textBlockElement.contentEditable = true;
  textBlockElement.className = "editor-text-block";
  targetElement.appendChild(textBlockElement);
  textBlockElement.textContent = "new";
  textBlockElement.draggable = true;
  this.block = textBlockElement;

  textBlockElement.addEventListener("dragstart", (e) => {
    e.target.style.opacity = "0.5";
  });

  textBlockElement.addEventListener("dragend", (e) => {
    e.target.style.opacity = "";
  });
}
