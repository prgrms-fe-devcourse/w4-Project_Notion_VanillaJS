export default function Editor({ $target, initialState }) {
  const $editor = document.createElement('div');

  $editor.className = 'editor';
  $editor.innerHTML = `
    <input name="title" type="text" placeholder="Untitled" />
    <textarea name="content" />
  `;

  $target.appendChild($editor);

  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  }

  this.render = () => {

  }
}
