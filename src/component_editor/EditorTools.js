import { createElement, getTagOf, querySelector, setAttribute, getInputValue } from '../utils/DOM.js';

export default function EditorTools({ $target, saveKeyWord }) {
    const $editorTools = createElement('div');
    setAttribute([['id', 'editor-tools']], $editorTools);
    $target.appendChild($editorTools);

    this.render = () => {
        $editorTools.innerHTML = `
    <div class='autocomplete-container'>
      <input type='text'>
      <button>키워드 등록</button>
    </div>
    `;
    };

    this.render();

    querySelector($editorTools, 'button').addEventListener('click', (e) => {
        const text = getInputValue(querySelector($editorTools, 'input'))
        
        if (text.length > 0) {
            saveKeyWord(text);
            querySelector($editorTools, 'input').value = '';
        }
    });
}
