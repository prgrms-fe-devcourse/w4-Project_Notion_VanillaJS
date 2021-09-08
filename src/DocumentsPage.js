import Documents from './Documents.js'
import { setItem } from './storage.js';
import { pushRoute } from './router.js';

export default function DocumentsPage({ $target, currentState }) {
    this.state = currentState

    this.setState = (nextState) => {
        this.state = nextState;
        this.render()
    }

    const documents = new Documents({
        $target,
        currentState,
        onGetDocument: async () => {
            const savedDocuments = await getDocument()
            const nextState = {
                documentsInfos: [
                    ...savedDocuments
                ]
            }
            documents.setState(nextState)

            setItem('documents', savedDocuments)
        },
        onCreateDocument: async (parent) => {
            await createDocument('untitled', parent)
        },
        onPushRoute: (nextUrl) => {
            pushRoute(nextUrl)
        }
    })

    this.render = () => {

    }

    this.render();
}
