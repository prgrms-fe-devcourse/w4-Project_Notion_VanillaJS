export default function EditPageHeaderIcon({ targetElement, initialState }) {
  const editPageHeaderIconElement = document.createElement("div");
  editPageHeaderIconElement.className = "editor-header-icon";

  this.state = initialState || { icon: "" };

  this.setState = (nextState) => {
    this.state = nextState || { icon: "" };
    this.render();
  };
  this.render = () => {
    const { icon } = this.state;
    editPageHeaderIconElement.textContent = icon === "✚" ? "" : icon;
    targetElement.prepend(editPageHeaderIconElement);
  };
}
