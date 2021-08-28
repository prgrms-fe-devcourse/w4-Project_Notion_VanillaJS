import Document from "./Document.js";

export default function Sidebar({ $target, initialState }) {
  if (!new.target) {
    throw new Error();
  }

  const $sidebar = document.createElement("ul");
  $sidebar.className = "notion-sidebar";

  $target.appendChild($sidebar);

  this.state = initialState;

  this.render = () => {
    this.state.forEach((data) => {
      new Document({ $target: $sidebar, initialState: data });
    });
  };

  this.render();
}
