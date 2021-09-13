import { createElement } from '../utils/DOM.js';

export default function ToolList({ $target, onKeywordInput }) {
    const $toolList = createElement('div');
    $toolList.setAttribute('class', 'tool-list');

    this.render = () => {
        $toolList.innerHTML = `
    <input type='text' placeholder='자동완성 키워드 입력'>
    `;
    };

    this.render();
    $target.appendChild($toolList);

    $toolList.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            const text = $toolList.querySelector('input').value;
            if (text.length > 0) {
                onKeywordInput(text);
                $toolList.querySelector('input').value = '';
            }
        }
    });
}
