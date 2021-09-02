import api from '../api/index.js';
import Component from '../core/Component.js'
import ListPage from './ListPage.js';
import PostPage from './PostPage.js';

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

    new ListPage($listContainer)
    new PostPage($contentContainer)
  }


}

export default App
