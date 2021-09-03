import Editor from './Editor.js';

export default class EditPage{
    constructor({ $target, initialState }) {
        this.$target = $target;
        this.state = initialState;
        this.$page = document.createElement('div');
        this.$page.classList = 'document-page';
        
        this.editor = new Editor({
            $target: this.$page,
            initialState: []
        });

        this.render();
    }

    render() {
        this.$target.appendChild(this.$page);
    }
}