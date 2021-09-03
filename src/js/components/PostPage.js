import api from '../api/index.js';
import Component from '../core/Component.js';
import debounce from '../utils/debounce.js';
import ContentContainer from './ContentContainer.js';
import EditableBlock from './EditableBlock.js';
import { setItem } from '../utils/localStorage.js';
import TitleContiainer from './TitleContainer.js';

const onBoardingState = {
  id: null,
  title: '환영합니다!',
  content: [
    {
      className: 'head1-block',
      placeholder: '제목1',
      text: '노션 클로닝 프로젝트',
    },
    {
      className: 'head2-block',
      placeholder: '제목2',
      text: '이 페이지는 기본 페이지 입니다!',
    },
    {
      className: 'head3-block',
      placeholder: '제목3',
      text: '왼쪽에서 새로운 페이지를 만들어주세요!',
    },
  ]
}

const PostPage = class extends Component{
  async init() {
    this.state = onBoardingState
    this.render();
    this.mount();
  } 

  async setState(selectedDocId) {
    const { id } = selectedDocId 
    const newState = await api.getDoc(id);
    const parsedContent = this.parseJson(newState.content) || onBoardingState.content  
    
    newState.content = parsedContent;
    this.state = newState
    
    this.titleContainer.setState({title: this.state.title})
    this.contentContainer.setState({content: this.state.content});
  }

  template() {
    return `
      <header style="max-width: 100%; height: 45px"></header>
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
    const $selectedTitle = this.$target.querySelector('.js-selected-doc-title')
    const $selectedCotent = this.$target.querySelector('.js-selected-doc-content')
    const { title, content } = this.state;
    console.log('mount is done')

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
    console.log(this.contentContainer);
  }

  updateContent(updatedState) {
    this.state = {
      ...this.state,
      ...updatedState
    }  
    
    const {id} = this.state
    if(!id) return; 
    
    this.timer= null

    clearTimeout(this.timer)

    this.timer = setTimeout(async () => {
      //local 등록
      const localSaveKey = `temp-doc-${id}`
      setItem(localSaveKey, {
        title: this.state.title,
        content: this.state.content
      })
      //api - update document
      //id = null이 아니면 업데이트
      const res = await api.update(id, {
        title: this.state.title,
        content: this.convertJsonForm(this.state.content)
      })
    }, 100)
  }

  convertJsonForm(content) {
    return JSON.stringify(content)
  }

  parseJson(jsonData) {
    return JSON.parse(jsonData)
  }
}

export default PostPage
