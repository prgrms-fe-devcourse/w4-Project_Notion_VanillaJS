export default function EditPageImage({ targetElement, onSave, initialState }) {
  const editPageImageElement = document.createElement("img");
  editPageImageElement.className = "editor-image";
  this.state = initialState || { image: "" };
  this.setState = (nextState) => {
    this.state = nextState || { image: "" };
    this.render();
  };
  this.render = () => {
    const { image } = this.state;
    targetElement.appendChild(editPageImageElement);
    editPageImageElement.src = image;
  };
}
