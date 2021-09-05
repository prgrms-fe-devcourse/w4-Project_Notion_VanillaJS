import Component from '../core/Component.js'
import ListPage from './ListPage.js';
import PostPage from './PostPage.js';

const App = class extends Component{
  async init() {
    this.render()
    this.mount()
  }

  template() {
    return `
      <section class="sidebar js-list-page" style="height: 100%;"></section>
      <section class="js-post-page" style="disply: flex; flex-direction: column; width: 100%; height: 100%"></section>
    `     
  }
  
  mount() {
    const $listPage = this.$target.querySelector('.js-list-page');
    const $postPage = this.$target.querySelector('.js-post-page')
    this.listPage = new ListPage($listPage)
    this.postPage = new PostPage($postPage)
    console.log(123)
  }
  
  render() {
    this.$target.innerHTML = this.template();
  }
}

export default App
