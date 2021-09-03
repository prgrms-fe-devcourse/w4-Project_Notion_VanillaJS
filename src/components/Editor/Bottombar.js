export default function BottomBar({ $target }) {
  const $bottomBar = document.createElement('ul')
  $bottomBar.className = 'Editor__bottomBar'

  $target.appendChild($bottomBar)

  this.state = null

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    if (!this.state) return

    $bottomBar.innerHTML = this.state
      .map(({ id, title }) => `<li data-id=${id}>${title}</li>`)
      .join('')
  }

  this.render()
}
