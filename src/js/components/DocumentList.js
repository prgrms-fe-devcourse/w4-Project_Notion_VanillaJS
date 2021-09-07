import Component from '../core/Component.js';

const DocumentList = class extends Component {
  async init() { 
    const { state } = this.props
    this.state = state
    this.render()
    this.setEvent()
  }

  template(rootDocs) {
    return `
      <ul class="js-doc-list">
        ${rootDocs.map(({ id, title, documents }) => 
          `<li data-id="${id}">
              <div class="doc-info">
                <i class="bx bxs-right-arrow js-toggle-sub-docs" role="checkbox"></i>
                <i class='bx bx-file'></i>
                <div class="doc-title js-select-doc">${title || '제목 없음' }</div>
                <i class="bx bx-trash js-delete-doc"></i>
                <i class="bx bx-plus js-create-new-doc"></i>
              </div>  
              <div class="sub-docs">${documents.length !== 0 ? this.template(documents) : "<div class='no-sub-doc'>하위 페이지가 없습니다.</div>"}</div> 
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
        e.target.classList.toggle('rotate')
        return;
      }

      if (e.target.classList.contains('js-select-doc')) {
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
