import { createDocument, getDocument } from "../api/api.js";
import Header from "./Header.js";
import DocumentList from "./DocumentList.js";

export default function Sidebar({ $target, onCeatedDocument }) {
  if (!new.target) {
    throw new Error("Sidebar new 연산자 누락!");
  }

  const $sidebar = document.createElement("div");
  $sidebar.className = "notion-sidebar";

  $target.appendChild($sidebar);

  this.state = [];

  new Header({ $target: $sidebar });

  const documentList = new DocumentList({
    $target: $sidebar,
    initialState: this.state,
    addDocument: async (id) => {
      const data = { title: "페이지 제목을 입력해주세요", parent: id };
      const createdDocument = await createDocument(data);
      // onCeatedDocument(createdDocument);
      this.render();
    },
  });

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = async () => {
    const nextState = await getDocument();

    documentList.setState(nextState);
  };

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
