export default function Editor({ $target, initialState = {
    title: "",
    content: ""
}, onEditing }) {
    const $editor = document.createElement("div");

    let isInit = false;

    this.state = initialState;

    this.setState = (nextState) => {
        this.state = nextState;
        $editor.querySelector('[name=title]').value = this.state.title;
        $editor.querySelector('[name=content]').value = this.state.content;

        this.render();
    }

    $target.appendChild($editor);

    this.render = () => {
        if (!isInit) {
            $editor.innerHTML = `
                <input class="form-control" type="text" name="title" style="width: 50%" value="${this.state.title}" />
                <textarea class="form-control" name="content" style="width:50%; height:400px;">${this.state.content}</textarea></div>
            `;
            isInit = true;
        }
    }

    this.render();

    $editor.addEventListener("keyup", e => {
        e.preventDefault();
        const { target } = e;
        const name = target.getAttribute("name");

        if (this.state[name] !== undefined) {
            const nextState = {
                ...this.state,
                [name]: target.value
            }
            this.setState(nextState);
            onEditing(this.state);
        }
    })
}
