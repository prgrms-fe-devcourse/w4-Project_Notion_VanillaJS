import { createElement, setAttribute } from '../utils/DOM.js';

export default function EditorTools({$target}) {
  const $editorTools =createElement('div');
  setAttribute('editor-tools',$editorTools);
  $target.appendChild($editorTools);

  this.render = () => {
    $editorTools.innerHTML = `
    <div class='autocomplete-container'>
      <input type='text'>
    </div>
    `
  }

  this.render();
}