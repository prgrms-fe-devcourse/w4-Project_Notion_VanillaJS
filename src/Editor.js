import { getItem } from './storage.js';

export default function Editor({
    $target,
    initialState = {
        mainTitle: '',
        mainContent: '',
    },
    onEditing,
}) {
    const $editor = document.createElement('div');
    $editor.className = 'editor';
    $target.appendChild($editor);

    this.state = initialState;
    let tempState = {
        title : '',
        content : ''
    }

    this.setState = (nextState) => {
        this.state = nextState;
        tempState = {...this.state};
        this.render();
    };


    this.render = () => {
        const { title, content } = this.state;

        $editor.innerHTML = `
          <div class='title-container'>
          <label for='title'>title</label>
          <input id='title' value='${title}'>
          </div>
          <div class='content-container'>
          <div class='subject'>content</div>
          <div class='content' contentEditable='true'>${content ? content : ''}</div>
          </div>
          `;
    };

    $editor.addEventListener('keyup', (e) => {
        const { target } = e;
        if (target.className === 'content') {
            tempState = {
                ...tempState,
                content: target.textContent,
            };

            // this.setState(nextState);
            onEditing(tempState);
        } else if (target.tagName === 'INPUT') {
            tempState = {
                ...tempState,
                title: target.value,
            };

            // this.setState(nextState);
            onEditing(tempState);
        }
    });
}
