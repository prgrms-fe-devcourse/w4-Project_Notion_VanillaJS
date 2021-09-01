export default function ADDInDocumentButton({
  targetElement,
  initialState,
  onCreate,
}) {
  this.state = initialState || null;
  const addbutton = document.createElement("button");
  addbutton.className = "add-button";
  targetElement.appendChild(addbutton);
  addbutton.innerText = "+";

  addbutton.addEventListener("click", () => {
    event.stopPropagation(addbutton);
    onCreate(this.state);
  });
}
