export default function NotFoundPage({ $target }) {
  const $page = document.createElement('div')

  this.render = () => {
    $target.appendChild($page)
    $page.innerHTML = '⚠ 존재하지 않는 페이지입니다.'
  }
}
