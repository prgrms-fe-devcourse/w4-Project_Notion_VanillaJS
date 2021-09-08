import { renderBottomBar } from '../../utils/templates.js'

export default function BottomBar({ $target, onDocumentClick }) {
  const $bottomBar = document.createElement('div')
  $bottomBar.className = 'Editor__bottom-bar'

  $target.appendChild($bottomBar)

  this.state = null

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    $bottomBar.innerHTML = renderBottomBar(this.state)
  }

  this.render()
}
