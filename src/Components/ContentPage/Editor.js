import { filterTag } from "../../scriptFilter.js";

export default function Editor({ $target, initialState, onUpdateDocument }) {
  let isInit = false;
  // DOM Create
  const $editor = document.createElement("div");
  $editor.className = "content-page__editor";
  $target.appendChild($editor);

  // State , setState
  // state : selectedDocument
  this.state = initialState;

  this.setState = (nextState, isRender = true) => {
    this.state = nextState;
    if (isRender) {
      this.render();
    }
  };

  this.render = () => {
    const { content, createdAt, id, title, documents, updatedAt } = this.state;
    if (!isInit) {
      $editor.innerHTML = `
          <input type="text" name="title" placeholder="Untitled" value="${title}" />
          <div contenteditable name="content" placeholder="내용을 입력하세요" >${content}</div>
          `;
      isInit = true;
    }
    $editor.querySelector("[name=title]").value = title;
    $editor.querySelector("[name=content]").innerHTML = content;
    loadSelectionOffsets();
  };

  // Event
  $editor.addEventListener("keyup", (e) => {
    const $text = e.target.closest("[name]");
    selectionOffsets = null;
    const { anchorNode, anchorOffset } = window.getSelection();
    if ($text) {
      const key = $text.getAttribute("name");
      if (key === "title") {
        const { value } = $text;
        this.setState({ ...this.state, [key]: filterTag(value) }, false);
        const { id, title, content } = this.state;
        onUpdateDocument([{ id, title, content }, e.target]);
      } else if (key === "content") {
        saveSelectionOffsets(anchorNode, anchorOffset);
        if (e.key === " ") {
          makeHeader(anchorNode.parentNode, anchorNode.textContent);
        }
        const { innerHTML } = $text;
        this.setState({ ...this.state, [key]: innerHTML }, false);
        const { id, title, content } = this.state;
        onUpdateDocument([{ id, title, content }, e.target], false);
      }
    }
  });

  // function

  let selectionOffsets = null;
  const saveSelectionOffsets = (node, offset) => {
    selectionOffsets = { node, offset };
  };
  const loadSelectionOffsets = () => {
    if (selectionOffsets) {
      const { node, offset } = selectionOffsets;
      window.getSelection().collapse(node, offset);
      selectionOffsets = null;
    }
  };

  let timer = null;
  const makeHeader = (node, text) => {
    const parentNode = $editor.querySelector("[name=content]");

    if (!timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      let $header;
      if (text.indexOf("####") === 0 || !text.startsWith("#")) {
        return;
      } else if (text.indexOf("###") === 0) {
        $header = document.createElement("h3");
        $header.innerText = text.substring(4);
      } else if (text.indexOf("##") === 0) {
        $header = document.createElement("h2");
        $header.innerText = text.substring(3);
      } else if (text.indexOf("#") === 0) {
        $header = document.createElement("h1");
        $header.innerText = text.substring(2);
      }
      $header.innerHTML = "<br>";
      saveSelectionOffsets($header, 1);
      if (node.parentNode === parentNode) {
        parentNode.replaceChild($header, node);
      } else {
        parentNode.innerText = "";
        parentNode.appendChild($header);
      }
      loadSelectionOffsets();
    }, 0);
  };
}
