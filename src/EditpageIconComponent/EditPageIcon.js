import EditPageIconSelector from "./EditPageIconSelector.js";
export default function EditPageIcon({
  targetElement,
  initialState,
  changeHeaderIcon,
}) {
  const iconContainerElement = document.createElement("div");
  const editPageIconElement = document.createElement("div");
  iconContainerElement.className = "icon-container";
  editPageIconElement.className = "editor-icon";
  iconContainerElement.appendChild(editPageIconElement);

  const iconList = ["❤️", "🦈", "⛱"];
  this.state = initialState || { icon: "" };

  this.setState = (nextState) => {
    this.state = nextState || { icon: "" };
    this.render();
  };
  const selectIcon = (icon) => {
    editPageIconSelector.toggleHideClass();
    editPageIconElement.textContent = icon;
    changeHeaderIcon(icon);
  };

  this.render = () => {
    const { icon } = this.state;
    targetElement.appendChild(iconContainerElement);
    editPageIconElement.textContent = icon;
  };
  const editPageIconSelector = new EditPageIconSelector({
    targetElment: iconContainerElement,
    selectIcon,
    initialState: iconList,
  });

  iconContainerElement.addEventListener("click", () => {
    editPageIconSelector.toggleHideClass();
  });
}
