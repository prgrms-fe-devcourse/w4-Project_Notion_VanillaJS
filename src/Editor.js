export default function Editor({ $target, initialState, onEditing }) {
  const $editor = document.createElement('div');
  $editor.id = 'editor';
  $editor.className = 'flex-cc';

  $editor.innerHTML = `
    <input type="text" id="editor-title" name="title" type="text" value="" placeholder="제목" />
    <textarea id="editor-content" name="content" value="" placeholder="내용을 입력하세요."></textarea>
    <div id="sub-doc" name="documents"></div>
  `;

  this.state = initialState;

  let isInit = false;

  this.setState = (nextState) => {
    this.state = nextState;

    $editor.querySelector('[name=title]').value = this.state.title;
    $editor.querySelector('[name=content]').value = this.state.content;
    $editor.querySelector('[name=documents]').innerHTML = subDoc(this.state.documents); 
    
    this.render();
  }

  const subDoc = (list) => {
    return list.length > 0 
      ? `${ list.map((doc) => `
          <p data-id="${doc.id}">${ doc.title }</p>
        `).join('') }`
      : `` ;
  }
  

  this.render = () => {
    $target.appendChild($editor);

    if (isInit === false) {
      $editor.querySelector('[name=title]').addEventListener('keyup', (e) => {
        const nextState = { 
          ...this.state,
          title: e.target.value 
        }
        onEditing(nextState);
      });
    
      $editor.querySelector('[name=content]').addEventListener('keyup', (e) => {
        const nextState = {
          ...this.state,
          content: e.target.value
        }
        onEditing(nextState);
      });
      isInit = true;
    }
  }

  this.render();
}