import api from "./api.js";
import ContentPage from "./Components/ContentPage/ContentPage.js";
import ListPage from "./Components/ListPage/ListPage.js";
import { LOCAL_STORAGE_KEY } from "./constants.js";
import { makeRouter, push, routeName } from "./router.js";
import { getItem, setItem } from "./storage.js";

export default function App({ $target, initialState }) {
  // State , setState
  //  State : {documents:Array, selectedDocument:{...}, toggledDocuments,Map() }
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    listPage.setState(this.state);
    if (this.state.selectedDocument.id) {
      contentPage.setState(this.state);
    }
  };
  // Components
  const listPage = new ListPage({
    $target,
    initialState,
    onGetDocument: async (id) => {
      await getDocument(id);
    },
    onCreateDocument: async (parent = null) => {
      const $newDocument = await api.createDocument({
        title: "새로운 Document",
        parent,
      });
      if ($newDocument) {
        const { id } = $newDocument;
        getRootDocument();
        await getDocument(id);
      }
    },
  });

  let timer = null; // timer for Debounce
  const contentPage = new ContentPage({
    $target,
    initialState,
    onUpdateDocument: async ([{ id, title, content }, target]) => {
      // DeBounce
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        updateDocument(id, title, content);
        target.focus();
        console.log("saved!");
      }, 500);
    },
    onDeleteDocument: async (documentId, isLast) => {
      await api.deleteDocumentById(documentId);
      if (isLast) {
        getRootDocument();
        push("/");
      }
    },
  });
  // Routing
  this.route = () => {
    $target.innerHTML = "";
    const { pathname } = window.location;
    switch (pathname.split("/")[1]) {
      case routeName.home:
        listPage.render();
        break;
      case routeName.document:
        const [, , documentId] = pathname.split("/");
        if (!this.state.selectedDocument["id"]) {
          getDocument(documentId);
          break;
        }
        listPage.render();
        contentPage.render();
        break;
    }
  };

  // Functions

  const updateDocument = async (id, title, content) => {
    await api.updateDocumentContentById(id, { title, content });
    const documents = await api.getRootDocuments();
    this.setState({
      ...this.state,
      documents,
      selectedDocument: {
        ...this.state.selectedDocument,
        title,
        content,
      },
    });
  };

  const getRootDocument = async () => {
    const documents = await api.getRootDocuments();
    this.setState({ ...this.state, documents });
  };
  const getDocument = async (id) => {
    const selectedDocument = await api.getDocumentContentById(id);
    if (!selectedDocument) {
      this.setState({ ...this.state, selectedDocument: {} });
      push("/");
      return;
    }
    this.setState({ ...this.state, selectedDocument });
    push(`/${routeName.document}/${id}`);
  };

  // Init
  this.init = async () => {
    const documents = await api.getRootDocuments();
    this.setState({ ...this.state, documents });
    this.route();
    makeRouter(() => this.route());
  };

  this.init();
}
