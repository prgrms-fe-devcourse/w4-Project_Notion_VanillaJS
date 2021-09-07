import { createElement } from '../utils/DOM.js';

export default function EditorTools({ $target, saveKeyWord }) {
    const $editorTools = createElement('div');
    $editorTools.setAttribute('class','editor-tools');
    
    this.render = () => {
        $editorTools.innerHTML = `
        <div class='autocomplete-container'>
        <input type='text'>
        <button>키워드 등록</button>
        </div>
        `;
    };
    
    this.render();
    $target.appendChild($editorTools);
    
    $editorTools.querySelector('button').addEventListener('click', () => {
        const text = $editorTools.querySelector('input').value;
        
        if (text.length > 0) {
            saveKeyWord(text);
            $editorTools.querySelector('input').value = '';
        }
    });
}
