export default function MainPage({ $target, initialState }) {
  const $page = document.createElement('div')

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    $target.appendChild($page)
    $page.innerHTML = '메인페이지 입니다.'
  }
}
