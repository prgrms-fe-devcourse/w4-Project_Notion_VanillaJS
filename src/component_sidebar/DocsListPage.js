import DocsList from './DocsList.js';
import SidebarHeader from './SidebarHeader.js';
import { createElement } from '../utils/DOM.js';
import { request } from '../utils/Api.js';

export default function DocsListPage({ $target, initialState = [] }) {
    const $docsListPage = createElement('div');
    $docsListPage.setAttribute('class', 'sidebar');

    new SidebarHeader({
        $target: $docsListPage,
        makeRootDoc: async () => {
            await request('/documents', {
                method: 'POST',
                body: JSON.stringify({
                    title: 'new doc',
                    parent: null,
                }),
            });

            fetchDocsList();
        },
    });

    const docsList = new DocsList({
        $target: $docsListPage,
        initialState: [],
        addDoc: async (title, parentId) => {
            await request(`/documents`, {
                method: 'POST',
                body: JSON.stringify({
                    title: title.length > 0 ? title : 'new doc',
                    parent: parentId,
                }),
            });

            fetchDocsList();
        },
        deleteDoc: async (id) => {
            await request(`/documents/${id}`, {
                method: 'DELETE',
            });

            fetchDocsList();
        },
        reviseDocName: async (docTitle, id) => {
            const currentDocContent = await request(`/documents/${id}`, {
                method: 'GET',
            });

            const [_, contentTitle] = currentDocContent.title.split('/');

            await request(`/documents/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    ...currentDocContent,
                    title: docTitle + '/' + (contentTitle || docTitle),
                }),
            });
        },
    });

    this.state = initialState;

    this.setState = (nextState = []) => {
        this.state = nextState;
        docsList.setState(this.state);
        this.render();
    };

    this.render = () => {
        $target.insertBefore($docsListPage, $target.firstChild);
    };

    const fetchDocsList = async () => {
        const nextState = await request('/documents', {
            method: 'GET',
        });

        this.setState(nextState);
    };

    fetchDocsList();
}
