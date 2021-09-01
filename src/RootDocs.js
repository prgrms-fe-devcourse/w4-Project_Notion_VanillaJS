import { docsTreeToArray } from "./tool.js"
import Editor from "./Editor.js"
import { request } from "./api.js"
export default function RootDocs({ $target, initialState, onDocsClick }) {
  const $rootDocs = document.createElement('div')
  $target.appendChild($rootDocs)

  this.state = initialState

  this.setState = nextState => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    $rootDocs.innerHTML = `
    <ul>
    <button class="newBtn">📒</button>
      ${this.state.map(doc => `
        <li data-id="${doc.id}">${doc.title}<button class="newBtn">📕</button><button class="removeBtn">❌</button></li>
      `).join('')}
    </ul>
    `
  }

  this.render()

  $rootDocs.addEventListener('click', (e) => {
    const $li = e.target.closest('li')
    
    if ($li) {
      const { id } = $li.dataset
      onDocsClick = id
      console.log(id);

      this.render = () => {
        $rootDocs.innerHTML = `
        <ul class="sideBar">
          ${this.state.map(doc => `
            <li data-id="${doc.id}">${doc.title}${id == doc.id && doc.documents.length 
              ? `<ul>${doc.documents.map(onSelectDoc=>`<li data-id="${onSelectDoc.id}">${onSelectDoc.title}<button class="newBtn">📕</button><button class="removeBtn">❌</button>`).join('')}</li>` 
              : '<button class="newBtn">📕</button><button class="removeBtn">❌</button>'}
            </ul>
          `).join('')}
        </ul>
        `
      }
    }
//  
    const editor = new Editor({
      $target,
      initialState: {},
      onDocsClick: ''
    })

    const fetchDocument = async (clickId) => {
      const document = await request(`/documents/${clickId}`,{
        method: 'GET',
      })
      editor.setState(document)
    }

    const newDocument = async (clickId) => {
      const document = await request(`/documents`,{
        method: 'POST',
        body: JSON.stringify({
          'title':'제목테스트',
          'parent': Number(clickId)
        })
      })
    }

    const deleteDocument = async (clickId) => {
      const document = await request(`/documents/${clickId}`,{
        method: 'DELETE',
      })
    }
    
    
    const { className } = e.target
    if(className === 'newBtn'){
      newDocument(onDocsClick)
    } else if (className === 'removeBtn'){
      deleteDocument(onDocsClick)
    } else {
      fetchDocument(onDocsClick)
    }

  this.render()
  })
}
