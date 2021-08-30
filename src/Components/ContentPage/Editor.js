export default function Editor({ $target, initialState, onUpdateDocument }) {
  let isInit = false;
  // DOM Create
  const $editor = document.createElement("div");
  $editor.className = "content-page__editor";
  $target.appendChild($editor);

  // State , setState
  // state : selectedDocument
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { content, createdAt, id, title, documents, updatedAt } = this.state;
    if (!isInit) {
      $editor.innerHTML = `
        <input type="text" name="title" placeholder="Untitled" value="" />
        <textarea name="content" placeholder="내용을 입력하세요" ></textarea>
        `;
      isInit = true;
    }
    $editor.querySelector("[name=title]").value = title;
    $editor.querySelector("[name=content]").value = content;
  };

  // Event
  $editor.addEventListener("keyup", (e) => {
    const $text = e.target.closest("[name]");
    if ($text) {
      const { value } = $text;
      const key = $text.getAttribute("name");
      this.setState({ ...this.state, [key]: value });
      const { id, title, content } = this.state;
      onUpdateDocument([{ id, title, content }, e.target]);
    }
  });
}
