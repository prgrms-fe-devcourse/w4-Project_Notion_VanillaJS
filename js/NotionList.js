export default function NotionList({ $target, initialState, onDocClick, onAdd, onRemove, documentData }) {
  const $notionList = document.createElement("div");
  $notionList.className = "notion_list card";

  $target.appendChild($notionList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  }


  const getDocuments = (docs) => {
    return `
        <ul>
            ${docs.map(doc => `
               <li data-id=${doc.id}><span>${doc.title}</span>
                <button class="addBtn btn btn-outline-primary">추가</button> 
                <button class="removeBtn btn btn-outline-danger">삭제</button>
               </li>
               ${doc.documents.length ? getDocuments(doc.documents) : ""}
            `).join("")
      }
        </ul>
    `;
  }

  this.render = () => {
    $notionList.innerHTML = "<div class='card-header'><b>📋 이미란님의 노션</b><button class='addRootBtn btn btn-success'>새로 추가</button></div><br><br>";
    $notionList.innerHTML += getDocuments(this.state);
  }

  this.render();

  $notionList.addEventListener("click", (e) => {
    e.preventDefault();
    const $li = e.target.closest("li");
    if ($li) {
      const { id } = $li.dataset;
      if (e.target.classList.contains("addBtn")) {
        onAdd(id);
      } else if (e.target.classList.contains("removeBtn")) {
        onRemove(id);
      } else {
        onDocClick(id);
      }

    } else {
      if (e.target.classList.contains("addRootBtn")) {
        onAdd(null);
      }
    }
  })
}
