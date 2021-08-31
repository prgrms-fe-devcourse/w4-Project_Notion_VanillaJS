import DocumentList from './components/DocumentList.js';
import { API_END_POINT, request } from './api.js';

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
//await request('/documents', 'roto')

export default function NavigationBar ({ $target, onClickList }) {
  const $navigationBar = document.createElement('nav')
  $target.appendChild($navigationBar)

  const documentList = new DocumentList({
    $target: $navigationBar, 
    initialState: dummyData,
    
    onClickList: (id) => {

      window.dispatchEvent(new CustomEvent('route-change', {
        detail: {
          nextUrl : `/documents/${id}`
        }
      }))
    },

    onAddList: (id) => {
      

      console.log(id)
    }
  })


  this.setState = async () => {
    const documents = await request('/documents', 'roto')
    documentList.setState(documents)
  }

  this.setState()
}