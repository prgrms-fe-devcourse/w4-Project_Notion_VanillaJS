export default function PostEditor({ $target, initialState }) {
  this.state = initialState;

  const $postEditor = document.createElement('div');

  $target.appendChild($postEditor);

  this.setState = nextState => {
    this.state = nextState;

    this.render();
  };

  this.render = () => {
    $postEditor.innerHTML = `
      <ul>
        <textarea>${this.state.title}</textarea>
        <textarea>${this.state.content}</textarea>
      </ul>
    `;
  };

  this.render();
}
