import { request } from "./api.js";

export default function DocumentEditPage({ target, initialState }) {
    if (!(this instanceof DocumentEditPage)) {
        return new DocumentEditPage({ target, initialState });
    }

    // *****************************
    // * Valuables and Functions   *
    // *****************************

    const editPage = document.createElement("div");

    this.state = initialState;

    // *****************************
    // * Setting attribute         *
    // *****************************

    editPage.setAttribute("class", "edit_page");

    // *****************************
    // * For Rendering    *
    // *****************************

    target.appendChild(editPage);

    editPage.innerHTML = `
                        <input type="text" class="title" name="title" placeholder="제목 없음"/>
                        <div class="content" name="content" contentEditable="true"></div>
                        `;

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.render = async () => {
        const { documentId } = this.state;

        if (documentId !== "/") {
            const { title, content } = await request(`/documents/${documentId}`);
            const input = editPage.querySelector("input[name=title]");
            const div = editPage.querySelector("div[name=content]");

            input.value = title ? title : "";
            div.textContent = content ? content : "";
        }
    };

    this.render();
}
