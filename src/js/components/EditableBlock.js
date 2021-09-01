import Component from '../core/Component.js';

const EditableBlock = class extends Component{

  template() {
    return `
      <div class="test" contenteditable="true" style="padding: 2px 0px; border: none; width: 200px; min-height: 30px;" placeholder='내용을 입력해 주세요.' ></div>
    `
  }

  createNewBlock() {

  }

  setEvent() {
    this.$target.addEventListener('keydown', (e) => {
      console.log(e.key)
      
      if (e.keyCode === 32 && e.target.textContent === '#') {
        console.log(e.target)
        e.preventDefault()
        e.target.setAttribute('placeholder', '제목1')
        e.target.textContent = '';
        e.target.classList.add('header-block');
      }
      
      if (e.keyCode === 32 && e.target.textContent === '##') {
        console.log(e.target)
        e.preventDefault()
        e.target.setAttribute('placeholder', '제목2')
        e.target.textContent = null;
        e.target.classList.add('header-block');
      }

      if (e.keyCode === 32 && e.target.textContent === '###') {
        console.log(e.target)
        e.preventDefault()
        e.target.setAttribute('placeholder', '제목3')
        e.target.textContent = '';
        e.target.classList.add('header-block');
      }

      if (e.keyCode === 32 && e.target.textContent === '-') {
        console.log(e.target)
        e.preventDefault()
        e.target.setAttribute('placeholder', '리스트')
        e.target.textContent = '';
        e.target.classList.add('header-block');
      }

      if (e.key === 'Backspace' && e.target.textContent === '') {
        e.target.setAttribute('placeholder', '내용을 입력해 주세요.');
        e.target.classList.remove('header-block');
      }
      
    })
  }
}

export default EditableBlock
