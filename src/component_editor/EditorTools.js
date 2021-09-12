import { createElement } from '../utils/DOM.js';

export default function EditorTools({ $target, saveKeyword }) {
    const $editorTools = createElement('div');
    $editorTools.setAttribute('class', 'editor-tools');

    this.render = () => {
        $editorTools.innerHTML = `
        <div class='autocomplete-container'>
        <input type='text' placeholder='keyword입력'>
        </div>
        `;
    };

    this.render();
    $target.appendChild($editorTools);

    $editorTools.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            const text = $editorTools.querySelector('input').value;
            if (text.length > 0) {
                saveKeyword(text);
                $editorTools.querySelector('input').value = '';
            }
        }
    });
}
