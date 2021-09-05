import api from '../api/index.js';
import Component from '../core/Component.js';
import ContentContainer from './ContentContainer.js';
import { setItem } from '../utils/localStorage.js';
import TitleContiainer from './TitleContainer.js';
import DocumentHeader from './DocumentHeader.js';

const onBoardingState = {
  id: null,
  title: '',
  content: [
    {
      className: 'head1-block',
      placeholder: '제목1',
      text: '',
    },
    {
      className: '',
      placeholder: '내용을 입력해 주세요.',
      text: '',
    },
  ]
}

const PostPage = class extends Component{
  async init() {
    this.state = onBoardingState
    this.render();
    this.mount();
  } 

  async setState(selectedId) {
    const { id } = selectedId;
    if (id === null) return;
    const newState = await api.getDoc(id)
    
    newState.content = newState.content === null ? onBoardingState.content : this.parseJson(newState.content)  
    this.state = newState
    
    this.documentHeader.setState({title: this.state.title})
    this.titleContainer.setState({title: this.state.title})
    this.contentContainer.setState({content: this.state.content});
  }

  template() {
    return `
      <header class="js-document-header" style="max-width: 100%; height: 45px"></header>
      <main style="max-width: 100vw; height: 100%; display: flex; flex-direction: column; align-items: center;">
        <div class="js-selected-doc-title" style="width: 50%; height: 20%; padding-left: 100px; padding-right: 100px; display: flex; flex-direction: column; justify-content: flex-end;"></div>
        <div class="js-selected-doc-content" style="width: 50%; height: auto; padding-left: 100px; padding-right: 100px; padding-bottom: 30vh;"></div>
      </main>
    `
  }

  render() {
    this.$target.innerHTML = this.template();
  }

  mount() {
    const $documentHeader = this.$target.querySelector('.js-document-header')
    const $selectedTitle = this.$target.querySelector('.js-selected-doc-title')
    const $selectedCotent = this.$target.querySelector('.js-selected-doc-content')
    const { title, content } = this.state;

    this.documentHeader = new DocumentHeader(
      $documentHeader,
      {
        state: {
          title,
        }
      }
    )

    this.titleContainer = new TitleContiainer(
      $selectedTitle,
      {
        state: {
          title,
        },
        onUpdate: this.updateContent.bind(this)
      }
    )

    this.contentContainer = new ContentContainer(
      $selectedCotent,
      {
        state: {
          content,
        },
        onUpdate: this.updateContent.bind(this)
      }
    )
  }

  async updateContent(updatedState) {
    this.state = {
      ...this.state,
      ...updatedState
    }  
    console.log(this.state)
    const {id} = this.state
    if(!id) return; 
    
      //local 등록
    const localSaveKey = `temp-doc-${id}`
    setItem(localSaveKey, {
      title: this.state.title,
      content: this.state.content
    })
      //api - update document
      //id = null이 아니면 업데이트
    await api.update(id, {
      title: this.state.title,
      content: this.convertJsonForm(this.state.content)
    })
  
  }

  convertJsonForm(content) {
    return JSON.stringify(content)
  }

  parseJson(jsonData) {
    return JSON.parse(jsonData)
  }
}

export default PostPage
