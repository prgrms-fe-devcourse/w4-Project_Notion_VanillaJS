import Editor from "../components/Editor.js";
import { request } from "../api.js";
import { getItem, removeItem, setItem } from "../storage.js";

export default function DocumentEditPage({ $target, initialState }) {
  const $page = document.createElement("section");
  $page.className = "editSection";

  this.state = initialState;

  let tempLocalSaveKey = `temp-doc-${this.state.documentId}`;

  let timer = null;

  const editor = new Editor({
    $target: $page,
    initialState,
    onEditing: (writingContent) => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        setItem(tempLocalSaveKey, {
          ...writingContent,
          tempSaveDate: new Date(),
        });

        const isNew = this.state.documentId === "new";
        if (isNew) {
          const createdDocument = await request("/documents", {
            method: "POST",
            body: JSON.stringify(writingContent),
          });
          history.replaceState(null, null, `/documents/${createdDocument.id}`);
          removeItem(tempLocalSaveKey);

          this.setState({
            documentId: createdDocument.id,
          });
        } else {
          await request(`/documents/${writingContent.id}`, {
            method: "PUT",
            body: JSON.stringify(writingContent),
          });
          removeItem(tempLocalSaveKey);
        }
      }, 2000);
    },
  });

  const $deleteButton = document.createElement("button");
  $deleteButton.className = "deleteButton";
  $deleteButton.textContent = "삭제";
  $page.appendChild($deleteButton);

  this.setState = async (nextState) => {
    if (this.state.documentId !== nextState.documentId) {
      tempLocalSaveKey = `temp-doc-${nextState.documentId}`;

      this.state = nextState;

      if (nextState.documentId === "new") {
        const tempDocument = getItem(tempLocalSaveKey, {
          title: "",
          content: "",
        });
        this.render();
        editor.setState(tempDocument);
      } else {
        await fetchDocument();
      }
      return;
    }

    this.state = nextState;
    this.render();

    editor.setState(
      this.state.document || {
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
      const document = await request(`/documents/${documentId}`);

      const tempDocument = getItem(tempLocalSaveKey, {
        title: "",
        content: "",
      });

      if (
        tempDocument.tempSaveDate &&
        tempDocument.tempSaveDate > document.updatedAt
      ) {
        if (confirm("작성 중인 글을 불러오시겠습니까?")) {
          this.setState({
            ...this.state,
            document: tempDocument,
          });
          return;
        }
      }

      this.setState({
        ...this.state,
        document,
      });
    }
  };
}
