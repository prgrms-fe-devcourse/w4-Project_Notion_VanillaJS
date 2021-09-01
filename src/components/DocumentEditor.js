import { debounce } from '../utils/functions.js';
import { fetchPutDocument } from '../utils/api.js';
import { createElement } from '../utils/dom.js';
import { checkIsEmptyThrowError, checkUseConstructorFunction, isEmptyObject } from '../utils/validator.js';
import { parseMarkDown } from '../utils/functions.js';
import {
  DEBOUNCE_DELAY,
  EDITOR_DATA_CHANGED,
  CLASS_NAME_DOCUMENT_TITLE,
  CLASS_NAME_DOCUMENT_EDITOR,
  CLASS_NAME_DISPLAY_NONE,
  MSG_PLACEHOLDER_TITLE,
  MSG_EMPTY_EDIT_PAGE,
  CLASS_NAME_EMPTY_EDIT_PAGE_MESSAGE,
} from '../utils/constants.js';

export default function DocumentEditor({ $target, initialState }) {
  const validate = state => {
    checkUseConstructorFunction(new.target, DocumentEditor);
    checkIsEmptyThrowError(state);
  };

  validate(initialState);
  this.state = initialState;

  const $title = createElement('input');
  const $editor = createElement('div');
  const $emptyPageMessage = createElement('p');

  $emptyPageMessage.textContent = MSG_EMPTY_EDIT_PAGE;
  $emptyPageMessage.className = CLASS_NAME_EMPTY_EDIT_PAGE_MESSAGE;
  $title.type = 'text';
  $title.name = 'title';
  $title.className = CLASS_NAME_DOCUMENT_TITLE;
  $title.placeholder = MSG_PLACEHOLDER_TITLE;
  $editor.name = 'content';
  $editor.contentEditable = 'true';
  $editor.className = CLASS_NAME_DOCUMENT_EDITOR;

  $target.appendChild($title);
  $target.appendChild($editor);

  this.setState = nextState => {
    validate(nextState);
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (isEmptyObject(this.state)) {
      $editor.classList.add(CLASS_NAME_DISPLAY_NONE);
      $title.classList.add(CLASS_NAME_DISPLAY_NONE);

      $target.appendChild($emptyPageMessage);
      return;
    }

    $emptyPageMessage.remove();
    $editor.classList.remove(CLASS_NAME_DISPLAY_NONE);
    $title.classList.remove(CLASS_NAME_DISPLAY_NONE);

    const { content, title } = this.state;

    $title.value = title;
    $editor.innerHTML = content;
  };

  this.init = () => {
    $title.addEventListener(
      'keyup',
      debounce(async e => {
        const { value, name } = e.target;
        const { id, title } = this.state;
        const nextState = { ...this.state, [name]: value };

        let body = { title: nextState.title, content: nextState.content };

        await fetchPutDocument(id, body);

        this.setState(nextState);

        if (title !== $title.value) {
          window.dispatchEvent(new CustomEvent(EDITOR_DATA_CHANGED));
        }
      }, DEBOUNCE_DELAY)
    );

    $editor.addEventListener(
      'input',
      debounce(async e => {
        const { innerHTML, name } = e.target;
        const { id } = this.state;
        const nextState = { ...this.state, [name]: parseMarkDown(innerHTML) };

        let body = { title: nextState.title, content: nextState.content };

        await fetchPutDocument(id, body);

        this.setState(nextState);
      }, DEBOUNCE_DELAY)
    );
  };

  this.init();
}
