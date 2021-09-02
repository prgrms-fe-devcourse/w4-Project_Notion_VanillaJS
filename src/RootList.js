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
    
    const makeList = (documents) => `
      ${documents.map(document => {
        const {id, title, documents} = document
        return `<li data-id=${id} class="documents-list">
          <span class="ontoggle">${documents.length > 0 ? '&#129094;' : '&#5125;'}</span>   
          <span class="document-list">${title}</span>
          <button class="add-child">&#43;</button>
          <button class="delete">&#10006;</button></li>
          ${documents.length > 0 ? childrenMakeList(documents) : ''}
      `}).join('')}`
    

    const childrenMakeList = (documents) =>`
        <ul class="child" style="display: none ">
        ${makeList(documents)}
      </ul>`
    
    
    $rootList.innerHTML = `<ul class="root-document">
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
      
      if (className === 'ontoggle') {
        
        const $ul = $li.nextElementSibling
        if ($ul){
          if ($ul.className === 'child') {
            if ($ul.style.display === 'none') {
              $ul.style.display = ''
              const textee = $li.getElementsByClassName('ontoggle')[0]
              textee.innerHTML = ' &#9660'
            } else {
              $ul.style.display = 'none'
              const textee = $li.getElementsByClassName('ontoggle')[0]
              textee.innerHTML = '&#129094'
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
