import Documents from "./Documents.js"
import { getDocument,createDocument } from "./api.js"

export default function App({ $target, currentState }) {
    const documents = new Documents({
        $target,
        currentState,
        onGetDocument: async () => {
            const savedDocuments = await getDocument()

            documents.setState(savedDocuments)
        },
        onCreateDocument: async (parent) => {
            await createDocument('untitled', parent)
        }
    })
}
