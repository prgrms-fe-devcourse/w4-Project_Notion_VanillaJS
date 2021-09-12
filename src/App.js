import DocsListPage from './component_sidebar/DocsListPage.js';
import EditorPage from './component_editor/EditorPage.js';
import { initRouter } from './utils/Router.js';
import { htmlReset } from './utils/DOM.js';

export default function App({ $target }) {
    const docsListPage = new DocsListPage({
        $target,
    });

    docsListPage.setState();
    
    const docEditPage = new EditorPage({
        $target,
    });

    this.route = async () => {
        const { pathname } = window.location;

        if (pathname.indexOf('/documents/') === 0) {
            htmlReset(docEditPage);
            const [, , id] = pathname.split('/');
            docEditPage.setState({id})
        }
    };

    this.route();
    initRouter(() => this.route());
}
