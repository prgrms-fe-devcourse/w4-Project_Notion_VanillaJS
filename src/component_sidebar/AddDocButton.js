import { createElement } from '../utils/DOM.js'

export default function AddDocButton({ $target, initialState, makeRootDoc }) {
    const $addButton = createElement('button');
    $addButton.setAttribute('class','add-doc-button');

    $addButton.addEventListener('click', makeRootDoc);
    
    this.state = initialState;

    this.render = () => {
        $addButton.textContent = this.state;
    };
    
    this.render();
    $target.appendChild($addButton);
}