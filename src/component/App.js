import DocumentList from "./DocumentList.js";
import DocumentEditPage from "./DocumentEditPage.js";
import { initRouter } from "../utils/router.js";
import { request } from "../utils/api.js";

export default function App({ $target }) {
  //header
  const $header = document.querySelector("header");
  $header.innerHTML = "<h1>Muntari_Notion</h1>";

  //aside
  const documentList = new DocumentList({
    initialState: [],
    toRootPage: () => {
      history.pushState(null, null, "/");
      window.location.reload();
    },
    onToggle: ($innerUl) => {
      if ($innerUl.style.display === "block") {
        $innerUl.style.display = "none";
      } else {
        $innerUl.style.display = "block";
      }
    },
    onRemove: async (id) => {
      await fetchDocumentDelete(id);
      try {
        const document = await request(`/documents`);
        documentList.setState(document);
      } catch (e) {
        alert(e.message);
      }
    },
    addDocument: async (parentId) => {
      const title = prompt("새로 만들 문서의 제목 입력");
      if (!title) {
        alert("문서 제목을 입력해주세요");
        return;
      }
      try {
        if (parentId === "root") {
          await fetchDocumentAdd(title);
        } else {
          const newDocument = await fetchDocumentAdd(title, parentId);
          const newDocumentId = newDocument.id;
          documentEditPage.setState({ documentId: newDocumentId });
          history.replaceState(null, null, `/documents/${newDocumentId}`);
        }
        const document = await request(`/documents`);
        documentList.setState(document);
      } catch (e) {
        alert(e.message);
      }
    },
  });

  const fetchDocumentDelete = async (id) => {
    try {
      await request(`/documents/${id}`, {
        method: "DELETE",
      });
      history.replaceState(null, null, "/");
      return alert(`DocID : ${id}, Delete Success`);
    } catch (e) {
      alert(e.message);
    }
  };

  const fetchDocumentAdd = async (title, parentId = null) => {
    try {
      const documentBody = {
        title,
        parent: parentId,
      };
      const newDocument = await request(`/documents`, {
        method: "POST",
        body: JSON.stringify(documentBody),
      });

      alert(`${title} Save Success`);
      return newDocument;
    } catch (e) {
      alert(e.message);
    }
  };

  //main
  const documentEditPage = new DocumentEditPage({
    $target,
    initialState: {},
  });

  this.route = () => {
    const { pathname } = window.location;
    if (pathname === "/") {
      documentEditPage.setState({
        documentId: "new",
      });
    } else if (pathname.indexOf("/documents/") === 0) {
      const [, , documentId] = pathname.split("/");
      documentEditPage.setState({ documentId: documentId });
    } else {
      alert("올바르지 않은 URL입니다. 홈 화면으로 이동합니다");
      history.replaceState(null, null, "/");
      this.route();
    }
  };

  this.route();

  initRouter(() => this.route());
}
