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
    console.log(this.state)
    this.render()
  }

  this.render = () => {
    // documents가 []가 아니면 애기들도 소환해줘야 함
    
    const makeList = root => { 
        `<ul>
        <li data-id=${root.id} class="root-list">${root.title}</li>
        <button class="add-child">add page</button>
        <button class="delete">X</button>}
        </ul>`}
    // if (this.state.documents.length > 0) {
    //   makeList(state)
    // }
    // const recur = (childState) => {
    //   const state = this.state
    //   makeList(state)
    //   const {document} = this.state
    //   if (document.length > 0 ) {
    //     return
    //   }
    // }
    
    $rootList.innerHTML = `
      <ul>
        ${this.state.map(roots => 
        `<li data-id="${roots.id}" class="root-list">
        ${roots.title}  
        <button class="add-child">add page</button>
        <button class="delete">X</button>
        </li>`).join('')}  
        <br><br><br><br>
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
    const $li = e.target.closest('.root-list')
    if ($li) {
      const {id} = $li.dataset
      const { className } = e.target

      if (className === 'add-child') {
        onAddChild(id)
      } else if (className === 'delete') {
        onDelete(id)
      } else {
        console.log('시간이 된다면 토글 기능 구현')
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


