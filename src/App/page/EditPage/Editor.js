export default function Editor({ $page: $target, initialState = "" }) {
  const $editor = document.createElement("div");

  let isinitialize = false;
  this.state = initialState;

  $target.appendChild($editor);

  this.setState = ({ $target, nextState }) => {
    console.log($target, nextState);
    console.log($editor);
    if ($target) {
      this.state = nextState;
      $editor.querySelector("[name=title]").value = this.state.title;
      $editor.querySelector("[name=content]").value = this.state.content;
      this.render();
    }
  };
  this.render = () => {
    if (!isinitialize) {
      $editor.innerHTML = `
        <button id="edit-btn">포스팅</button><br>
        <input type="text" name="title" id="text-input"  value="${this.state.title}"/>
        <textarea name="content" id="textarea" >${this.state.content}</textarea>
        `;
      isinitialize = true;
    }
  };
  this.render();
}
