import { createElement } from '../utils/dom.js';
import { isEmpty } from '../utils/validator.js';
import {
  CLASS_NAME_DIMMED,
  CLASS_NAME_MODAL,
  ERROR_MSG_EMPTY_INPUT_VALUE,
  MSG_PLACEHOLDER_MODAL_TITLE,
  CLASS_NAME_DISPLAY_FLEX,
  KEY_ENTER,
  KEY_ESCAPE,
} from '../utils/constants.js';

export default function Modal({ $target, initialState, onTitleChange }) {
  const $dimmed = createElement('div');
  const $modal = createElement('div');
  const $input = createElement('input');

  $dimmed.className = CLASS_NAME_DIMMED;
  $modal.className = CLASS_NAME_MODAL;
  $input.type = 'text';
  $input.placeholder = MSG_PLACEHOLDER_MODAL_TITLE;

  $modal.appendChild($input);
  $dimmed.appendChild($modal);
  $target.appendChild($dimmed);

  this.state = initialState;

  this.setState = nextState => {
    if (nextState === null) {
      return;
    }

    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $dimmed.classList.add(CLASS_NAME_DISPLAY_FLEX);
    $input.focus();
  };

  const clear = () => {
    $dimmed.classList.remove(CLASS_NAME_DISPLAY_FLEX);
    $input.value = '';
    this.setState(null);
  };

  let isInit = false;

  this.init = () => {
    $dimmed.addEventListener('click', e => {
      const { classList } = e.target;

      if (!classList.contains(CLASS_NAME_DIMMED)) {
        return;
      }

      clear();
    });

    $input.addEventListener('keyup', e => {
      const {
        key,
        target: { value },
      } = e;

      if (key === KEY_ENTER) {
        if (isEmpty(value)) {
          alert(ERROR_MSG_EMPTY_INPUT_VALUE);
          return;
        }

        const { id } = this.state;
        onTitleChange({ id, title: value });
        clear();
      }
    });

    window.addEventListener('keyup', e => {
      const { key } = e;
      if ($dimmed.classList.contains(CLASS_NAME_DISPLAY_FLEX) && key === KEY_ESCAPE) {
        clear();
      }
    });

    isInit = true;
  };

  if (!isInit) {
    this.init();
  }
}