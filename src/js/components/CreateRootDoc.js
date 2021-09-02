import Component from '../core/Component.js';

const CreateRootDoc = class extends Component {
  setEvent() {
    const {onCreate} = this.props
    this.$target.addEventListener('click', e => {
      onCreate()
    }) 
  }
}

export default CreateRootDoc
