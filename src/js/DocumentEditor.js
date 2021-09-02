import { updateDocument } from "../utils/Documents.js";

/*
initialState: {
    documentId: "/",
    title: "제목 없음",
    content: ""
}
*/

export default function DocumentEditPage({
    target,
    initialState = {
        documentId: "/",
        title: "",
        content: "",
    },
}) {
    if (!(this instanceof DocumentEditPage)) {
        return new DocumentEditPage({ target, initialState });
    }

    // *****************************
    // * Valuables and Functions   *
    // *****************************

    const editPage = document.createElement("div");

    const isRightDocumentId = (documentId) => (documentId === "/" ? false : true);

    this.state = initialState;

    // *****************************
    // * Setting attribute         *
    // *****************************

    editPage.setAttribute("class", "edit-page");

    // *****************************
    // * For Rendering    *
    // *****************************

    target.appendChild(editPage);

    editPage.innerHTML = `
                        <input type="text" class="title" name="title" placeholder="제목 없음" value="${this.state.title}"/>
                        <div class="content" name="content" contentEditable="true">${this.state.content}</div>
                        `;

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.render = () => {
        const { documentId, title, content } = this.state;

        if (documentId !== "/") {
            const input = editPage.querySelector("input[name=title]");
            const div = editPage.querySelector("div[name=content]");

            input.value = title ? title : "";
            div.textContent = content ? content : "";
        }
    };

    editPage.querySelector("[name=title]").addEventListener("keyup", async (e) => {
        const { documentId, content } = this.state;

        if (isRightDocumentId(documentId)) {
            await updateDocument(documentId, e.target.value, content);
            this.setState({
                ...this.state,
                title: e.target.value,
            });
        }
    });

    editPage.querySelector("[name=content]").addEventListener("keyup", async (e) => {
        const { documentId, title } = this.state;

        if (isRightDocumentId(documentId)) {
            await updateDocument(documentId, title, e.target.textContent);
            this.setState({
                ...this.state,
                content: e.target.textContent,
            });
        }
    });

    this.render();
}
