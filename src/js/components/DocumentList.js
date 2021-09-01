import api from '../api/index.js';
import Component from '../core/Component.js';

const DocumentList = class extends Component {
  async init() { 
    const { state } = this.props
    this.state = state
    this.render()
    this.setEvent()
  }

  template() {
    return `
      <ul>
        ${this.state.map(({ id, title}) => 
          `<li class="doc-info" data-id="${id}">
              <div style="display: flex;">
                <i class="bx bxs-right-arrow js-toggle-sub-docs active" role="button"></i>
                <div class="doc-title js-select-doc">${title}</div>
                <button>+</button>
              </div>  
              <div class="sub-docs"></div> 
          </li>`).join('')}
      </ul>
    `
  }

  mount() {
    const $liList = this.$target.querySelectorAll('li');

    $liList.forEach($li => {
        const parentId = Number($li.dataset.id);
        const $subDocList = $li.lastElementChild
        const subDocuments = this.state.find(({id}) => id === parentId).documents
        
        if(!subDocuments) return;

        new DocumentList(
          $subDocList,
          {
            state: subDocuments
          }
        )
    });
  }

  setEvent() {
    this.$target.addEventListener('click', e => {
      const $li = e.target.closest('li');
      const $subList = $li.lastElementChild;
      e.stopPropagation()

      if (e.target.classList.contains('js-toggle-sub-docs')) {
        $subList.classList.toggle('active')

        return;
      }

      if (e.target.classList.contains('js-select-doc')) {
        console.log(e.target.textContent)
        return;
      }
    })
  }
}

export default DocumentList
