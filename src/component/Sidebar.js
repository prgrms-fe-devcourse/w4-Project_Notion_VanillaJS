import getDocument from "./Document.js";

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
      .map((document) => getDocument(document))
      .join("")}`;
  };

  $sidebar.addEventListener("click", (e) => {
    //e.target 배경클릭시 에러 해결하기
    const $document = e.target.closest("ul");
    const openCloseButton = $document.querySelector(".openClose-btn");
    const addButton = $document.querySelector(".add-btn");

    switch (e.target) {
      case openCloseButton: {
        const list = $document.querySelector("li");
        list.style.display = list.style.display === "block" ? "none" : "block";
        break;
      }
      case addButton: {
        const nextState = [
          {
            id: 1,
            title: "hi",
            documents: [{ id: 1, title: "bye", documents: [] }],
          },
          {
            id: 1,
            title: "hello",
            documents: [{ id: 1, title: "meto", documents: [] }],
          },
        ];
        this.setState(nextState);
        this.render();
      }
    }
  });

  this.render();
}
