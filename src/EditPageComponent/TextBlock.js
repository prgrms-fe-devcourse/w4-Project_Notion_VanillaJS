export default function TextBlock({ targetElement }) {
  const textBlockElement = document.createElement("div");
  textBlockElement.tabIndex = 0;
  textBlockElement.contentEditable = true;
  textBlockElement.className = "editor-text-block";
  targetElement.appendChild(textBlockElement);
  textBlockElement.draggable = true;
  this.block = textBlockElement;

  textBlockElement.addEventListener("dragstart", (e) => {
    e.target.style.opacity = "0.5";
  });

  textBlockElement.addEventListener("dragend", (e) => {
    console.log(e);
    e.target.style.opacity = "";
  });
}
