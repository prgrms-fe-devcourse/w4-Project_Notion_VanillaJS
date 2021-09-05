import TextBlock from "./TextBlockComponent/TextBlock.js";
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
    makeNewBlock();
  };

  const setCaret = (targetElement) => {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNode(targetElement);
    selection.removeAllRanges();
    selection.addRange(range);
  };
  const makeNewBlock = () => {
    const newBlock = new TextBlock({ targetElement: editPageContentElement });
    setCaret(newBlock.element);
  };

  editPageContentElement.addEventListener("keydown", (e) => {
    // onSave(this.state.id);
    if (e.key !== "Enter" || e.shiftKey) return;
    e.preventDefault();
    makeNewBlock();
  });
}
