import { RouterUtils } from '../utils/router.js'

export default function LinkButton({ 
  $target, 
  initialState
}) {
  const $linkBtn = document.createElement('button')
  $target.appendChild($linkBtn)

  this.state = initialState

  this.render = () => {
    $linkBtn.textContent = this.state.title
  }

  this.render()

  $linkBtn.addEventListener('click', () => {
    RouterUtils.routerDispatcher(`/documents/${this.state.id}`)
  })
}