import { request } from "./api.js";
import { getItem, removeItem, setItem } from "./storage.js";
import Editor from "./Editor.js";
import DocumentList from "./DocumentList.js";

export default function DocumentEditPage({ $target, initialState }) {
  const $page = document.createElement("div");

  this.state = initialState;

  let documentLocalSaveKey = `temp-document-${this.state.documentId}`;
  const doc = getItem(documentLocalSaveKey, {
    title: "",
    content: "",
  });

  let timer = null;
  const editor = new Editor({
    $target: $page,
    initialState: doc,
    onEditing: (doc) => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        setItem(documentLocalSaveKey, {
          ...doc,
          createdAt: new Date(),
        });

        // new에서 어떤 동작이 일어나면 생성된 document로 바꿔줌
        const isNew = this.state.documentId === "new";
        if (isNew) {
          const createdDocument = await request("/documents", {
            method: "POST",
            body: JSON.stringify(doc),
          });
          history.replaceState(null, null, `/documents/${createdDocument.id}`);
          removeItem(documentLocalSaveKey);

          this.setState({
            documentId: createdDocument.id,
          });
        } else {
          await request(`/documents/${doc.id}`, {
            method: "PUT",
            body: JSON.stringify(doc),
          });
          removeItem(documentLocalSaveKey);
        }
      }, 2000);
    },
  });

  this.setState = async (nextState) => {
    if (this.state.documentId !== nextState.documentId) {
      documentLocalSaveKey = `temp-document-${nextState.documentId}`;
      this.state = nextState;
      if (this.state.documentId === "new") {
        const doc = getItem(documentLocalSaveKey, {
          title: "",
          parent: null,
        });
        this.render();
        editor.setState(doc);
      } else {
        await fetchDocument();
      }
      return;
    }

    this.state = nextState;
    this.render();

    editor.setState(
      this.state.doc || {
        title: "",
        content: "",
      }
    );
  };
  this.render = () => {
    $target.appendChild($page);
  };

  const fetchDocument = async () => {
    const { documentId } = this.state;
    if (documentId !== "new") {
      const doc = await request(`/documents/${documentId}`);

      const tempDocument = getItem(documentLocalSaveKey, {
        id: doc.id,
        title: doc.title,
        createdAt: doc.creagtedAt,
        updatedAt: "",
      });

      if (tempDocument.createdAt && tempDocument.createdAt > doc.updatedAt) {
        if (confirm("저장되지 않은 데이터가 있습니다. 불러올까요?")) {
          this.setState({
            ...this.state,
            doc: tempDocument,
          });
          return;
        }
      }

      this.setState({ ...this.state, doc });
    }
  };
}
