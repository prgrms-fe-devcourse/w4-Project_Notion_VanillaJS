import {request} from './api.js';

export default function DocumentMenu({$target, initialState, menuClick, newDoc, deleteDoc}) {

  const $menu = document.createElement('div')
  $menu.className = 'menu-container'
  $target.appendChild($menu)

  const $projectTitle = document.createElement('div')
  $projectTitle.innerHTML=`
    <h2>소정의 프로그래머스 노션</h2>
    <button class="new-doc-btn">+</button>
    `
  $menu.appendChild($projectTitle)

  const $rootMenu = document.createElement('div')
  $rootMenu.className = 'document-menu'
  $menu.appendChild($rootMenu)

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
    $rootMenu.innerHTML = ''
    menuTree(this.state.docList)
  }

  $projectTitle.addEventListener('click', (e) => {
    e.preventDefault()
    if(e.target.className === 'new-doc-btn'){
      newDoc()
    }
  })

  $rootMenu.addEventListener('click', (e) => {
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
