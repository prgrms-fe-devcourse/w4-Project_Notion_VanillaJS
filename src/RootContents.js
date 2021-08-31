export default function RootContents({ $target, initialState, onDocsClick }) {
  const $rootContents = document.createElement('div')
  $target.appendChild($rootContents)

  this.state = initialState

  this.setState = nextState => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    $rootContents.innerHTML = `
    <ul>
      " Root Content 테스트입니다 "
    </ul>
    `
  }

  this.render()
}
