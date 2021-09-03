import Component from '../core/Component.js';
import debounce from '../utils/debounce.js';

const SPACE_KEY = ' ';
const BACK_SPACE_KEY = 'Backspace'
const ENTER_KEY = 'Enter'

const EditableBlock = class extends Component{
  
  template() {
    const { index, className, placeholder, text} = this.state
    return `
      <div 
        class="${className} editable-block"
        contenteditable="true"
        data-index="${index}" 
        placeholder='${placeholder}'
      >${text}</div>
    `
  }

  setEvent() {
    const { onConvert, onRemove, onEditing, onCreate } = this.props;
    
    this.$target.addEventListener('keydown', (e) => {
      const {target, key} = e
      const blockIndex = Number(target.dataset.index);
      const text = target.textContent;

      e.stopImmediatePropagation();
      
      onEditing(blockIndex, text)
      if (key === SPACE_KEY && text.length < 4) {
        e.preventDefault();
        onConvert(blockIndex, text)
      }
  /*
      if (key === SPACE_KEY && target.textContent === '-') {
        e.preventDefault()
        e.target.setAttribute('placeholder', '리스트')
        e.target.textContent = '';
        e.target.classList.add('header-block');
      }
      */

      if (key === BACK_SPACE_KEY && text.length === 0) {
        onRemove(blockIndex, text)
      }

      // if (key === BACK_SPACE_KEY) {
      //   onEditing(blockIndex, text)
      // }

      if (key === ENTER_KEY ) {
        onCreate(blockIndex, text);
      }
    })
  }

  render() {
    this.$target.insertAdjacentHTML('beforeend', this.template())
  }
}

export default EditableBlock
