import { initRouter } from "./router.js";
import SideBar from "./Sidebar.js";
import DocumentPage from "./DocumentPage.js";
import DocumentEditPage from "./DocumentEditPage.js";
import { saveDocumentsPath, getDocumentId } from "../utils/Documents.js";
import { request } from "./api.js";

export default function App({ target }) {
    if (!(this instanceof App)) {
        return new App({ target });
    }

    saveDocumentsPath({ pathname: "/" });

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
        },
    });

    this.route = () => {
        const { pathname } = window.location;
        const documentId = getDocumentId(pathname);

        sideBar.setState({ documentId });
        documentPage.setState({ documentId });
    };

    this.route();

    initRouter(() => this.route());
}
