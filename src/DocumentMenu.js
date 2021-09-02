import {request} from './api.js';

export default function DocumentMenu({$target, initialState, menuClick}) {

  const $menu = document.createElement('div')
  $menu.className = 'document-menu'
  $target.appendChild($menu)

  this.state = initialState

  this.setState = async() => {
    const documentList = await request('/documents')
    this.state = documentList
    console.log('this.state :>> ', this.state);
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
      documentNode.innerHTML=`<a href="">${doc.title}</a>`
      parentNode.appendChild(wrapperNode)
      if (doc.documents.length !== 0) {
        menuTree(doc.documents, doc.id)
      }
    })
  }
  this.render = () => {
    menuTree(this.state)
    
  }
  $menu.addEventListener('click', (e) => {
    e.preventDefault()
    const $li = e.target.closest('li')
    menuClick($li)
  })

};