import api from '../api/index.js';
import Component from '../core/Component.js';

const DocumentList = class extends Component {
  async init() { 
    const { state } = this.props
    console.log(state)
    this.state = state
    this.render()
    this.setEvent()
  }

  template(rootDocs) {
    return `
      <ul>
        ${rootDocs.map(({ id, title, documents }) => 
          `<li class="doc-info" data-id="${id}">
              <div style="display: flex;">
                <i class="bx bxs-right-arrow js-toggle-sub-docs" role="button"></i>
                <div class="doc-title js-select-doc">${title || '제목 없음' }</div>
                <button class="js-delete-doc">-</button>
                <button class="js-create-new-doc">+</button>
              </div>  
              <div class="sub-docs">${this.template(documents)}</div> 
          </li>`).join('')}
      </ul>
    `
  }

  render() {
    const { rootDocuments, selectedId } = this.state
    this.$target.innerHTML = this.template(rootDocuments, 12193);
  }

  setEvent() {
    const { onSelect, onCreate, onDelete } = this.props

    this.$target.addEventListener('click', async (e) => {
      const $li = e.target.closest('li');
      const $subList = $li.lastElementChild;
      const documentId = Number($li.dataset.id)

      if (e.target.classList.contains('js-toggle-sub-docs')) {
        $subList.classList.toggle('active')
        return;
      }

      if (e.target.classList.contains('js-select-doc')) {
        console.log(documentId)
    
        onSelect(documentId)
        return;
      }

      if (e.target.classList.contains('js-create-new-doc')) {
        onCreate(documentId)
      }

      if (e.target.classList.contains('js-delete-doc')) {
        onDelete(documentId)
      }
    })
  }

  
}

export default DocumentList
