import Component from '../core/Component.js';

const ContentContainer = class extends Component{

  template() {
    return `
      <div class="test" contenteditable="true" style="padding: 2px 0px; border: none; width: 200px; min-height: 30px;" placeholder='내용을 입력해 주세요.' ></div>
    `
  }
}

export default ContentContainer
