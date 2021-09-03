export default class Editor {
    constructor ({ $target, initialState }) {
        this.state = initialState;
        this.$target = $target;

        this.$editor = document.createElement('div');
        this.$editor.classList = 'editor-wrap';
        this.$editor.innerHTML = `
            <input type="text" name="title" class="editor-title">
            <div name="content" contentEditable class="editor-content"></div>
        `;

        $target.appendChild(this.$editor);
    }

    setState(nextState) {
        this.state = nextState;
        this.$editor.querySelector('[name=title]').value = this.state.title;
        this.$editor.querySelector('[name=content]').innerHTML = this.state.content;

        this.render();

    }

    render() {
        
    }
}