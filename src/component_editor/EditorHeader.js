import { createElement, setAttribute } from '../utils/DOM.js';

export default function EditorHeader({$target, initialState = ''}) {
  const $editHeader =createElement('div');
  setAttribute([['class','editor-header']], $editHeader);
  $target.appendChild($editHeader);

  this.state = initialState;
}