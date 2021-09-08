import DocumentsPage from './DocumentsPage.js';
import EditorPage from './EditorPage.js'
import { getItem, setItem } from './storage.js';
import { initRouter } from './router.js';

const savedDocuments = getItem('documents')
const editors = getItem('editors')

export default function App({ $target }) {
    this.state = {
        documentsInfos: [
            ...savedDocuments
        ],
        editorsInfos: [
            ...editors
        ]
    }

    this.setState = (nextState) => {
        this.state = nextState
        this.render()
    }
    
    new DocumentsPage({
        $target,
        currentState: this.state,
    });
    
    const editorPage = new EditorPage({
        $target,
        currentState: {
            documentId: '',
            title: '',
            content: ''
        },
        updateContent: (title, content) => {
            editorPage.setState({
                    documentId: editorPage.state.documentId,
                    title,
                    content
            });

            const targetId = editorPage.state.documentId    
            
            const previousEditors = this.state.editorsInfos.filter(({ documentId }) => documentId !== targetId)

            const nextEditors = [
                ...previousEditors,
                editorPage.state
            ]

            const nextState = {
                documentsInfos: this.state.documentsInfos,
                editorsInfos: nextEditors
                
            }

            this.setState(nextState)
            setItem('editors', nextEditors);
        }
    })

    this.route = async () => {
        const { pathname } = window.location;
        if (pathname.includes('/documents/')) {
            const [, , documentId] = pathname.split('/');
            const targetId = documentId

            editorPage.setState({
                documentId: targetId,
                title: '',
                content: ''
            });
        }
    }

    this.render = () => {

    }

    this.render()

    this.route();

    initRouter(() => this.route());
}
