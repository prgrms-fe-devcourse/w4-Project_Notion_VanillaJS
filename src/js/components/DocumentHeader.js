import Component from '../core/Component.js';

const DocumentHeader = class extends Component {
  template() {
    console.log(this.state)
    return `
      <h1>${this.state.title || '제목 없음'}<h1>
    `
  }
}

export default DocumentHeader
