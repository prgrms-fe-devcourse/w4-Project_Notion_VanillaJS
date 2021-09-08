export default function TextInBlock({ targetElement, initialState }) {
  const textInBlock = document.createElement("div");
  this.state = initialState || "텍스트를 입력하세요 ";

  this.setState = (nextState) => {
    this.state = nextState || "텍스트를 입력하세요";
    this.render();
  };

  this.render = () => {
    targetElement.appendChild(textInBlock);
    textInBlock.setAttribute("data-placeholder", this.state);
  };
  this.element = textInBlock;
  this.render();
  textInBlock.className = "text-in-block";
}
