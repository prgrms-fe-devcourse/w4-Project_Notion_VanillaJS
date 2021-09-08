export default function LoadingBox({ $target, initialState }) {
  const $loadingBox = document.createElement('div')
  $target.appendChild($loadingBox)

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    const isLoading = this.state
    if (isLoading) {
      $loadingBox.className = 'LoadingBox'
      $loadingBox.innerHTML = `
        저장중입니다.
      `
    } else {
      setTimeout(() => {
        $loadingBox.className = 'none'
      }, 600)
    }
  }

  this.render()
}
