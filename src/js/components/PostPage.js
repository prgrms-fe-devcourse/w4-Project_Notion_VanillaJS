import api from '../api/index.js';
import Component from '../core/Component.js';
import debounce from '../utils/debounce.js';
import ContentContainer from './ContentContainer.js';
import EditableBlock from './EditableBlock.js';

const PostPage = class extends Component{
  async init() {
    this.state = {
      id: null,
      title: '제목 없음',
      content: [
        {
          className: 'basic-text-block',
          placeholder: '내용을 입력해 주세요',
          text: ''
        }
      ]
    }
    this.render();
    this.mount();
  } 

  async setState(selectedDocId) {
    const { id } = selectedDocId 
    const newState = await api.getDoc(id);
    const parsedContent = this.parseJson(newState.content)
    newState.content = parsedContent;
    this.state = {
      ...this.state,
      ...newState,
    }
    console.log(this.state)
    console.log(this.contentContainer)
    this.contentContainer.setState({content: this.state.content});
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

  render() {
    this.$target.innerHTML = this.template();
  }

  mount() {
    const $selectedTitle = this.$target.querySelector('.js-selected-doc-title')
    const $selectedCotent = this.$target.querySelector('.js-selected-doc-content')
    const { content } = this.state;
    console.log('mount is done')
    this.contentContainer = new ContentContainer(
      $selectedCotent,
      {
        state: {
          content,
        },
        onUpdate: this.updateContent.bind(this)
      }
    )
    console.log(this.contentContainer);
  }

  updateContent(updatedState) {
    this.state = {
      ...this.state,
      ...updatedState
    }  
    
    const {id} = this.state
    let timer;

    clearTimeout(timer)
    timer = setTimeout(async () => {
      //local 등록
      const localSaveKey = `temp-doc-${id}`

      //api - update document
      await api.update(id, {
        title: this.state.title,
        content: this.convertJsonForm(this.state.content)
      })
      
    }, 1000)
  }

  convertJsonForm(content) {
    return JSON.stringify(content)
  }

  parseJson(jsonData) {
    return JSON.parse(jsonData)
  }
}

export default PostPage
