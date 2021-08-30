import api from "../../api.js";
import { push } from "../../router.js";
import ContentSettings from "./ContentSettings.js";
import Editor from "./Editor.js";

export default function ContentPage({
  $target,
  initialState,
  onUpdateDocument,
}) {
  const $page = document.createElement("div");
  $page.className = "content-page";
  // State , setState
  //    state : { documentId: ,document:{id,title,content,documents,createdAt,updatedAt}}
  this.state = initialState;

  this.setState = (nextState) => {
    if (this.state.documentId !== nextState.documentId) {
      this.state = nextState;
      getDocumentContent(this.state.documentId);
      return;
    } else if (!nextState.document) {
      getDocumentContent(this.state.documentId);
      return;
    }
    this.state = nextState;
    editor.setState(this.state.document);
    settings.setState({
      id: this.state.documentId,
      underDocuments: this.state.document.documents,
    });
    this.render();
  };

  // Component
  const settings = new ContentSettings({
    $target: $page,
    initialState: { id: null, underDocuments: [] },
    onDelete: async (documentId) => {
      await api.deleteDocumentById(documentId);
    },
  });

  let timer = null; // timer for Editor onChange
  const editor = new Editor({
    $target: $page,
    initialState: {},
    onChange: async ({ id, title, content }) => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        await api.updateDocumentContentById(id, { title, content });
        onUpdateDocument();
      }, 1000);
    },
  });

  // Render

  this.render = () => {
    $target.appendChild($page);
  };

  const getDocumentContent = async () => {
    const { documentId } = this.state;
    const document = await api.getDocumentContentById(documentId);
    if (document) {
      this.setState({ documentId, document });
    } else {
      push("/");
    }
  };
}
