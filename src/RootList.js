import { request } from "./api.js"

export default function RootList({
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
    // documents가 []가 아니면 애기들도 소환해줘야 함
    
    const makeList = roots => {
      const root = roots.documents
      
      return `<ul>
      ${root.map(na => `
      <li data-id=${na.id} class="document-list">${na.title}
      <button class="add-child">+</button>
      <button class="delete">X</button></li>
      ${na.documents.length > 0 ? makeList(na) : ''}
      `).join('')}
      </ul>`
    }

    $rootList.innerHTML = `
      <ul>
        ${this.state.map(roots =>
        `<li data-id="${roots.id}" class="document-list">
        ${roots.title}  
        <button class="add-child">+</button>
        <button class="delete">X</button>
        </li>
        ${(roots.documents.length > 0 ? makeList(roots) : '' )}
        `).join('')}  
        <br><br><br><br>
        루트 li는 컨텐츠를 로딩해야함
        <li>여기에는 루트 페이지들이 나타나야한다.</li>
        <input  placeholder='새로운 root 추가' class='new-root'></input>
        <button class='add-root'>추가하기</button>
      </ul>
    `
    // 페이지 이동가능하게 만들어야 함
  }
  
  this.render()

  $rootList.addEventListener('click', (e) => {

    // 위에 리스트 값을 신경쓰는 부분
    const $li = e.target.closest('.document-list')
    if ($li) {
      const {id} = $li.dataset
      const { className } = e.target
      // console.log(className)
      // console.log(className === 'document-list root-item')  // true
      // console.log(className === 'document-list') // false
      if (className === 'add-child') {
        onAddChild(id)
      } else if (className === 'delete') {
        onDelete(id)
      } else if (className === 'document-list'){
        onPostClick(id)
      } 
    }

    // 새로운 root doc을 추가하는 부분
    const { className } = e.target
    if (className === 'add-root') {
      const val = $rootList.querySelector('.new-root').value
      if ( val.length > 0 ) {
        onAddRoot(val)
        alert('루트 추가!!!')
      }
    }
  })

}
