import DocumentList from "./DocumentList.js";

export default class ListPage{
    constructor({ $target }) {
        this.$target = $target;
        this.$page = document.createElement('div');
        this.$page.classList = 'list-page';

        this.documentList = new DocumentList({
            $target: this.$page,
            initialState: []
        });

        this.render();
    }

    render () {
        this.$target.appendChild(this.$page);
    }
    
}