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
      ${this.state.map(doc => `
        <li data-id="${doc.id}">${doc.title}</li>
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
            <li data-id="${doc.id}">${doc.title}${id == doc.id ? `<ul>${doc.documents.map(onSelectDoc=>`<li data-id="${onSelectDoc.id}">${onSelectDoc.title}`)}</ul>` : ''}</li>
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

    const fetchDocument = async (click) => {
      const document = await request(`/documents/${click}`,{
        method: 'GET',
      })
      editor.setState(document)
    }
    
    fetchDocument(onDocsClick)
//

  this.render()
  })
}
