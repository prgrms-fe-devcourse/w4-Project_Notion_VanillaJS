import Component from '../core/Component.js';
import debounce from '../utils/debounce.js';

const SPACE_KEY = ' ';
const BACK_SPACE_KEY = 'Backspace'
const ENTER_KEY = 'Enter'

const EditableBlock = class extends Component{
  timer = null;
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

      if (key === SPACE_KEY && text.length < 4) {
        e.preventDefault();
        onConvert(blockIndex, text)
      }

      if (key === BACK_SPACE_KEY && text.length === 0) {
        onRemove(blockIndex, text)
      }

      if (key === ENTER_KEY ) {
        onCreate(blockIndex, text);
      }
    })

    this.$target.addEventListener('keyup', (e) => {
      const {target} = e
      const blockIndex = Number(target.dataset.index);
      const text = target.textContent;
      if (text.startsWith('#') || text.length === 0) return;

      e.stopImmediatePropagation();

        if (this.timer) {
          clearTimeout(this.timer)
        }
        
        this.timer = setTimeout(() => onEditing(blockIndex, text), 200)  
        
    })
  }

  render() {
    this.$target.insertAdjacentHTML('beforeend', this.template())
  }
}

export default EditableBlock
