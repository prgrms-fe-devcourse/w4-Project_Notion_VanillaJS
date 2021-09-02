import { request } from "./api.js"
import { setItem, getItem } from "./storage.js"
import { makeList } from "../utils/makeList.js"

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
      console.log($li)
      const {id} = $li.dataset
      const { className } = e.target
      
      if (className === 'add-child') {
        onAddChild(id)
        
      } else if (className === 'delete') {
        onDelete(id)
      } else if (className === 'document-list'){
        onPostClick(id)
      } 
      

      // 코드 정리
      if (className === 'ontoggle') {
        // console.log($ul)
        
        
        const cc = $li.children[1]
        
        const a33 = cc.className.split('-')
        let toggleLocalSaveKey = `temp-toggle-${a33[1]}`
        if (cc.style.display) {
          cc.style.display = ''
          e.target.innerHTML = '&#9660;';
          (a33.length > 1) ? setItem(toggleLocalSaveKey, {state: ''}) : '';
        } else {
          cc.style.display = 'none'
          e.target.innerHTML = '&#10148;';
          (a33.length > 1) ? setItem(toggleLocalSaveKey, {state: 'none'}) : '';
          // 
        }
      //   const cc = $li.children[4].children
      //   for (let i = 0; i < cc.length; i++ ) {
      //   console.log(cc[i])
      //   console.log(cc[i].style.display)
      //   console.log(e.target)
        
      // }
        // for (let i = 0; i < $ul.children.length; i++) {
        //   const toggleChild = $ul.children[i]

          
        
        //   if (toggleChild.className === 'documents-list') {
        //     console.log(toggleChild)
        //     let toggleChildStyle = toggleChild.style.display
            
        //     if (toggleChildStyle === 'none'){
        //       toggleChildStyle = ''
        //       const textee = $li.getElementsByClassName('ontoggle')[0]
        //       textee.innerHTML = '&#9660'
        //       setItem(toggleLocalSaveKey, '')
        //     } else {
        //       console.log(toggleChildStyle)
              
        //       toggleChildStyle = 'none'
        //       const textee = $li.getElementsByClassName('ontoggle')[0]
        //       console.log(111)
        //       textee.innerHTML = '&#129094'
        //       setItem(toggleLocalSaveKey, 'none')
        //     }
        //   }
          
        // }
        
        // if ($ul){
        //   // 코드 정리해야함 !!!!!!!!!
        //   const a33 = $ul.className.split('-')
          
        //   if ($ul.className === 'child') {
        //     if ($ul.style.display === 'none') {
        //       $ul.style.display = ''
        //       const textee = $li.getElementsByClassName('ontoggle')[0]
        //       textee.innerHTML = ' &#9660'
        //     } else {
        //       $ul.style.display = 'none'
        //       const textee = $li.getElementsByClassName('ontoggle')[0]
        //       textee.innerHTML = '&#129094'
        //     }
        //   }

        //   if (a33.length > 1) {
        //     let toggleLocalSaveKey = `temp-toggle-${a33[1]}`
        //     if ($ul.style.display === 'none') {
        //       $ul.style.display = ''
        //       const textee = $li.getElementsByClassName('ontoggle')[0]
        //       textee.innerHTML = ' &#9660'
        //       setItem(toggleLocalSaveKey, {state: ''})
        //     } else {
        //       $ul.style.display = 'none'
        //       const textee = $li.getElementsByClassName('ontoggle')[0]
        //       textee.innerHTML = '&#129094'
        //       setItem(toggleLocalSaveKey, {state: 'none'})
        //     }
        //   }
        // }
      }
    
    }
    const { className } = e.target
    
    if (className === 'add-rootDocument') {
      onAddRoot()
    }
  })

}
