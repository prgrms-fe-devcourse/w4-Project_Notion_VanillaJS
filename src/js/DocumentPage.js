import { request } from "./api.js";
import DocumentEditPage from "./DocumentEditor.js";
import PathHeader from "./PathHeader.js";

/*
initialState: {
    documentId: "/",
}
*/

export default function DocumentPage({
    target,
    initialState = {
        documentId: "/",
        title: "",
        content: "",
    },
}) {
    if (!(this instanceof DocumentPage)) {
        return new DocumentPage({ target });
    }

    // *****************************
    // * Valuables and Functions   *
    // *****************************
    const documentPage = document.createElement("div");

    const pathHeader = new PathHeader({
        target: documentPage,
        initialState: {
            documentId: initialState.documentId,
        },
    });

    const editPage = new DocumentEditPage({
        target: documentPage,
        initialState: {
            ...initialState,
            title: "",
            content: "",
        },
    });

    this.state = initialState;

    // *****************************
    // * Setting attribute         *
    // *****************************

    documentPage.setAttribute("class", "document_page");

    // *****************************
    // * Function for Rendering    *
    // *****************************

    target.appendChild(documentPage);

    this.setState = async (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.render = async () => {
        if (this.state.documentId !== "/") {
            const { title, content } = await request(`/documents/${this.state.documentId}`);
            editPage.setState({
                ...this.state,
                title,
                content,
            });
            pathHeader.setState(this.state);
        }
    };
}
