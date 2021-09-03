import { request} from './api.js';
//import LinkButton from './LinkButton.js';
import DocumentList from './DocumentList.js';

export default function DocsPage({
    $target,
    onClick
}) {
    const $page = document.createElement('div');

    const documentList = new DocumentList({
        $target: $page,
        initialState: [],
        onClick
    })

    this.setState = async () => {
        const docs = await request('/documents');
        documentList.setState(docs);
        this.render();
    }

    this.render = async () => {
        $target.appendChild($page);
    }
}