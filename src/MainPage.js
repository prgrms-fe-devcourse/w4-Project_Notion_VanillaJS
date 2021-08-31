export default function MainPage({
  $target,
  initialState =  {
    title: '',
    content: ''
  }
}) {
  const $mainPage = document.createElement('div')
  $target.appendChild($mainPage)

  this.state = initialState

  this.setState = nextState => {
    this.state = nextState
    this.render()
  }
  this.render = () => {
    $mainPage.innerHTML = `
      이곳은 메인페이지 입니다.<br>
      바뀌어야 할 필요가 있는 곳이고
      바뀌어야 하는 페이지 입니다.<br>
      <input type='text' name="title" value="${this.state.title}"/><br>
      <textarea name="content" style="width: 300px; height: 300px;">여기의 값이 들어가야 하는 것
      1. 자동저장
      2. 스토리지 데이터 불러오기
      3. api 연동</textarea>
    `
  }

  this.render()
}