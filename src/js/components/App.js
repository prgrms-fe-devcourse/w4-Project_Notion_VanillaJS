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
      <section id="list-container" class="sidebar" style="height: 100%;"></section>
      <section class="js-content-container" style="disply: flex; flex-direction: column; width: 100%; height: 100%"></section>
    `     
  }

  mount() {
    const $listContainer = this.$target.querySelector('#list-container');
    const $contentContainer = this.$target.querySelector('.js-content-container')

    new ListContainer($listContainer)
    new ContentContainer($contentContainer)
  }


}

export default App
