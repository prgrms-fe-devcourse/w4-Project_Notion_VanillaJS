import { push } from "./router.js";
export default function DocumentList({
  $target,
  initialState,
  onSelect,
  onCreate,
  onRemove,
}) {
  const $documentList = document.createElement("div");
  $target.appendChild($documentList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  // tree menu 만들기
  // function createTreeView(data) {
  //   if (!data) return "";
  //   let treeMenuList = "";
  //   for (let i = 0; i < data.length; i++) {
  //     if (data[i].documents)
  //       treeMenuList +=
  //         `<li data-id=${data[i].id}>
  //         ${data[i].title}
  //         <ul>` +
  //         createTreeView(data[i].documents) +
  //         `</ul></li>`;
  //     else treeMenuList += `<li>${data[i].title}</li>`;
  //   }
  //   return `<ul>` + treeMenuList + `</ul>`;
  // }

  // tree menu 만들기 : map + 재귀
  const createTreeView = (document) => {
    return document
      .map(
        ({ id, title, documents }) => `
      <li data-id=${id} class="documentItem">${title}
      <button class="createDoc">+</button>
      <button class="removeDoc">-</button>
      ${documents.length > 0 ? `<ul>${createTreeView(documents)}</ul>` : ""}
      </li>`
      )
      .join("");
  };

  this.render = () => {
    $documentList.innerHTML = `<ul class="root">${createTreeView(
      this.state
    )}</ul>`;
  };

  this.render();

  $documentList.addEventListener("click", (e) => {
    const $li = e.target.closest("li");
    if ($li) {
      const { id } = $li.dataset;
      const { className } = e.target;
      const parent = e.target.parentNode;
      if (className === "documentItem") {
        onSelect(id);
      } else if (className === "createDoc") {
        onCreate(id);
      } else if (className === "removeDoc") {
        onRemove(id);
      }
    }
  });
}
