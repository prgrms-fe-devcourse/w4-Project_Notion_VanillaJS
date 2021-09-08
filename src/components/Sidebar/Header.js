export default function Header({ $target, initialState }) {
  const $header = document.createElement('div')
  $header.className = 'Header'

  $target.appendChild($header)

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    $header.innerHTML = `${this.state ? this.state : 'anonymous'}'s Notion`
  }

  this.render()
}
