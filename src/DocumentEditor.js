import { request } from './api.js';

export default function DocumentEditor({ $target, initialState }) {
  this.state = initialState;

  const $documentEditor = document.createElement('div');

  $target.appendChild($documentEditor);

  this.setState = nextState => {
    this.state = nextState;

    this.render();
  };

  this.render = () => {
    if (this.state.isLoad) {
      $documentEditor.innerHTML = `
      <ul>
        <textarea name="title">${this.state.title}</textarea>
        <textarea name="content">${this.state.content}</textarea>
      </ul>
    `;
    }

    this.state.isLoad = false;
  };

  $documentEditor.addEventListener('keyup', e => {
    const { target } = e;
    const type = target.getAttribute('name');

    const nextState = {
      ...this.state,
      [type]: target.value
    };

    this.setState(nextState);
    onEditing();
  });

  this.getDocument = async documentId => {
    const nextState = await request(`/${documentId}`);

    this.setState({
      title: nextState.title,
      content: nextState.content,
      isLoad: true,
      documentId: documentId
    });
  };

  let timer = null;

  const onEditing = () => {
    if (!this.state.documentId) return;
    if (timer !== null) clearTimeout(timer);
    timer = setTimeout(() => {
      request(`/${this.state.documentId}`, {
        body: JSON.stringify({
          title: this.state.title,
          content: this.state.content
        }),
        method: 'PUT'
      });
    }, 1000);
  };

  // this.render();
}
