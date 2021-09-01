import { request } from "./api.js";
import DocumentEditPage from "./DocumentEditPage.js";
import PathHeader from "./PathHeader.js";

export default function DocumentPage({ target, initialState }) {
    if (!(this instanceof DocumentPage)) {
        return new DocumentPage({ target });
    }

    // *****************************
    // * Valuables and Functions   *
    // *****************************
    const documentPage = document.createElement("div");

    const pathHeader = new PathHeader({
        target: documentPage,
    });

    const editPage = new DocumentEditPage({
        target: documentPage,
        initialState,
    });

    this.state = initialState;

    // *****************************
    // * Setting attribute         *
    // *****************************

    documentPage.setAttribute("class", "document_page");
    // documentPage.appendChild(pathHeader);

    // *****************************
    // * Function for Rendering    *
    // *****************************

    target.appendChild(documentPage);

    this.setState = async (nextState) => {
        this.state = nextState;

        editPage.setState(this.state);
        this.render();
    };

    this.render = () => {};
}
