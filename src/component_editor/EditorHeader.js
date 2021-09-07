import { createElement } from '../utils/DOM.js';

export default function EditorHeader({$target, initialState = ''}) {
  // 레이아웃만 잡아놓고 아직 코딩하진 못함.
  const $editHeader =createElement('div');
  $editHeader.setAttribute('class','editor-header');
  $target.appendChild($editHeader);

  this.state = initialState;
}