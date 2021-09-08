import { renderBottomBar } from '../../utils/templates.js'

export default function BottomBar({ $target }) {
  const $bottomBar = document.createElement('div')
  $bottomBar.className = 'Editor__bottom-bar'

  $target.appendChild($bottomBar)

  this.state = null

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    if (!this.state) return

    $bottomBar.innerHTML = renderBottomBar(this.state)
  }

  this.render()
}
