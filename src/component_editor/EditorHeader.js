import { createElement } from '../utils/DOM.js';

export default function EditorHeader({$target, initialState = ''}) {
  const $editHeader =createElement('div');
  $editHeader.setAttribute('class','editor-header');
  $target.appendChild($editHeader);

  this.state = initialState;
}