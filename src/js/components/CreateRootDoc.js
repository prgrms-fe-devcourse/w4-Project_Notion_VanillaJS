import Component from '../core/Component.js';

const CreateRootDoc = class extends Component {
  template() {
    return `
    <i class='bx bx-plus'></i>
    <span>새 페이지</span>  
    `
  }

  setEvent() {
    const {onCreate} = this.props
    this.$target.addEventListener('click', e => {
      onCreate()
    }) 
  }
}

export default CreateRootDoc
