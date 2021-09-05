export default function Editor({
  $target,
  initialState,
  onEditing,
}) {
  const $editor = document.createElement('div');
  $editor.setAttribute('class', 'editor');

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
      $content.placeholder = '내용을 입력해주세요';
    }

    this.render();
  };

  let isInitialized = false;

  this.render = () => {
    const { id, title, content } = this.state;

    if (!isInitialized) {
      $editor.innerHTML = `
        <input
          class="editor__title"
          name="title"
          type="text"
          style="width:100%; padding: 10px"
          value="${title}"
          ${id === null ? 'disabled' : ''}
          placeholder="${id === null ? '문서를 선택해주세요' : ''}"
        />
        <textarea
          class="editor__content"
          name="content"
          style="width:100%; height:100%; padding: 10px"
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

    const nextState = {
      ...this.state,
      [name]: value,
    };

    if (nextState.title === this.state.title
      && nextState.content === this.state.content) {
      return;
    }

    this.setState(nextState);

    onEditing(this.state);
  });

  $target.appendChild($editor);
}
