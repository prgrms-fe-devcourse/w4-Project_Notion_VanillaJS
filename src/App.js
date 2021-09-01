import api from "./api.js";
import ContentPage from "./Components/ContentPage/ContentPage.js";
import ListPage from "./Components/ListPage/ListPage.js";
import { LOCAL_STORAGE_KEY } from "./constants.js";
import { makeRouter, push, routeName } from "./router.js";
import { getItem, setItem } from "./storage.js";

export default function App({ $target, initialState }) {
  // State , setState
  //  State : {documents:Array, flattedDocuments:Array, selectedDocument:{...}, toggledDocuments:{} , favoriteDocuments:{} }
  this.state = initialState;

  this.setState = (nextState, sendState = true) => {
    this.state = nextState;
    if (sendState) {
      listPage.setState(this.state);
      if (this.state.selectedDocument.id) {
        contentPage.setState(this.state);
      }
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
      await createDocument(parent);
    },
    onToggleDocument: (id) => {
      toggleDocument(id);
    },
  });

  let timer = null; // timer for Debounce
  const contentPage = new ContentPage({
    $target,
    initialState,
    onUpdateDocument: async (
      { id, title, content },
      target,
      isRender = true
    ) => {
      // Update If Favorite
      if (this.state.favoriteDocuments[id]) {
        updateFavoriteTitle(id, title, false);
      }
      // DeBounce
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        updateDocument(id, title, content, isRender);
        if (target) {
          // target.focus();
        }
      }, 1000);
    },
    onDeleteDocument: async (documentId, isLast) => {
      const { favoriteDocuments, toggledDocuments } = this.state;
      if (favoriteDocuments[documentId]) {
        toggleFavorite(documentId, false);
      }
      if (toggledDocuments[documentId]) {
        toggleDocument(documentId, true, false);
      }
      deleteDocument(documentId, false);
      if (isLast) {
        getRootDocument();
        push("/");
      }
    },
    onGetDocument: async (id) => {
      await getDocument(id);
    },
    onToggleFavorite: (id) => {
      toggleFavorite(id);
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
        if (this.state.selectedDocument["id"] !== parseInt(documentId)) {
          console.log(this.state.selectedDocument["id"], parseInt(documentId));
          getDocument(documentId);
          break;
        }
        listPage.render();
        contentPage.render();
        break;
    }
  };

  // Functions
  const updateFavoriteTitle = (id, title, sendState = true) => {
    const { favoriteDocuments } = this.state;
    if (favoriteDocuments[id]) {
      favoriteDocuments[id] = title;
    }
    this.setState({ ...this.state, favoriteDocuments }, sendState);
    setItem(LOCAL_STORAGE_KEY.FAVORITE_DOCUMENTS, favoriteDocuments);
  };
  const toggleFavorite = (id, sendState = true) => {
    const { selectedDocument, favoriteDocuments } = this.state;
    const { title } = selectedDocument;
    favoriteDocuments[id]
      ? delete favoriteDocuments[id]
      : (favoriteDocuments[id] = title);
    this.setState({ ...this.state, favoriteDocuments }, sendState);
    setItem(LOCAL_STORAGE_KEY.FAVORITE_DOCUMENTS, favoriteDocuments);
  };

  const toggleDocument = (id, forceErase = false, sendState = true) => {
    const { toggledDocuments } = this.state;
    toggledDocuments[id] || forceErase
      ? delete toggledDocuments[id]
      : (toggledDocuments[id] = true);
    this.setState({ ...this.state, toggledDocuments }, sendState);
    setItem(LOCAL_STORAGE_KEY.TOGGLED_DOCUMENTS, toggledDocuments);
  };

  const updateDocument = async (id, title, content, sendState = true) => {
    await api.updateDocumentContentById(id, { title, content });
    const documents = await api.getRootDocuments();
    const { flattedDocuments } = this.state;
    delete flattedDocuments[id];
    flattedDocuments[id] = title;
    this.setState(
      {
        ...this.state,
        documents,
        selectedDocument: {
          ...this.state.selectedDocument,
          title,
          content,
        },
        flattedDocuments,
      },
      sendState
    );
  };

  const getRootDocument = async (sendState = true) => {
    const documents = await api.getRootDocuments();
    this.setState({ ...this.state, documents }, sendState);
  };
  const getDocument = async (id, sendState = true) => {
    const selectedDocument = await api.getDocumentContentById(id);
    if (!selectedDocument) {
      this.setState({ ...this.state, selectedDocument: {} }, sendState);
      push("/");
      return;
    }
    this.setState({ ...this.state, selectedDocument }, sendState);
    push(`/${routeName.document}/${id}`);
  };

  const createDocument = async (parent, sendState = true) => {
    try {
      const $newDocument = await api.createDocument({
        title: "새로운 Document",
        parent,
      });
      const { id } = $newDocument;
      this.setState({
        ...this.state,
        flattedDocuments: {
          ...this.state.flattedDocuments,
          [id]: "새로운 Document",
        },
      });
      await getRootDocument(false);
      await getDocument(id);
    } catch (e) {
      console.log(e);
    }
  };
  const deleteDocument = async (documentId, sendState = true) => {
    try {
      await api.deleteDocumentById(documentId);
      const { flattedDocuments } = this.state;
      delete flattedDocuments[documentId];
      this.setState({ ...this.state, flattedDocuments }, sendState);
    } catch (e) {
      console.log(e);
    }
  };

  const flatDocuments = (documents, sendState = true) => {
    const flattedDocuments = {};
    recursive(documents);

    function recursive(documents) {
      documents.forEach(({ title, id, documents: underDocuments }) => {
        flattedDocuments[id] = title;
        if (documents.length > 0) recursive(underDocuments);
      });
    }
    this.setState({ ...this.state, flattedDocuments }, sendState);
  };

  // Init
  this.init = async () => {
    await getRootDocument(false);
    flatDocuments(this.state.documents);
    this.route();
    makeRouter(() => this.route());
  };

  this.init();
}
