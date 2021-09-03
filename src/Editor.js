export default function Editor ({ $target, initialState, onEditing }) {
  const $editor = document.createElement('div');
  $editor.className = 'editor';
 
  $target.appendChild($editor);

  this.state = initialState;

  let isInitialize = true;

  

  this.setState = nextState => {
    $editor.display = 'block';
    
    this.state = nextState;
    if(!isInitialize) {
      $editor.querySelector('.documentTitle').value = this.state.title;
      $editor.querySelector('.documentContent').value = this.state.content;
    }
    
    this.render();
  }

   this.render = () => {
    if (isInitialize) {
      $editor.innerHTML = `
        <input class="documentTitle" type="text" name="title" placeholder="제목 없음" value="${this.state.title}"/>
        <textarea class="documentContent" name="content" placeholder="내용을 입력하세요..">${this.state.content}</textarea>
      `
      isInitialize = false;
      }
    }

  $editor.addEventListener('keyup', e => {
    const { name } = e.target;

    if (name !== undefined) {
      const nextState = {
        ...this.state,
        [name]: e.target.value
      }

      this.setState(nextState);
      onEditing(this.state);
    }
  })
}