import Documents from "./Documents.js"
import Editor from './Editor.js'
import { getDocument,createDocument } from "./api.js"
import { setItem } from "./storage.js";

export default function App({ $target, currentState }) {
    const documents = new Documents({
        $target,
        currentState,
        onGetDocument: async () => {
            const savedDocuments = await getDocument()
    
            documents.setState(savedDocuments)
    
            setItem('documents', savedDocuments)
        },
        onCreateDocument: async (parent) => {
            await createDocument('untitled', parent)
        },
    })

    new Editor({
        $target,
        currentState: {
            title: '오늘 할 공부',
            content: '자바스크립트 공부'
        },
    })
}
