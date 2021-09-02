import api from '../api/index.js';
import Component from '../core/Component.js';

const DocumentList = class extends Component {
  async init() { 
    const { state } = this.props
    this.state = state
    this.render()
    this.setEvent()
  }

  template(document) {
    return `
      <ul>
        ${document.map(({ id, title, documents }) => 
          `<li class="doc-info" data-id="${id}">
              <div style="display: flex;">
                <i class="bx bxs-right-arrow js-toggle-sub-docs" role="button"></i>
                <div class="doc-title js-select-doc">${title}</div>
                <button class="js-create-new-doc">+</button>
              </div>  
              <div class="sub-docs">${this.template(documents)}</div> 
          </li>`).join('')}
      </ul>
    `
  }
  render() {
    this.$target.innerHTML = this.template(this.state);
  }

  setEvent() {
    const { onCreate } = this.props
    this.$target.addEventListener('click', e => {
      const $li = e.target.closest('li');
      const $subList = $li.lastElementChild;

      if (e.target.classList.contains('js-toggle-sub-docs')) {
        $subList.classList.toggle('active')
        return;
      }

      if (e.target.classList.contains('js-select-doc')) {
        console.log($li.dataset.id)
        return;
      }

      if (e.target.classList.contains('js-create-new-doc')) {
        console.log(e.target)
        onCreate(Number($li.dataset.id))
      }
    })
  }

  
}

export default DocumentList
