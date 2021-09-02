import api from '../api/index.js';
import Component from '../core/Component.js';
import debounce from '../utils/debounce.js';
import ContentContainer from './ContentContainer.js';
import EditableBlock from './EditableBlock.js';

const PostPage = class extends Component{

  /**
   * {
   *  id: 1
   *  title: '제목없음' 
   *  content: [
   *    {
   *      class: 'text-block' ,
   *      placeholder: '내용을 입력해주세요',
   *      text: '어떤 내용이 들어갈까요.'  
   *    }
   *  ]
   *  documents: []
   * }
   * 
   */
  async init() {
    const state = api.getAllDocs()
    console.log(state);
    this.state = {
      id: 1,
      title: '제목이 있겠니',
      content: [
        {
          className: 'basic-text-block',
          placeholder: '내용을 입력해 주세요',
          text: ''
        }
      ]
    }
    this.render();
  }

  template() {
    return `
      <header style="max-width: 100%; height: 45px"></header>
      <main style="max-width: 100vw; height: 100%; display: flex; flex-direction: column; align-items: center;">
        <div class="js-selected-doc-title" style="max-width: 100%; height: 160px;"></div>
        <div class="js-selected-doc-content" style="width: 50%; height: 100%; padding-left: 100px; padding-right: 100px; padding-bottom: 30vh;"></div>
      </main>
    `
  }

  mount() {
    const $selectedTitle = this.$target.querySelector('.js-selected-doc-title')
    const $selectedCotent = this.$target.querySelector('.js-selected-doc-content')
    const { content } = this.state;
    
    new ContentContainer(
      $selectedCotent,
      {
        state: {
          content,
        }
      }
    )

  }

}

export default PostPage
