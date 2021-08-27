export default function Nav({
  $target,
  initialState,
  onSelecte,
  onCreate,
  onRemove,
}) {
  const $nav = document.createElement("nav");
  $target.appendChild($nav);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.render = () => {
    $nav.innerHTML = ""; // 렌더링이 호출될 경우 초기화
    const $documentContainer = document.createElement("ul");
    $documentContainer.className - "document-container";
    $nav.appendChild($documentContainer);
    this.showChildDocuments = (
      // 문서목록, 부모문서를 입력받아 ul태그로 트리구조로 입력하는 재귀함수
      documents = this.state,
      $parent = $documentContainer
    ) => {
      for (const child of documents) {
        const ul = document.createElement("ul");
        const addButton = document.createElement("button");
        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-document";
        deleteButton.textContent = "x";
        addButton.className = "new-child-document";
        addButton.textContent = "+";
        ul.textContent = child.title;
        ul.id = child.id;
        ul.append(addButton);
        ul.prepend(deleteButton);
        $parent.appendChild(ul);
        if (child.documents.length > 0)
          this.showChildDocuments(child.documents, ul);
      }
    };
    this.showChildDocuments();

    const addDocument = document.createElement("button"); //루트에 새파일을 추가하는 버튼
    addDocument.className = "new-document";
    addDocument.textContent = "새문서 추가하기";
    $documentContainer.appendChild(addDocument);
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
        onSelecte(targetDocumentId);
    }
  });
}
