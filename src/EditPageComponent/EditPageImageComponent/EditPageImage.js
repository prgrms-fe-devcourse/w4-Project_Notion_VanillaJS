import EditPageImageChange from "./EditPageImageChange.js";
export default function EditPageImage({
  targetElement,
  onSaveImage,
  initialState,
}) {
  const editPageImageContainerElemnet = document.createElement("div");
  const editPageImageElement = document.createElement("img");
  editPageImageElement.className = "editor-image";
  editPageImageContainerElemnet.className = "editor-image-container";
  editPageImageContainerElemnet.appendChild(editPageImageElement);

  const changeImage = (url) => {
    editPageImageElement.src = url;
    onSaveImage();
  };
  this.state = initialState || {
    image: "/2048px-Solid_white.svg.png",
  };
  this.setState = (nextState) => {
    this.state = nextState || {
      image: "/2048px-Solid_white.svg.png",
    };
    this.render();
  };
  this.render = () => {
    const { image } = this.state;
    targetElement.appendChild(editPageImageContainerElemnet);
    editPageImageElement.src = image;
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
