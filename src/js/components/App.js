import api from '../api/index.js';
import Component from '../core/Component.js'
import ListContainer from './ListContainer.js';
import ContentContainer from './ContentContainer.js';

const App = class extends Component{

  async init() {
    this.state = {
      selectedDocId: ''
    }
  
    this.render()
  }

  template() {
    return `
      <section id="list-container" class="sidebar"></section>
      <section id="content-container"></section>
    `     
  }

  mount() {
    const $listContainer = this.$target.querySelector('#list-container');
    const $contentContainer = this.$target.querySelector('#content-container')

    new ListContainer($listContainer)
    new ContentContainer($contentContainer)
  }


}

export default App
