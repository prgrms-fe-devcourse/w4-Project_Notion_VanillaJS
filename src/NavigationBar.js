import DocumentList from './components/DocumentList.js';
import { request } from './utils/api.js';
import { RouterUtils } from './utils/router.js'
import { EventUtils } from './utils/event.js'

export default function NavigationBar ({ $target }) {
  const $navigationBar = document.createElement('nav')
  $target.appendChild($navigationBar)

  const documentList = new DocumentList({
    $target: $navigationBar, 
    initialState: [],
    
    onClickDoc: (id) => {
      RouterUtils.routerDispatcher(`/documents/${id}`)
    },

    onAddDoc: async (id) => {
      const createdDocument = await request('/documents', {
        method: 'POST',
        body: JSON.stringify({
          "title": "문서 제목",
          "parent": id
        })
      })

      // 새로 추가된 documentID URL로 이동
      RouterUtils.routerDispatcher(`/documents/${createdDocument.id}`)
      
      this.setState()
    },

    onDeleteDoc : async (id) => {
      await request(`/documents/${id}`, {
        method: 'DELETE'
      })

      // !!! 뒤로가기 기능 추가하기 
      
      this.setState()
    }

  })


  this.setState = async () => {
    // document들 새로 GET
    const documents = await request('/documents')
    // document들로 새로 setState
    documentList.setState(documents)
    console.log('documentList.setState!')
  }

  this.setState()

  EventUtils.titleEventListener(() => this.setState())
}