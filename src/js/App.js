import DocumentList from "./DocumentList.js"
import { request } from "./api.js"
import DocumentContentsPage from "./DocumentContentsPage.js"
import PopUpMessageBox from "./PopUpMessageBox.js"
import { changeSelectedList } from "./listHandler.js"
import { setItem, getItem, removeItem } from "./storage.js"
export default function App({ $target }) {
  const $app = document.createElement("div")
  $app.style.display = "flex"
  $target.appendChild($app)
  // 문서 리스트
  const documentList = new DocumentList({
    $target: $app,
    initialState: [],
    //문서 클릭
    onSelect: async (id, list) => {
      const content = await request(`/documents/${id}`)
      documentContentsPage.setState(content)
      const { pathname } = location
      const pathid = pathname.split("/")[2]
      if (pathid !== id) history.pushState(null, null, `/documents/${id}`)

      const selectedList = changeSelectedList(list, id)
      documentList.setState(selectedList)
    },
    //문서 추가
    onAddDocument: async (id) => {
      if (id === "new") id = null
      const newDoc = await request(`/documents`, {
        method: "POST",
        body: JSON.stringify({
          title: "새 문서",
          parent: id,
        }),
      })
      history.pushState(null, null, `/documents/${newDoc.id}`)
      documentContentsPage.setState({
        ...newDoc,
        title: "",
        content: "",
      })
      new PopUpMessageBox({
        $target,
        message: "새로운 문서가 생성되었습니다.",
      })
      const list = await request("/documents")
      const selectedList = changeSelectedList(list, newDoc.id)
      documentList.setState(selectedList)
    },
  })
  //문서 컨텐츠 화면
  let timer = null
  const documentContentsPage = new DocumentContentsPage({
    $target: $app,
    initialState: [],
    //문서 작성
    onEditing: (documentContents) => {
      if (timer !== null) {
        clearTimeout(timer)
      }
      const tempUpdatedAt = new Date()
      const docLocalSaveKey = `doc-save-${documentContents.id}`
      setItem(docLocalSaveKey, {
        documentContents,
        tempUpdatedAt,
      })
      timer = setTimeout(async () => {
        if (documentContents.title.length === 0)
          documentContents.title = "untitled"
        await request(`/documents/${documentContents.id}`, {
          method: "PUT",
          body: JSON.stringify({
            title: documentContents.title,
            content: documentContents.content,
          }),
        })
        //저장완료 메세지박스
        new PopUpMessageBox({
          $target,
          message: "저장이완료되었습니다.",
        })
        const list = await request("/documents")
        const selectedList = changeSelectedList(list, documentContents.id)
        documentList.setState(selectedList)
        removeItem(docLocalSaveKey) // 저장 완료시 localdata 삭제
      }, 1000)
    },
    //문서 삭제
    onRemove: async (documentId) => {
      await request(`/documents/${documentId}`, {
        method: "DELETE",
      })
      history.replaceState(null, null, `/documents`)
      documentContentsPage.setState({
        id: "remove",
      })
      new PopUpMessageBox({
        $target,
        message: "문서 삭제가 완료되었습니다.",
      })
      fetchList()
    },
  })

  const fetchPage = async () => {
    const { pathname } = location
    const id = pathname.split("/")[2]
    const list = await request("/documents")
    if (pathname === "/documents/" || "/documents" || "/") {
      documentList.setState(list)
      documentContentsPage.setState({
        id: "remove",
      })
    }
    if (id) {
      const content = await request(`/documents/${id}`)
      const localContent = getItem(`doc-save-${id}`)
      if (localContent) {
        if (content.updatedAt < localContent.tempUpdatedAt) {
          documentContentsPage.setState(localContent)
          const selectedList = changeSelectedList(list, id)
          documentList.setState(selectedList)
          return
        }
      }
      documentContentsPage.setState(content)
      const selectedList = changeSelectedList(list, id)
      documentList.setState(selectedList)
    }
  }
  const fetchList = async () => {
    const list = await request("/documents")
    documentList.setState(list)
  }

  this.init = async () => {
    fetchPage()
  }
  this.init()

  window.onpopstate = async () => {
    fetchPage()
  }
}
