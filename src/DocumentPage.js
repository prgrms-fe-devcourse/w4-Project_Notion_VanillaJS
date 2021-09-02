export default function DocumentPage({$target, initialState}) {
  const $page = document.createElement('div')
  $target.appendChild($page)

  this.state = initialState

  this.setState = nextState => {
    this.state = nextState
    this.render()
  }
  this.render = () => {
    $page.innerHTML = `
      <div>${this.state.title}</div>
      <div>${this.state.content}</div>
    `
  }

  // this.render()

};
