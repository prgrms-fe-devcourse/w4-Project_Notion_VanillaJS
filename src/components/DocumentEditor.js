import { debounce } from '../utils/functions.js';
import { fetchPutDocument } from '../utils/api.js';
import { createElement } from '../utils/dom.js';
import { checkIsEmptyThrowError, checkUseConstructorFunction } from '../utils/validator.js';
import {
  DEBOUNCE_DELAY,
  EDITOR_DATA_CHANGED,
  CLASS_NAME_DOCUMENT_TITLE,
  CLASS_NAME_DOCUMENT_EDITOR,
  MSG_PLACEHOLDER_EDITOR,
  MSG_PLACEHOLDER_TITLE,
} from '../utils/constants.js';

export default function DocumentEditor({ $target, initialState }) {
  const validate = state => {
    checkUseConstructorFunction(new.target, DocumentEditor);
    checkIsEmptyThrowError(state);
  };

  validate(initialState);
  this.state = initialState;

  const $title = createElement('input');
  const $editor = createElement('textarea');

  $title.type = 'text';
  $title.name = 'title';
  $title.className = CLASS_NAME_DOCUMENT_TITLE;
  $title.placeholder = MSG_PLACEHOLDER_TITLE;
  $editor.className = CLASS_NAME_DOCUMENT_EDITOR;
  $editor.placeholder = MSG_PLACEHOLDER_EDITOR;

  $target.appendChild($title);
  $target.appendChild($editor);

  this.setState = nextState => {
    validate(nextState);
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { content, title } = this.state;

    $title.value = title;
    $editor.value = content;
  };

  this.init = () => {
    $target.addEventListener(
      'keyup',
      debounce(async e => {
        const { value, className } = e.target;
        const { id, title } = this.state;

        let body = {};
        if (className === CLASS_NAME_DOCUMENT_TITLE) {
          body = { title: value, content: $editor.value };
        } else if (className === CLASS_NAME_DOCUMENT_EDITOR) {
          body = { title: $title.value, content: value };
        }

        await fetchPutDocument(id, body);

        this.setState({
          ...this.state,
          content: body.content,
          title: body.title,
        });

        if (title !== $title.value) {
          window.dispatchEvent(new CustomEvent(EDITOR_DATA_CHANGED));
        }
      }, DEBOUNCE_DELAY)
    );
  };

  this.init();
}
