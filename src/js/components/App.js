import api from '../api/index.js';
import Component from '../core/Component.js'
import ListContainer from './ListContainer.js';

const App = class extends Component{

  async init() {
    this.state = await api.getAllDocs()
    this.render()
  }

  template() {
    return `
      <section id="list-container" class="sidebar"></section>
      <main id="content-container"></main>
    `     
  }

  mount() {
    const $listContainer = this.$target.querySelector('#list-container');
    const $contentContainer = this.$target.querySelector('#content-container')

    new ListContainer(
      $listContainer,
      {
        state: this.state
      }
    )
  }
}

export default App
