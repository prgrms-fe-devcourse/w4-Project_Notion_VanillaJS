import api from '../api/index.js';
import Component from '../core/Component.js';
import debounce from '../utils/debounce.js';
import EditableBlock from './EditableBlock.js';

const ContentContainer = class extends Component{

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
  init() {
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
    const {convertBlock, removeBlock, updateText, createNewBlock} = this
    //const $selectedTitle = this.$target.querySelector('.js-selected-doc-title')
    const $selectedCotent = this.$target.querySelector('.js-selected-doc-content')
    const { content } = this.state;

    content.forEach((block, index) => {
      new EditableBlock(
        $selectedCotent,
        { 
          state: {
            index,
            className: block.className,
            placeholder: block.placeholder,
            text: block.text,
          },
          focus: index === content.length - 1,
          onConvert: convertBlock.bind(this),
          onRemove: removeBlock.bind(this),
          onEditing: updateText.bind(this),
          onCreate: createNewBlock.bind(this)
        }  
      )
    })
  }

  convertBlock(index, text) {
    const controller = {
      '#': 'head1',
      '##': 'head2',
      '###': 'head3'
    }
    const blockType = controller[text];
    if(!blockType) return;
    this.convertHeadBlock(index, blockType)
  }

  convertHeadBlock(index, type) {
    const headNum = {
      'head1': 1,
      'head2': 2,
      'head3': 3,
    }
    const newContent = [...this.state.content];

    newContent[index] = {
      ...newContent[index],
      className: `${type}-block`,
      placeholder: `제목${headNum[type]}`
    }

    const newState = {
      ...this.state,
      content: newContent
    }

    this.setState(newState)  
  }

  createNewBlock(index) {
    const {content} = this.state;
    const newBlock = {
      className: 'basic-text-block',
      placeholder: '내용을 입력해 주세요.',
      text: ''
    }

    const newContent = [
          ...content.slice(0, index+1),
          newBlock,
          ...content.slice(index + 1)
    ]
      
    const newState = {
      ...this.state,
      ...{content: newContent}
    }

    this.setState(newState);
  }


  updateText(index, newText){
    const newContent = [...this.state.content];
    newContent[index].text = newText

    this.setState({
      ...this.state,
      content: newContent  
    })
  }

  removeBlock(index) {
    const {content} = this.state;
    const newContent = [
      ...content.slice(0, index),
      ...content.slice(index + 1)
    ]

    this.setState({
      ...this.state,
      content: newContent  
    })
  }
}

export default ContentContainer
