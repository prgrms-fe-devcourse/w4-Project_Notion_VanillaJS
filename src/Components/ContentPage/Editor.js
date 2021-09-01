import { push } from "../../router.js";
import { filterTag } from "../../scriptFilter.js";
import DocumentSearch from "./DocumentSearch.js";

export default function Editor({ $target, initialState, onUpdateDocument }) {
  let isInit = false;
  // DOM Create
  const $editor = document.createElement("div");
  $editor.className = "content-page__editor";
  $target.appendChild($editor);

  // State , setState
  // state : {selectedDocument,flattedDocuments}
  this.state = initialState;

  this.setState = (nextState, isRender = true) => {
    this.state = nextState;
    if (isRender) {
      this.render();
    }
  };
  // Components

  // Render
  this.render = () => {
    const { content, createdAt, id, title, documents, updatedAt } =
      this.state.selectedDocument;
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

  // Event Handler

  // Key up
  $editor.addEventListener("keyup", (e) => {
    const $text = e.target.closest("[name]");
    selectionOffsets = null;
    const { anchorNode, anchorOffset } = window.getSelection();
    const { selectedDocument } = this.state;
    if ($text) {
      const key = $text.getAttribute("name");
      if (key === "title") {
        const { value } = $text;
        selectedDocument[key] = filterTag(value);
        this.setState({ ...this.state, selectedDocument }, false);
        onUpdateDocument(selectedDocument, e.target);
      } else if (key === "content") {
        saveSelectionOffsets(anchorNode, anchorOffset);
        if (e.key === " ") {
          makeHeader(anchorNode.parentNode, anchorNode.textContent);
        }
        if (e.key === "/") {
          searchDocument(anchorNode.parentNode);
          return;
        }
        const { innerHTML } = $text;
        selectedDocument[key] = innerHTML;
        this.setState({ ...this.state, selectedDocument }, false);
        const { id, title, content } = selectedDocument;
        onUpdateDocument(selectedDocument, null, false);
      }
    }
  });

  // Click
  $editor.addEventListener("click", (e) => {
    const { target } = e;
    const { className } = target;

    switch (className) {
      case "document-link":
        const { id } = target.dataset;
        push(`/document/${id}`);
        break;
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

  const searchDocument = (node) => {
    if (node.getAttribute("name") === "content") {
      const $newNode = document.createElement("div");
      node.textContent = "";
      node.appendChild($newNode);
      node = $newNode;
    }
    node.textContent = "";
    const { flattedDocuments, selectedDocument } = this.state;
    new DocumentSearch({
      $target: node,
      initialState: { flattedDocuments, selectedDocument },
      onMakeDocumentLink: (id, title) => {
        node.innerHTML = `
        <div><br></div>
        <button data-id="${id}" class="document-link" contenteditable="false">   
          ${title}<br>
        </button>
        <div><br></div>
        `;
        const $nextLine = document.createElement("div");
        $nextLine.textContent = "";
        node.parentNode.insertBefore($nextLine, node.nextSibling);
        const { selectedDocument } = this.state;
        selectedDocument.content =
          $editor.querySelector("[name='content']").innerHTML;
        this.setState({ ...this.state, selectedDocument }, false);
        onUpdateDocument(selectedDocument, null, false);
        window.getSelection().collapse($nextLine, 0);
      },
    });
  };
}
