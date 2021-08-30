export default function Nav({
  $target,
  initialState,
  onSelecte,
  onCreate,
  onRemove,
}) {
  const toggle = (id) => {
    const documents = document.getElementById(id);
    documents.childNodes.forEach((node) => {
      if (node.tagName !== "UL") return;
      node.classList.toggle("hide");
      window.localStorage.setItem(node.id, node.className);
    });
  };

  const giveAttribute = (child, ul, addButton, deleteButton) => {
    deleteButton.className = "delete-document";
    deleteButton.textContent = "x";
    addButton.className = "new-child-document";
    addButton.textContent = "+";
    ul.textContent = child.title;
    ul.id = child.id;
    ul.className = window.localStorage.getItem(child.id) || "";
    ul.append(addButton);
    ul.prepend(deleteButton);
  };

  const $nav = document.createElement("nav");
  $target.appendChild($nav);

  this.state = initialState || null;

  this.setState = (nextState) => {
    this.state = nextState || null;
    this.render();
  };
  this.render = () => {
    $nav.innerHTML = "";
    const $documentContainer = document.createElement("ul");
    $documentContainer.className = "document-container";
    $nav.appendChild($documentContainer);

    this.makeChildDocuments = (
      // 문서목록, 부모문서를 입력받아 ul태그로 트리구조로 입력하는 재귀함수
      documents = this.state,
      $parent = $documentContainer
    ) => {
      for (const child of documents) {
        const ul = document.createElement("ul");
        const addButton = document.createElement("button");
        const deleteButton = document.createElement("button");
        giveAttribute(child, ul, addButton, deleteButton);
        $parent.appendChild(ul);
        if (child.documents.length > 0)
          this.makeChildDocuments(child.documents, ul);
      }
    };
    const makeNewDocumentButton = () => {
      const addDocument = document.createElement("button");
      addDocument.className = "new-document";
      addDocument.textContent = "새문서 추가하기";
      $documentContainer.appendChild(addDocument);
    };

    makeNewDocumentButton();
    this.makeChildDocuments();
  };

  $nav.addEventListener("click", (e) => {
    const targetDocumentId = e.target.id; // 문서를 클릭했을때 해당 문서의 아이디를 저장
    const clickedButton = e.target.className; //버튼의 클래스를 통해 어떤 기능을 하는 버튼인지 확인
    const targetList = parseInt(e.target.closest("ul").id); // 문서 옆에 버튼을 눌렀을때 해당 문서의 아이디
    switch (clickedButton) {
      case "delete-document":
        onRemove(targetList);
        break;
      case "new-child-document":
        onCreate(targetList);
        break;
      case "new-document":
        onCreate();
        break;
      default:
        toggle(targetDocumentId);
        onSelecte(targetDocumentId);
    }
  });
}
