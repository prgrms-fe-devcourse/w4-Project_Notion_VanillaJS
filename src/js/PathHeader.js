import { getCurrentDocumentPath } from "../utils/Documents.js";
import { getItem } from "../utils/storage.js";
import { getUserName } from "./api.js";

/*
initialState: {
    documentId: "/",
}
*/

export default function PathHeader({ target, initialState }) {
    if (!(this instanceof PathHeader)) {
        return new PathHeader({ target, initialState });
    }

    // *****************************
    // * Valuables and Functions   *
    // *****************************

    const header = document.createElement("header");

    this.state = initialState;

    // *****************************
    // * Setting attribute         *
    // *****************************

    header.setAttribute("class", "path_header");

    // *****************************
    // * For Rendering             *
    // *****************************

    target.appendChild(header);

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.render = () => {
        getCurrentDocumentPath(parseInt(this.state.documentId));
        const savedPath = getItem(`path_${getUserName()}`, []);
        // console.log(savedPath);
        // header.innerHTML = `
        //                     ${savedPath.}
        //                     `
    };

    this.render();
}
