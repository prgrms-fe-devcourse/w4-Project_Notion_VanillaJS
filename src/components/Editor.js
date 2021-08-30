export default function Editor({ $target, initialState, onEditing }) {
  const $editor = document.createElement('div');

  Object.assign($editor.style, {
    display: 'flex',
    'flex-direction': 'column',
  });

  $target.appendChild($editor);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    $editor.querySelector('[name=title]').value = this.state.title;
    $editor.querySelector('[name=content]').value = this.state.content;
    this.render();
  };

  let isInitialized = false;

  this.render = () => {
    if (!isInitialized) {
      $editor.innerHTML = `
        <input
          name="title"
          type="text"
          style="width:600px"
          value="${this.state.title}"
        />
        <textarea
          name="content"
          style="width:600px; height: 400px"
        >${this.state.content}</textarea>
      `;

      isInitialized = true;
    }
  };

  this.render();

  $editor.addEventListener('keyup', (e) => {
    const { name, value } = e.target;

    if (this.state[name] === undefined) {
      return;
    }

    this.setState({
      ...this.state,
      [name]: value,
    });

    onEditing(this.state);
  });
}
