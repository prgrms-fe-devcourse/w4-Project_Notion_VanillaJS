export default function HomePage({ $target }) {
  const $homepage = document.createElement('div')
  
  this.template =/*html*/`
  <div>
    <h1>문서를 선택해 주세요.</h1>
  </div>
  `

  this.render = () => {
    $homepage.innerHTML = this.template
    $target.appendChild($homepage)
  }

}