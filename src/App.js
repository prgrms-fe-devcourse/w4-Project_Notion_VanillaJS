import Nav from "./Nav.js";
import {
  getDocuments,
  getDocumentById,
  updateDocumentById,
  createDocument,
  deleteDocument,
} from "./api.js";
import EditorPage from "./EditorPage.js";
import { getIdFromUrl, pushStateUrl } from "./router.js";

export default function App({ $target }) {
  // 하위 문서를 가지고 있는 문서가 삭제될 경우 스토리지에 정보가 남아서 안보이는 것을 해결하기 위하서
  const removeStorage = async (id) => {
    const targetDocument = await getDocumentById(id);
    const childDocuemnts = targetDocument.documents;
    childDocuemnts.forEach((document) => {
      window.localStorage.removeItem(document.id);
    });
  };

  const onRemove = async (id) => {
    const intenedRemoveDocument = document.getElementById(id);
    const currentPageDocument = getIdFromUrl();
    console.log(intenedRemoveDocument);
    const isCurrentPageDeleted = parseInt(currentPageDocument) === id;
    const hasDocumentChild = intenedRemoveDocument.lastChild.tagName === "UL";
    if (hasDocumentChild) {
      if (!confirm("하위 문서가 존재하는 문서입니다. 삭제하시겠습니까?"))
        return;
    }
    removeStorage(id);
    intenedRemoveDocument.remove(); // 낙관적 업데이트
    await deleteDocument(id);
    updateNav();
    if (isCurrentPageDeleted) {
      history.replaceState(null, null, "/");
      fetchDocumentByUrl();
    }
  };
  const onSelecte = (id) => {
    pushStateUrl(id);
    fetchDocumentByUrl();
  };

  //최상위 루트에 문서를 추가
  const createInRoot = async () => {
    await createDocument();
    const documents = await getDocuments();
    const newDocument = documents[documents.length - 1];
    pushStateUrl(newDocument.id);
  };

  // 특정 문서의 하위문서로 추가
  const createInDocument = async (id) => {
    const parentDocument = await getDocumentById(id);
    await createDocument(parentDocument);
    const newParentDocument = await getDocumentById(id);
    const newDocument =
      newParentDocument.documents[newParentDocument.documents.length - 1];
    pushStateUrl(newDocument.id);
  };

  const onCreate = async (id = null) => {
    // 상위문서에 하위문서로 추가할 경우
    if (id) {
      await createInDocument(id);
      // 루트에 문서를 추가할 경우
    } else {
      await createInRoot();
    }
    updateNav();
    fetchDocumentByUrl();
  };

  //URL path에 적힌 id를 이용해서 editorPage 로딩하는 함수
  const fetchDocumentByUrl = async () => {
    const id = getIdFromUrl();
    if (!id) {
      editorPage.setState();
      return;
    }
    const result = await getDocumentById(id);
    if (!result) history.replaceState(null, null, "/");
    editorPage.setState(result);
  };

  //
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
  });

  window.addEventListener("popstate", () => {
    fetchDocumentByUrl();
  });

  window.addEventListener("load", () => {
    fetchDocumentByUrl();
  });
}
