import Component from '../core/Component.js';
import EditableBlock from './EditableBlock.js';

const ContentContainer = class extends Component {
  
  mount() {
    const {convertBlock, removeBlock, updateText, createNewBlock} = this
    const { content } = this.state;

    content.forEach((block, index) => {
      new EditableBlock(
        this.$target,
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
