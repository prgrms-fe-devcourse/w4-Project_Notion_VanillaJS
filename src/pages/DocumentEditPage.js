import Editor from "../components/Editor.js";
import { request } from "../api.js";
import { getItem, setItem } from "../storage.js";

export default function DocumentEditPage({ $target, initialState }) {
  const $page = document.createElement("section");
  $page.className = "editSection";

  this.state = initialState;

  const TEMP_DOC_SAVE_KEY = `temp-doc-${this.state.documentId}`;

  // const storageContent = getItem(TEMP_DOC_SAVE_KEY, {
  //   title: "",
  //   content: "",
  // });

  let timer = null;

  const editor = new Editor({
    $target: $page,
    initialState: this.state.document,
    onEditing: (writingContent) => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setItem(TEMP_DOC_SAVE_KEY, {
          ...writingContent,
          tempSaveDate: new Date(),
        });
      }, 1000);
    },
  });

  this.setState = async (nextState) => {
    if (this.state.documentId !== nextState.documentId) {
      this.state = nextState;
      await fetchDocument();
      return;
    }

    this.state = nextState;
    this.render();

    editor.setState(this.state.document);
  };

  this.render = () => {
    $target.appendChild($page);
  };

  const fetchDocument = async () => {
    const { documentId } = this.state;

    if (documentId !== "new") {
      const document = await request(`/documents/${documentId}`);

      this.setState({
        ...this.state,
        document,
      });
    }
  };
}
