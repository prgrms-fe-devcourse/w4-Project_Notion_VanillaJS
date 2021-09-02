export default function EditPageImageChange({ targetElement, changeImage }) {
  const editPageImageChangeElement = document.createElement("div");
  editPageImageChangeElement.className = "change-image";
  targetElement.appendChild(editPageImageChangeElement);
  editPageImageChangeElement.textContent = "Change Backgournd Image";

  this.hide = () => {
    editPageImageChangeElement.classList.add("hide");
  };
  this.show = () => {
    editPageImageChangeElement.classList.remove("hide");
  };
  this.hide();

  editPageImageChangeElement.addEventListener("click", () => {
    const result = prompt("이미지 url을 입력하세요.");
    changeImage(result);
  });
}
