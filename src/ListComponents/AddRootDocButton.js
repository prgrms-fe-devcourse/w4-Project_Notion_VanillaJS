export default function AddRootDocButton({ $target, onClick }) {
  const $rootButton = document.createElement('button')
  $rootButton.className = 'add-root-button'
  $rootButton.textContent = '페이지 추가'

  this.render = () => {
    $target.appendChild($rootButton)
  }

  $rootButton.addEventListener('click', (e) => {
    onClick()
  })

  this.render()
}
