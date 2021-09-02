import DocumentList from './components/DocumentList.js';
import { request } from './utils/api.js';
import { RouterUtils } from './utils/router.js'
import { EventUtils } from './utils/event.js'

export default function NavigationBar ({ $target , onDeleteDoc }) {
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

    
    onDeleteDoc /*: async (id) => {
      await request(`/documents/${id}`, {
        method: 'DELETE'
      })

      // 현재 edit중인 문서 삭제 시 메인으로 가기
      const { pathname } = window.location
      const [, , documentId] = pathname.split('/')
      if (id === documentId) {
        // onDelete시 isReplace : true 값을 추가하여 뒤로가기 시 오류방지
        RouterUtils.routerDispatcher('/', true)
        //history.back()
      }

      this.setState()
    }*/

  })


  this.setState = async () => {
    // document들 새로 GET
    const documents = await request('/documents')
    // document들로 새로 setState
    documentList.setState(documents)
    //console.log('documentList.setState!', documents)
  }

  this.setState()

  EventUtils.titleEventListener(() => this.setState())
}