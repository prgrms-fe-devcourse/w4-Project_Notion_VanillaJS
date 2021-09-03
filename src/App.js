import DocumentPage from './DocumentPage.js';
import EditPage from './EditPage.js';

export default class App{
    constructor({ $target }) {
        this.$target = $target;
        
        this.documentPage = new DocumentPage({
            $target
        });
    }

}