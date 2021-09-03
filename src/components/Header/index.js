export default function Header({ $target, text = "grighth12's Notion" }) {
  const $header = document.createElement('div')
  $header.className = 'Header'

  $target.appendChild($header)

  this.render = () => {
    $header.textContent = text
  }

  this.render()
}
