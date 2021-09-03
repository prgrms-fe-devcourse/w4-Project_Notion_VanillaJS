export default function Header({
  $target,
  initialState
}) {
  const $h2 = document.createElement('h2')
  $target.appendChild($h2)
  this.state = initialState

  this.render = () => {
    $h2.innerHTML = `${this.state.name}의 Simple Notion`
  }

  this.render()
  const { origin } = window.location
  $h2.setAttribute('onclick', `location.href="${origin}"`)
  
}