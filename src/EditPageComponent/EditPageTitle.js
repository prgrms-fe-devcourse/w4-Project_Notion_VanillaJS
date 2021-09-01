export default function EditPageTitle({
  targetElement,
  onSave,
  initialState,
  changeHeader,
}) {
  const editPageTitleElement = document.createElement("h1");
  editPageTitleElement.className = "editor-title";
  editPageTitleElement.contentEditable = true;
  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.render = () => {
    const { title } = this.state;
    editPageTitleElement.textContent = title;
    targetElement.appendChild(editPageTitleElement);
  };

  editPageTitleElement.addEventListener("keyup", () => {
    onSave(this.state.id);
    const title = editPageTitleElement.textContent;
    changeHeader(title);
  });
}
