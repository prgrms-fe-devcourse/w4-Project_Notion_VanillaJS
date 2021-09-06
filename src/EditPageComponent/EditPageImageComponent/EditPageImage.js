import EditPageImageChange from "./EditPageImageChange.js";
export default function EditPageImage({
  targetElement,
  onSaveImage,
  initialState,
}) {
  const defaultImage = "/image/default-white.png";
  const editPageImageContainerElemnet = document.createElement("div");
  const editPageImageElement = document.createElement("img");
  editPageImageElement.className = "editor-image";
  editPageImageContainerElemnet.className = "editor-image-container";
  editPageImageContainerElemnet.appendChild(editPageImageElement);

  const changeImage = (url) => {
    editPageImageElement.src = url || defaultImage;
    onSaveImage();
  };
  this.state = initialState || {
    image: defaultImage,
  };
  this.setState = (nextState) => {
    this.state = nextState || {
      image: defaultImage,
    };
    this.render();
  };
  this.render = () => {
    const { image } = this.state;
    targetElement.appendChild(editPageImageContainerElemnet);
    editPageImageElement.src = image || defaultImage;
  };

  const editPageImageChange = new EditPageImageChange({
    targetElement: editPageImageContainerElemnet,
    changeImage,
  });

  editPageImageElement.addEventListener("mouseover", () => {
    editPageImageChange.show();
  });

  editPageImageElement.addEventListener("mouseleave", (e) => {
    const isChangeButton = e.relatedTarget.className === "change-image";
    if (isChangeButton) return;

    editPageImageChange.hide();
  });
}
