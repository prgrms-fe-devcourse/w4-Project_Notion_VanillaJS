import Component from '../core/Component.js';
import debounce from '../utils/debounce.js';
import EditableBlock from './EditableBlock.js';

const ContentContainer = class extends Component {
  
  mount() {
    const {convertBlock, removeBlock, updateBlock, createNewBlock} = this
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
          onEditing: () => updateBlock.bind(this),
          onCreate: createNewBlock.bind(this)
        }  
      )
    })
  }

  setState(newState) {
    const {onUpdate} = this.props
    this.state = newState;
    console.log(123)
    console.log(newState)
    onUpdate(newState)
    this.render();
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
    const newState = { content: newContent }
    this.setState(newState)  
  }

  createNewBlock(index, text) {
    const {content} = this.state;
    content[index].text = text

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
    const newState = { content: newContent }
    this.setState(newState)  
    
  }

  updateBlock(index, newText){
    const newContent = [...this.state.content];
    newContent[index].text = newText
    
    const newState = { content: newContent }
    this.setState(newState);
  }

  removeBlock(index, text) {
    const {content} = this.state;
    content[index].text = text
    
    const newContent = (text.length === 0) ?
    [ ...content.slice(0, index), ...content.slice(index + 1)] 
    : [...content]

    console.log(newContent)
    this.setState({ content: newContent })
  }
}

export default ContentContainer
