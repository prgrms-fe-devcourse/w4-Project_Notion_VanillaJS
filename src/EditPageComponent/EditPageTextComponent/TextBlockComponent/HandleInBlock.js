export default function HandleInBlock({ targetElement, initialState }) {
  const handleInBlock = document.createElement("div");
  handleInBlock.contentEditable = false;
  this.state = initialState || "::";
  this.render = () => {
    handleInBlock.textContent = this.state;
    targetElement.prepend(handleInBlock);
  };

  this.render();

  handleInBlock.className = "handle-in-block";
  this.element = handleInBlock;
}
