import { setItem } from "./storage.js"
import { makeList } from "../utils/makeList.js"

export default function DocumentList({ 
  $target,
  initialState,
  onAddChild,
  onDelete,
  onPostClick,
  onAddRoot
}) {

  const $documentList = document.createElement('div')
  $target.appendChild($documentList)
  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }
  
  this.render = () => {
    $documentList.innerHTML = `
      <ul class="root-document">
        ${makeList(this.state)}
        <br><li class="add-root-Document">
          <span class="add-rootDocument">+ 페이지 추가</span>
        </li>
      </ul>
    `
  }
  
  this.render()

  $documentList.addEventListener('click', (e) => {
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
        const $ul = $li.children[1]
        const ulClassName = $ul.className.split('-')
        let toggleLocalSaveKey = `temp-toggle-${ulClassName}`
        const setToggle = (item) => {
          (ulClassName.length > 1) ? setItem(toggleLocalSaveKey, {state: item}) : '';
        }

        if ($ul.style.display === 'none') {
          $ul.style.display = 'block'
          e.target.innerHTML = '&#9660;';
          setToggle('block')
        } else {
          $ul.style.display = 'none'
          e.target.innerHTML = '&#10148;';
          setToggle('none')
        }
      }
    }

    const { className } = e.target
    if (className === 'add-rootDocument') {
      onAddRoot()
    }
  })

}
