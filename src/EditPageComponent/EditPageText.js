export default function EditPageText({ targetElement, onSave, initialState }) {
  const editPageContentElement = document.createElement("div");
  editPageContentElement.contentEditable = true;
  editPageContentElement.className = "editor-text";
  this.state = initialState || { text: "" };
  this.setState = (nextState) => {
    this.state = nextState || { text: "" };
    this.render();
  };
  this.render = () => {
    editPageContentElement.textContent = this.state.text;
    targetElement.appendChild(editPageContentElement);
  };

  editPageContentElement.addEventListener("keyup", () => {
    onSave(this.state.id);
  });
}
