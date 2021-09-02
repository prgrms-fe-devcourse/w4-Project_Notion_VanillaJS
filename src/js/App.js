import { initRouter } from "./router.js";
import SideBar from "./Sidebar.js";
import DocumentPage from "./DocumentPage.js";
import { getDocumentId, saveDocumentsPathToLS } from "../utils/Documents.js";

export default function App({ target }) {
    if (!(this instanceof App)) {
        return new App({ target });
    }

    // *****************************
    // * Valuables and Functions   *
    // *****************************
    saveDocumentsPathToLS();

    const sideBar = new SideBar({
        target,
        initialState: {
            documentId: "/",
        },
    });

    const documentPage = new DocumentPage({
        target,
        initialState: {
            documentId: "/",
            title: "",
            content: "",
        },
    });

    // *****************************
    // * For Rendering             *
    // *****************************

    this.route = () => {
        const { pathname } = window.location;
        const documentId = getDocumentId(pathname);

        sideBar.setState({ documentId });
        documentPage.setState({ documentId });
    };

    this.route();

    initRouter(() => this.route());
}
