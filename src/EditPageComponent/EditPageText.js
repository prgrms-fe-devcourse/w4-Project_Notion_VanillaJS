import TextBlock from "./TextBlock.js";

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
    targetElement.appendChild(editPageContentElement);
    editPageContentElement.innerHTML = this.state.text;
  };

  editPageContentElement.addEventListener("keydown", (e) => {
    onSave(this.state.id);
    if (e.key !== "Enter" || e.shiftKey) return;
    e.preventDefault();
    const newBlock = new TextBlock({ targetElement: editPageContentElement });
    newBlock.block.focus();
    giveChildIndexId(editPageContentElement);
  });
  const giveChildIndexId = (document) => {
    let index = 0;
    document.childNodes.forEach((v) => {
      if (v.className !== "editor-text-block") return;
      v.dataset.id = index++;
    });
  };
}
