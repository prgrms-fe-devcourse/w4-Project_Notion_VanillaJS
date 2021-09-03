export default function DocumentList({
  $target,
  initialState,
  onSelect,
  onAddDocument,
}) {
  const $documentList = document.createElement("aside")
  $documentList.className = "docList"
  $target.appendChild($documentList)

  this.state = initialState
  this.setState = (nextState) => {
    this.state = nextState
    this.render()
    allDocuments = []
  }

  let allDocuments = []
  let documentTree = []
  let titleIndentation = "" //title 들여쓰기
  let depth = 0
  const checkSubDocuments = (docs) => {
    if (docs.length < 1) {
      allDocuments.push(documentTree.join(""))
      titleIndentation = ""
      documentTree = []
      return
    }
    for (const subdoc of docs) {
      let i = 0
      while (i < depth) {
        titleIndentation += "&nbsp"
        i++
      }
      const docTitle = `<li data-id=${subdoc.id}													
													  ${subdoc.selected ? `style="background-color:#00ddaa;"` : ``} >
														${subdoc.documents.length > 0 ? `<span class="fold">▶</span>` : ``}
														${titleIndentation}${subdoc.title} <button>+</button></li>`
      documentTree.push(`${docTitle}`)
      depth += 1
      checkSubDocuments(subdoc.documents, subdoc.id)
      depth -= 1
    }
    return allDocuments.join("")
  }

  this.render = () => {
    const $createDocLi = `<li data-id="new" class="newDocLi">새로운 문서 추가 <button>+</button>`
    $documentList.innerHTML = `
		<h1>Notion cloning</h1> 
		<hr>
		<ul>
		${
      this.state.length === 0
        ? $createDocLi
        : `${checkSubDocuments(this.state)}${$createDocLi}`
    }
		</ul>
		`
  }

  $documentList.addEventListener("click", (e) => {
    const $li = e.target.closest("li")
    const $addButton = e.target.closest("button")
    const $fold = e.target.closest("span")
    if ($li) {
      const { id } = $li.dataset
      if (e.target === $li && id !== "new") {
        onSelect(id, this.state)
      } else if (e.target === $addButton) {
        onAddDocument(id)
      } else if (e.target === $fold) {
        console.log("fold기능 아직 이지롱")
      }
    }
  })
}
