import Document from "./Document.js";
export default function Sidebar({ $target, initialState }) {
  if (!new.target) {
    throw new Error("Sidebar new 연산자 누락!");
  }

  const $sidebar = document.createElement("div");

  $target.appendChild($sidebar);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $sidebar.innerHTML = `${this.state
      .map((document) => Document(document))
      .join("")}`;
  };

  this.render();
}
