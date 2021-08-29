import { getItem } from './storage.js';

export default function Editor({
    $target,
    initialState = {
            mainTitle : '',
            mainContent : ''
        },
    onEditing
}) {
    const $editor = document.createElement('div');
    $editor.className = 'editor'
    $target.appendChild($editor);

    this.state = initialState;

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    let isInit = false;

    this.render = () => {
      if(!isInit) {
          const { title, content } = this.state;
    
          $editor.innerHTML =
          `
          <div class='title-container'>
          <label for='title'>title</label>
          <input id='title' value='${title}'>
          </div>
          <div class='content-container'>
          <div class='subject'>content</div>
          <div class='content' contentEditable='true'>${content ? content : ''}</div>
          </div>
          `
        isInit = true;
      }
    };

    $editor.addEventListener('keyup', e => {
        const { target } = e;
        if(target.className === 'content') {
            const nextState = {
                        ...this.state,
                        content : target.textContent
            }

            this.setState(nextState);
            onEditing(nextState);
        } else if(target.tagName ==='INPUT') {
            const nextState = {
                ...this.state,
                title : target.value
            }
            this.setState(nextState);
            onEditing(nextState);
        }
    })
}
