import Component from '../core/Component.js';

const DocumentHeader = class extends Component {
  template() {
    return `
      <h1 class="post-header">${this.state.title || '제목 없음'}<h1>
    `
  }
}

export default DocumentHeader
