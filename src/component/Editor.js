export default function Editor({ $target, initialState, onEditing }) {
  const $editPage = document.createElement("div");
  $editPage.setAttribute("id", "editor-outer-wrapper");
  $target.appendChild($editPage);

  let initialize = false;

  this.state = initialState;

  this.setState = (nextState) => {
    if (nextState) {
      this.state = nextState;
      $editPage.querySelector("[name=title]").value = this.state.title;
      $editPage.querySelector("[name=content]").value = this.state.content;
      this.render();
    }
  };

  this.render = () => {
    if (!initialize) {
      $editPage.innerHTML = `
          <form>
              <div class="editor-inner-wrapper">
              <label for="input-editor">Title</label>
              <input id="input-editor" type="text" name="title" value="${this.state.title}"/>
              </div>
              <div class="editor-inner-wrapper">
              <label for="textarea-editor">Body</label>
              <textarea id="textarea-editor" name="content">${this.state.content}</textarea>
              </div>
          </form> 
              `;
      initialize = true;
    }
  };

  this.render();

  $editPage.addEventListener("keyup", (e) => {
    const name = e.target.getAttribute("name");
    if (this.state[name] !== undefined) {
      const nextState = {
        ...this.state,
        [name]: e.target.value,
      };
      this.setState(nextState);
      onEditing(this.state);
    }
  });
}
