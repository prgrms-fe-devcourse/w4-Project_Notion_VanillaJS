import { request } from "./api.js"


export default function RootList({ // Root가 아니라 Document로 변경
  $target,
  initialState,
  onAddChild,
  onDelete,
  onPostClick,
  onAddRoot
}) {
  const $rootList = document.createElement('div')
  $target.appendChild($rootList)

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }
  
  this.render = () => {
    
    const makeList = (documents) => {
      return `
      ${documents.map(document => `
      <ul class="${document.id}" id=${document.id} style="display:''">
      <li data-id=${document.id} class="documents-list">
        <span class="ontoggle">숨김</span>
        <span class="document-list">${document.title}</span>
        <button class="add-child">+</button>
        <button class="delete">X</button></li>
        ${document.documents.length > 0 ? makeList(document.documents) : ''}
        </ul>`).join('')}
      `
    }
    
    $rootList.innerHTML = `<ul>
        ${makeList(this.state)}
        <br><li><span class="add-rootDocument">+ 페이지 추가</span></li>
        </ul>
        `
  }
  
  this.render()

  $rootList.addEventListener('click', (e) => {
    
    const $li = e.target.closest('.documents-list')
    if ($li) {
      const {id} = $li.dataset
      const { className } = e.target
      
      
      if (className === 'add-child') {
        onAddChild(id)
        
      } else if (className === 'delete') {
        onDelete(id)
      } else if (className === 'document-list'){
        onPostClick(id)
      } 
      
    const $ul = e.target.closest('ul')
    if ($ul) {
      if (className === 'ontoggle') {

        const selectedul = $ul.children
        for (let i = 1; i < selectedul.length; i++) {
          const dd = selectedul[i].style.display
          if (selectedul[i].style.display === '' ) {
            selectedul[i].style.display = 'none'
            const c = $li.getElementsByClassName('ontoggle')[0]
            c.innerHTML = '숨겨짐'
          } else {
            selectedul[i].style.display = ''
            const c = $li.getElementsByClassName('ontoggle')[0]
            c.innerHTML = '숨김'
          }
        }
      }
    }
    }
    const { className } = e.target
    
    if (className === 'add-rootDocument') {
      onAddRoot()
    }
  })

}
