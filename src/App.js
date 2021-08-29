import DocsListPage from './DocsListPage.js';
import DocEditPage from './DocEditPage.js';
import { initRouter } from './router.js';
import { request } from './api.js';


export default function App({ $target }) {
    const docsListPage = new DocsListPage({
        $target,
    });

    docsListPage.setState();
    
    const docEditPage = new DocEditPage({
        $target,
    });


    this.route = async () => {
        const { pathname } = window.location;

        if (pathname.indexOf('/documents/') === 0) {
            docEditPage.innerHTML = ``;
            const [, , id] = pathname.split('/');
            docEditPage.setState({id})
        }
    };

    this.route();

    initRouter(() => this.route());
}
