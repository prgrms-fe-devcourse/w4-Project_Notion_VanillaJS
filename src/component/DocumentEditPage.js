import Editor from "./Editor.js";
import { getItem, removeItem } from "../utils/Storage.js";
import { request } from "../utils/api.js";
import LinkButton from "./LinkButton.js";

export default function DocumentEditPage({ $target, initialState }) {
  const $page = document.createElement("div");
  $page.setAttribute("id", "editor");

  this.state = initialState;

  const documentDefault = {
    title: "",
    content: "",
  };

  let timer = null;

  const editor = new Editor({
    $target: $page,
    initialState: documentDefault,
    onEditing: (documents) => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        const isNew = this.state.documentId === "new";
        if (isNew) {
          try {
            const createDocument = await request(`/documents`, {
              method: "POST",
              body: JSON.stringify(documents),
            });
            history.replaceState(null, null, `/documents/${createDocument.id}`);
          } catch (e) {
            alert(e.message);
          }
        } else {
          try {
            await request(`/documents/${documents.id}`, {
              method: "PUT",
              body: JSON.stringify(documents),
            });
          } catch (e) {
            alert(e.message);
          }
        }
      }, 2000);
    },
  });

  this.setState = async (nextState) => {
    if (this.state.documentId !== nextState.documentId) {
      this.state = nextState;
      await fetchDocuments();
      return;
    } else {
      this.state = nextState;
      this.render();
      editor.setState(this.state.document);
    }
  };

  this.render = () => {
    $target.appendChild($page);
  };

  const fetchDocuments = async () => {
    const { documentId } = this.state;
    if (documentId !== "new") {
      try {
        const document = await request(`/documents/${documentId}`);
        this.setState({
          ...this.state,
          document: document,
        });
      } catch (e) {
        alert("존재하지 않는 문서입니다. 홈화면으로 이동합니다.");
        history.replaceState(null, null, "/");
        window.location.reload();
      }
    } else {
      this.setState({
        ...this.state,
        document: {
          title: "New page Title",
          content: "New page Content",
        },
      });
    }
  };

  new LinkButton({
    $target: $page,
    initialState: {
      text: "목록으로 이동",
      link: "/",
    },
  });

  new LinkButton({
    $target: $page,
    initialState: {
      text: "New Doc",
      link: "/",
    },
  });
}
