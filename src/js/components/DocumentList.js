import Component from '../core/Component.js';

const DocumentList = class extends Component {
  init() {
    const { state } = this.props
    this.state = state
    this.render()
  }

  template() {
    return `
      <ul>
        ${this.state.map(({ id, title, documents }) => 
          `<li data-id="${id}" ${documents.length === 0 ? "leafNode" : ''}>${title}<div></div></li>`).join('')}
      </ul>
    `
  }
/*
  mount() {
    const $liList = this.$target.querySelectorAll('li');

    $liList.forEach($li => {
      if (!$li.hasAttribute('leafNode')) {
        const parentId = Number($li.dataset.id);
        const children = this.state.find(({id}) => id === parentId).documents
        const $licontainer = $li.lastElementChild
        
        new DocumentList(
          $licontainer,
          {
            state: children
          }
        )

      }
    });
  }
*/
  setEvent() {
    this.$target.addEventListener('click', e => {

    })
  }
}

export default DocumentList
