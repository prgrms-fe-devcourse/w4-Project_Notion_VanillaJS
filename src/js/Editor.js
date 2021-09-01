export default function Editor({
    target,
    initialState = {
        title: "",
        content: "",
    },
    onEditing,
}) {
    // *****************************
    // * Valuables and Functions   *
    // *****************************

    const editor = document.createElement("div");

    this.state = initialState;

    // *****************************
    // * Setting attribute         *
    // *****************************

    editor.setAttribute("class", "editor");

    // *****************************
    // * Function for Rendering    *
    // *****************************

    target.appendChild(editor);

    editor.innerHTML = `
                        <input type="text" class="title" name="title"/>
                        <div class="content" name="content" contentEditable="true"></div>
                        `;

    this.setState = (nextState) => {
        this.state = nextState;

        this.render();
    };

    this.render = () => {
        console.log("editor");
    };

    this.render();
}
