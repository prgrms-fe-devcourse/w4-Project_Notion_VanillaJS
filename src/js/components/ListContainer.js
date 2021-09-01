import Component from '../core/Component.js';
import DocumentList from './DocumentList.js';
import Header from './Header.js';

const ListContainer = class extends Component{
  template() {
    return `
      <header id="title" class="title"></header>
      <nav id="documents-list"></nav>
    `
  }

  mount() {
    const $header = this.$target.querySelector('#title');
    const $documentList = this.$target.querySelector('#documents-list');

    new Header(
      $header,
    )

    new DocumentList(
      $documentList,
      {
        state: this.state
      }
    )
  }
}

export default ListContainer
