import Component from '../core/Component.js';

const TitleContiainer = class extends Component {
  template() {
    const {title} = this.state;
    return `
      <div class="document-title" contenteditable="true" placeholder="제목없음">${title}</div>
    `
  }

  setEvent() {
    const { onUpdate, onUpdateTitle } = this.props
    
    this.$target.addEventListener('keyup', e => {
      const newTitle = e.target.textContent;
      const newState =  {
        title: newTitle
      }
      this.state = newState
      
      onUpdateTitle(newState)

      if (this.timer) {
        clearTimeout(this.timer)
      }    
      this.timer = setTimeout(() => onUpdate(newState), 500)
    })
  }
}

export default TitleContiainer
