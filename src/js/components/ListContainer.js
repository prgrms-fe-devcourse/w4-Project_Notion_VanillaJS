import api from '../api/index.js';
import Component from '../core/Component.js';
import DocumentList from './DocumentList.js';
import Header from './Header.js';

const ListContainer = class extends Component{

  async init() {
    this.state = await api.getAllDocs();
    this.render()
  }

  template() {
    return `
      <header id="title" class="title"></header>
      <nav id="documents-list"></nav>
      <button type="button">페이지 추가</button>
    `
  }

  mount() {
    const {createNewDoc} = this
    const $header = this.$target.querySelector('#title');
    const $documentList = this.$target.querySelector('#documents-list');

    new Header(
      $header,
    )

    new DocumentList(
      $documentList,
      {
        state: this.state,
        onCreate: createNewDoc.bind(this) 
      }
    )
  }

  async createNewDoc(parentId) {
    const newDoc = {
      title: '새 문서',
      parent: parentId
    }
    //await api.create(newDoc);
    const newState = await api.getAllDocs()
    this.setState(newState);
  }
}

export default ListContainer
