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

    // const renderUlTag = ()

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
                        <button type="button" class="add-btn">Add Document</button>
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
                .join("")}</ul>`;
        }
    };

    sidebar.addEventListener("click", async (e) => {
        const target = e.target;

        if (target) {
            const documentId = target.dataset.id;

            if (target.className === "document") {
                push(`/documents/${documentId}`);
            } else if (target.className === "add-document" || target.className === "add-btn") {
                const newDocumentId = await addNewDocument(
                    this.state.documentId === "/" ? "/" : this.state.documentId
                );
                push(`/documents/${newDocumentId}`);
                this.setState({ documentId: newDocumentId });
            } else if (target.className === "delete-document") {
                const { id } = target.parentElement.dataset;

                if (id && confirm("해당 문서를 삭제하시겠습니까?")) {
                    await deleteDocument(id);
                    push("/");
                }
            }
            // else if (target.className === "rootDocument") {
            //     const rootToggler = document.getElementsByClassName("rootDocument");
            //     console.log(rootToggler);
            //     for (const child of rootToggler) {
            //         child.parentElement.querySelector(".childDocument").classList.toggle("active");
            //         child.classList.toggle("rootDocument-down");
            //     }

            //     // for (let i = 0; i < rootToggler.length; i++) {
            //     //     rootToggler[i].addEventListener("click", function () {
            //     //         this.parentElement
            //     //             .querySelector(".childDocument")
            //     //             .classList.toggle("active");
            //     //         this.classList.toggle("rootDocument-down");
            //     //     });
            //     // }
            // }
        }
    });

    this.render();
}
