import { displayDocumentList } from "../utils/displayList.js";
import { push } from "../utils/router.js";

export default function PostList({ $target, initialState }) {
  const $documentList = document.createElement("div");
  $documentList.className = "document-list";
  $target.appendChild($documentList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $documentList.innerHTML = `
            <button name ="add-btn" data-id = "null" ><i class="fas fa-plus"></i>페이지 추가</button>
            ${displayDocumentList(this.state)}
        `;
  };

  $documentList.addEventListener("click", (e) => {
    let { target } = e;
    if(!target.getAttribute('name')){
      target = target.closest('button')
    }
    const name = target.getAttribute("name");
    console.log(target)
    if (name) {
      
      push({
        type: name,
        id: target.dataset.id,
      });
    }
  });
}
