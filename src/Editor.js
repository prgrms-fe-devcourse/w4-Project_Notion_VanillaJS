export default function Editor({
  $target,
  initialState = {
    title: "",
    content: "",
  },
  onEditing,
  onClick,
}) {
  const $editor = document.createElement("div");
  $editor.className = "editor";
  const $documentList = document.createElement("div");

  let isinitialize = false;

  $target.appendChild($editor);
  $target.appendChild($documentList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    $editor.querySelector("[name=title]").value = this.state.title;
    $editor.querySelector("[name=content]").value = this.state.content;
    this.render([nextState]);
  };

  this.render = (nextState) => {
    if (!isinitialize) {
      $editor.innerHTML = `
        <img class="headerImg" src="../header.png">
      <div>
        <input type="text" name="title" style="width:500px;"  value="${this.state.title}"/>
      </div>
      <div>
        <textarea name="content" style="width:500px; height:400px;">${this.state.content}
        </textarea>
      </div>
      `;
      isinitialize = true;
    }

    if (!!nextState) {
      const documentList = documentRecursive(nextState, "");
      $documentList.innerHTML = `<div class="subDocument">선택된 Document의 목록들 ${documentList}</div>`;
    }
  };

  const documentRecursive = (data, text) => {
    text += `
      <ul>
      ${data
        .map(
          ({ title, documents, id }) =>
            `<li data-id="${id}" class="document-item">${title}
          </li>
            ${documents
              .map((document) => documentRecursive([document], text))
              .join("")}
            `
        )
        .join("")}
      </ul>
      `;
    return text;
  };

  this.render();

  $editor.addEventListener("keyup", (e) => {
    const { target } = e;
    const name = target.getAttribute("name");

    if (this.state[name] !== undefined) {
      const nextState = { ...this.state, [name]: target.value };
      this.setState(nextState);
      onEditing(this.state);
    }
  });

  $documentList.addEventListener("click", (e) => {
    const { className } = e.target;
    const $li = e.target.closest(".document-item");

    if ($li) {
      const { id } = $li.dataset;
      onClick(id);
    }
  });
}
