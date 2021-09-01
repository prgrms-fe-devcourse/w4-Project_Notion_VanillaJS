import { getUserName } from "./api.js";
import { push } from "./router.js";
import { getAllDocuments } from "../utils/Documents.js";
import { getItem } from "../utils/storage.js";
import AddDocument from "./AddDocument.js";

export default function Sidebar({ target, initialState = {} }) {
    if (!(this instanceof Sidebar)) {
        return new Sidebar({ target, initialState });
    }

    // *****************************
    // * Valuables and Functions   *
    // *****************************

    const sidebar = document.createElement("nav");
    const username = getUserName();
    const documents = getItem(`username_${username}`, []);

    // const renderUlTag = ()

    this.state = initialState;

    // *****************************
    // * Setting attribute         *
    // *****************************

    sidebar.setAttribute("class", "sidebar");
    sidebar.innerHTML = `
                        <header id="username">${username}</header>
                        <ul>${documents
                            .map((root) => getAllDocuments(root, parseInt(this.state.documentId)))
                            .join("")}</ul>
                        `;

    // *****************************
    // * Function for Rendering    *
    // *****************************

    target.appendChild(sidebar);

    const addDocument = new AddDocument({
        target: sidebar,
    });

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.render = () => {
        const { documentId } = this.state;
        const ul = sidebar.querySelector("ul");

        if (ul) {
            ul.innerHTML = `${documents
                .map((root) => getAllDocuments(root, parseInt(documentId)))
                .join("")}</ul>`;
        }
    };

    sidebar.addEventListener("click", (e) => {
        const li = e.target.closest(".document");

        if (li) {
            const documentId = li.dataset.id;
            push(`/documents/${documentId}`);
        }
    });

    this.render();
}
