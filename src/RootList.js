export default function RootList({
  $target,
  initialState
}) {
  const $rootList = document.createElement('div')

  $target.appendChild($rootList)

  this.state = initialState

  this.render = () => {
    $rootList.innerHTML = `
      <ul>
        <li>여기에는 루트 페이지들이 나타나야한다.
        <button>페이지 추가</button>
        </li>
        <button>새로운 root 추가</button>
      </ul>
    `
  }
  
  this.render()



}


