import api from '../api/index.js';
import Component from '../core/Component.js'
import ListPage from './ListPage.js';
import PostPage from './PostPage.js';

const App = class extends Component{
  listPage;
  postPage;

  init() {
    this.render()
    this.mount()
    this.route()
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

    this.listPage = new ListPage($listContainer)
    this.postPage = new PostPage($contentContainer)
  }

  render() {
    this.$target.innerHTML = this.template();
  }

  route() {
    const { pathname } = window.location

    if (pathname === '/') {
      this.postPage.init();
    } else if (pathname.startsWith(`/documents/`)) {
      const [, ,postId] = pathname.split('/')
      this.postPage.setState({id: Number(postId)})
    }
  } 
}

export default App
