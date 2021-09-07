import Component from '../core/Component.js'
import ListPage from './ListPage.js';
import PostPage from './PostPage.js';

const App = class extends Component{
  async init() {
    this.state = {
      selectedId: null
    };
    this.render()
    this.mount()
  }

  template() {
    return `
      <aside class="list-page js-list-page"></aside>
      <section class="post-page js-post-page"></section>
    `     
  }
  
  mount() {
    const $listPage = this.$target.querySelector('.js-list-page');
    const $postPage = this.$target.querySelector('.js-post-page')
    this.listPage = new ListPage($listPage)
    this.postPage = new PostPage($postPage)
  }

  render() {
    this.$target.innerHTML = this.template();
  }
  
  setState(newState) {
    this.state = newState
    this.listPage.setState({
      rootDocuments: [],
      ...this.state,
    })
    this.postPage.setState({
      id: this.state.selectedId
    })
  }  
}

export default App
