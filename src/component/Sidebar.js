const getDocument = (data) => {
  const { id, title, documents } = data;

  return /*html*/ `
  <ul id = 'document-${id}'>
    <div>${title}<button class="add-btn">+</button></div>
    <li>${
      documents.length === 0
        ? "Add a Page"
        : documents.map((document) => getDocument(document)).join("")
    }</li>
  </ul>`;
};

export default function Sidebar({ $target, initialState, addDocument }) {
  if (!new.target) {
    throw new Error("Sidebar new 연산자 누락!");
  }

  const $sidebar = document.createElement("div");
  $sidebar.className = "sidebar";

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
    if (e.target.className === "sidebar") return;

    const $document = e.target.closest("ul");
    const addButton = $document.querySelector(".add-btn");
    if (e.target === addButton) {
      const [, id] = $document.id.split("-");
      addDocument(id);
    }
  });

  this.render();
}

// 실수로 열기버튼까지 구현함
// export default function getDocument(doc) {
//   const { id, title, documents } = doc;

//   return /*html*/ `
//   <ul id = 'document-${id}'>
//     <div><button class="openClose-btn">열기</button>${title}<button class="add-btn">추가</button></div>
//     <li style="display: none">${
//       documents.length === 0
//         ? "Add a Page"
//         : documents.map((document) => getDocument(document)).join("")
//     }</li>
//   </ul>`;
// }

// 실수로 열기버튼까지 구현함
// $sidebar.addEventListener("click", (e) => {
//   //e.target 배경클릭시 에러 해결하기
//   const $document = e.target.closest("ul");
//   const openCloseButton = $document.querySelector(".openClose-btn");
//   const addButton = $document.querySelector(".add-btn");

//   switch (e.target) {
//     case openCloseButton: {
//       const list = $document.querySelector("li");
//       list.style.display = list.style.display === "block" ? "none" : "block";
//       break;
//     }
//     case addButton: {
//       const nextState = [
//         {
//           id: 1,
//           title: "hi",
//           documents: [{ id: 1, title: "bye", documents: [] }],
//         },
//         {
//           id: 1,
//           title: "hello",
//           documents: [{ id: 1, title: "meto", documents: [] }],
//         },
//       ];
//       this.setState(nextState);
//       this.render();
//     }
//   }
// });
