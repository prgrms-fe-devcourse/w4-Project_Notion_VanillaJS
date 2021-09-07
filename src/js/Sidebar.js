import { getUserName } from "./api.js";
import { push } from "./router.js";
import { getAllDocuments, addNewDocument, deleteDocument } from "../utils/Documents.js";
import { getItem } from "../utils/storage.js";

export default function Sidebar({ target, initialState = {} }) {
    if (!(this instanceof Sidebar)) {
        return new Sidebar({ target, initialState });
    }

    // *****************************
    // * Valuables and Functions   *
    // *****************************

    const sidebar = document.createElement("nav");
    const username = getUserName();
    const documents = () => getItem(`username_${username}`, []);

    this.state = initialState;

    // *****************************
    // * Setting attribute         *
    // *****************************

    sidebar.setAttribute("class", "sidebar");

    sidebar.innerHTML = `
                        <header id="username">${username}</header>
                        <ul id="treeUL">${documents()
                            .map((root) => getAllDocuments(root, parseInt(this.state.documentId)))
                            .join("")}
                        </ul>
                        <ul>
                            <button type="button" class="add-btn">Add Document</button>
                        </ul>
                        `;

    // *****************************
    // * Function for Rendering    *
    // *****************************

    target.appendChild(sidebar);

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.render = () => {
        const { documentId } = this.state;
        const ul = sidebar.querySelector("#treeUL");

        if (ul) {
            ul.innerHTML = `${documents()
                .map((root) => getAllDocuments(root, parseInt(documentId)))
                .join("")}`;
        }
    };

    // Click Event
    sidebar.addEventListener("click", async (e) => {
        const target = e.target;

        if (target) {
            const documentId = target.dataset.id;

            if (target.className === "document") {
                // Select Document
                push(`/documents/${documentId}`);
            } else if (target.className === "add-document" || target.className === "add-btn") {
                // Create Document
                const selectedDocument = e.target.closest("li");
                const newDocumentId = await addNewDocument(
                    selectedDocument ? selectedDocument.dataset.id : null
                );

                push(`/documents/${newDocumentId}`);
                this.setState({ documentId: newDocumentId });
            } else if (target.className === "delete-document") {
                // Delete Document
                const { id } = target.parentElement.dataset;

                await deleteDocument(id);
                push("/");
            }
        }
    });

    // Hover Event
    sidebar.addEventListener("mouseover", (e) => {
        const target = e.target;

        if (target.className.includes("document") || target.className.includes("childDocument")) {
            target.classList.toggle("mouse-over");
        }
    });

    sidebar.addEventListener("mouseout", (e) => {
        const target = e.target;

        if (target.className.includes("document") || target.className.includes("childDocument")) {
            target.classList.toggle("mouse-over");
        }
    });

    this.render();
}
