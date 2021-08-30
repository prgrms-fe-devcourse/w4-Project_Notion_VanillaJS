import Nav from "./Nav.js";
import {
  getDocuments,
  getDocumentById,
  updateDocumentById,
  createDocument,
  deleteDocument,
} from "./api.js";
import EditorPage from "./EditorPage.js";

export default function App({ $target }) {
  const removeStorage = async (id) => {
    const targetDocument = await getDocumentById(id);
    const childDocuemnts = targetDocument.documents;
    childDocuemnts.forEach((document) => {
      window.localStorage.removeItem(document.id);
    });
  };
  //문서를 지우는 함수

  const onRemove = async (id) => {
    const intenedRemoveDocument = document.getElementById(id);
    const currentPage = window.location.pathname.substr(1);
    const isCurrentPageDeleted = parseInt(currentPage) === id;
    console.log(intenedRemoveDocument.lastChild.tagName);
    const hasDocumentChild = intenedRemoveDocument.lastChild.tagName === "UL";
    if (hasDocumentChild) {
      if (!confirm("하위 문서가 존재하는 문서입니다. 삭제하시겠습니까?"))
        return;
    }
    removeStorage(id);
    intenedRemoveDocument.remove();
    await deleteDocument(id);
    updateNav();
    if (isCurrentPageDeleted) {
      history.replaceState(null, null, "/");
      console.log("delete");
      fetchDocumentByUrl();
    }
  };
  const onSelecte = (id) => {
    history.pushState(null, null, id);
    fetchDocumentByUrl();
  };

  //최상위 루트에 문서를 추가
  const createInRoot = async () => {
    await createDocument();
    const documents = await getDocuments();
    const newDocument = documents[documents.length - 1];
    history.pushState(null, null, newDocument.id);
  };

  // 특정 문서의 하위문서로 추가
  const createInDocument = async (id) => {
    const parentDocument = await getDocumentById(id);
    await createDocument(parentDocument);
    const newParentDocument = await getDocumentById(id);
    const newDocument =
      newParentDocument.documents[newParentDocument.documents.length - 1];
    history.pushState(null, null, newDocument.id);
  };

  const onCreate = async (id = null) => {
    // 상위문서가 있는 경우
    if (id) {
      await createInDocument(id);
      //상위문서가 없는경우
    } else {
      await createInRoot();
    }
    updateNav();
    fetchDocumentByUrl();
  };

  //URL path에 적힌 id를 이용해서 editorPage 로딩하는 함수
  const fetchDocumentByUrl = async () => {
    const id = window.location.pathname.substr(1);
    if (!id) {
      editorPage.setState();
      return;
    }
    const result = await getDocumentById(id);
    if (!result) history.replaceState(null, null, "/");
    editorPage.setState(result);
  };

  const onSave = async ({ title, content, id }) => {
    await updateDocumentById({ title, content, id });
    updateNav();
  };

  const updateNav = async () => {
    const documents = await getDocuments();
    nav.setState(documents);
  };

  updateNav();

  const nav = new Nav({
    $target,
    initialState: null,
    onSelecte,
    onCreate,
    onRemove,
  });

  const editorPage = new EditorPage({
    $target,
    initialState: null,
    onSave,
    onSelecte,
    onRemove,
  });

  window.addEventListener("popstate", () => {
    fetchDocumentByUrl();
  });

  window.addEventListener("load", () => {
    fetchDocumentByUrl();
  });
}
