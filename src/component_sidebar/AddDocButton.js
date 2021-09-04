import { createElement, setAttribute } from '../utils/DOM.js'

export default function AddDockButton({ $target, initialState, onClick }) {
    const $addButton = createElement('button');
    $addButton.setAttribute('class','add-doc-button');

    $addButton.addEventListener('click', onClick);
    
    this.state = initialState;

    $addButton.textContent = this.state;

    this.render = () => {
        $target.appendChild($addButton);
    };


    this.render();
}