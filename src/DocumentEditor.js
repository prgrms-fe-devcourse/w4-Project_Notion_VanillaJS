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
  });

  this.getDocument = async documentId => {
    const nextState = await request(`/${documentId}`);

    this.setState({ title: nextState.title, content: nextState.content, isLoad: true });
  };

  this.render();
}
