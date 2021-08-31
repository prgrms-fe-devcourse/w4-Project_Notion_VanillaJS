import DocumentEditor from './components/DocumentEditor.js';
import { request } from './api.js';

const dummyData = [
  {
    "id": 1, // Document id
    "title": "노션을 만들자", // Document title
    "documents": [
      {
        "id": 2,
        "title": "블라블라",
        "documents": [
          {
            "id": 3,
            "title": "함냐함냐",
            "documents": []
          }
        ]
      }
    ]
  },
  {
    "id": 4,
    "title": "hello!",
    "documents": []
  }
]

export default function EditPage({ $target, initialState }) {
  const documentEditor = new DocumentEditor({
    $target,
    initialState : []
  })

  this.state = initialState

  this.setState = async (nextState) => {
    this.state = nextState
    fetchDocument()
  }

  const fetchDocument = async () => {
    const { documentId } = this.state
    const documents = await request(`/documents/${documentId}`, 'roto')
    
    console.log(documents)
    documentEditor.setState(documents)
  }


}