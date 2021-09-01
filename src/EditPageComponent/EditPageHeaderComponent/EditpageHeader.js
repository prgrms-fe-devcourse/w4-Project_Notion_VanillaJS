import EditPageHeaderIcon from "./EditPageHeaderIcon.js";
export default function EditPageHeader({ targetElement }) {
  const editPageHeaderElement = document.createElement("header");
  this.state = null;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
    editPageHeaderIcon.setState(this.state.content);
  };
  this.render = () => {
    const { title } = this.state;
    editPageHeaderElement.textContent = title;
    targetElement.appendChild(editPageHeaderElement);
  };

  this.changetext = (text) => {
    editPageHeaderElement.textContent = text;
  };

  const editPageHeaderIcon = new EditPageHeaderIcon({
    targetElement: editPageHeaderElement,
    initialState: null,
  });
}
