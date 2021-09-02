import {request} from './api.js';

export default function DocumentMenu({$target, initialState, menuClick, newDoc, deleteDoc}) {

  const $menu = document.createElement('div')
  $menu.className = 'document-menu'
  $target.appendChild($menu)

  this.state = initialState

  this.setState = nextState => {
    this.state = nextState
    this.render()
  }


  const menuTree = (currentDocument, parentId = 0) => {
    let parentNode
    if (parentId === 0) {
      parentNode = document.querySelector('.document-menu')
    } else {
      parentNode = document.querySelector(`.menu-${parentId}`)
    }
    const wrapperNode = document.createElement('ul')

    currentDocument.forEach(doc => {
      const documentNode = document.createElement('li')
      documentNode.setAttribute('data-id', `${doc.id}`)
      documentNode.className = `menu-${doc.id}`

      wrapperNode.appendChild(documentNode)
      documentNode.innerHTML=`<a href="">${doc.title}</a><button class="new-doc-btn">+</button><button class="delete-doc-btn">x</button>`
      parentNode.appendChild(wrapperNode)
      if (doc.documents.length !== 0) {
        menuTree(doc.documents, doc.id)
      }
    })
  }
  this.render = () => {
    $menu.innerHTML = ''
    menuTree(this.state.docList)
  }

  $menu.addEventListener('click', (e) => {
    e.preventDefault()

    const $li = e.target.closest('li')
    const {className} = e.target
    if ($li) {
      if (className === 'new-doc-btn') {
        const {id} = e.target.parentNode.dataset
        newDoc(id)
      }else if (className === 'delete-doc-btn') {
        const {id} = e.target.parentNode.dataset
        deleteDoc(id)
      }
      else{
        menuClick($li)
      }
    }
  })

};
