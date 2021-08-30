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

    const { id, title, content } = this.state;

    const $title = $editor.querySelector('[name=title]');
    const $content = $editor.querySelector('[name=content]');

    $title.value = title;
    $content.value = content;

    if (id !== null) {
      $title.disabled = false;
      $content.disabled = false;
      $title.placeholder = '';
      $content.placeholder = '';
    }

    this.render();
  };

  let isInitialized = false;

  this.render = () => {
    const { id, title, content } = this.state;

    if (!isInitialized) {
      $editor.innerHTML = `
        <input
          name="title"
          type="text"
          style="width:300px"
          value="${title}"
          ${id === null ? 'disabled' : ''}
          placeholder="${id === null ? '문서를 선택해주세요' : ''}"
        />
        <textarea
          name="content"
          style="width:300px; height: 400px"
          ${id === null ? 'disabled' : ''}
          placeholder="${id === null ? '문서를 선택해주세요' : ''}"
        >${content}</textarea>
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
