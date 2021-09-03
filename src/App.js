import DocumentEditPage from './DocumentEditPage.js';
import DocsPage from './DocsPage.js';
import { initRouter } from './router.js';

export default function App({ $target }) {
    const docsPage = new DocsPage({
        $target,
        onClick: (id) => {
            history.pushState(null, null, `/documents/${id}`)
            this.route();
        }
    });
    
    const documentEditPage = new DocumentEditPage({
        $target,
        initialState: {
            docId: 'new',
            doc: {
                title: '',
                content: ''
            }
        }
    });


    this.route = () => {
        $target.innerHTML = '';
        const { pathname } = window.location;

        if (pathname === '/documents') {
            docsPage.setState();
        } else if (pathname.indexOf('/documents/') === 0) {
            const [, , docId] = pathname.split('/');
            docsPage.setState();
            documentEditPage.setState({ docId });
        }
    };

    this.route();

    initRouter(() => this.route());
}