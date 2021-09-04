export default function Editor({ $target, initialState, onEditing, onRemove }) {
  const $editor = document.createElement("div");
  $editor.setAttribute("id", "editor");

  const $titleBox = document.createElement("div");
  $titleBox.setAttribute("id", "titleBox");

  const $attributeBox = document.createElement("div");
  $attributeBox.setAttribute("id", "attributeBox");

  const $contentBox = document.createElement("div");
  $contentBox.setAttribute("id", "contentBox");

  $target.appendChild($editor);
  $editor.appendChild($titleBox);
  $editor.appendChild($attributeBox);
  $editor.appendChild($contentBox);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    $editor.querySelector("#editorTitle").remove();
    $editor.querySelector("#editorAttribute").remove();
    $editor.querySelector("#editorContent").remove();
    this.render();
  };

  this.renderTitle = () => {
    const $title = document.createElement("input");
    $title.setAttribute("name", "title");
    $title.setAttribute("type", "text");
    $title.setAttribute("id", "editorTitle");
    $title.setAttribute("placeholder", "Title");

    $titleBox.appendChild($title);
  };

  this.renderAttributes = () => {
    const $attributes = document.createElement("ul");
    $attributes.setAttribute("id", "editorAttribute");

    this.state.content.forEach((value, key) => {
      if (key === "Content" || key === "Comment") return;
      $attributes.innerHTML += `<li name="attribute" data-id="${key}">
      <input type="text" name="attributeName" value="${key}" placeholder="new"/> 
      <input type="text" name="attributeContent" ${
        value ? `value="${value}"` : ""
      } placeholder="empty"/>
      <button name="attributeRemove">x</button>
      </li> `;
    });
    $attributes.innerHTML += `<button data-id="addButton">+ Add a property</button> `;
    $attributeBox.appendChild($attributes);

    // 클릭 이벤트가 리렌더링 후 작동 안 하길래, 렌더링 함수에 넣어버림
    // 포스트 속성 추가
    $attributeBox
      .querySelector("[data-id=addButton]")
      .addEventListener("click", () => {
        const $newAttribute = document.createElement("li");
        $newAttribute.setAttribute("name", "attribute");
        $newAttribute.setAttribute("data-id", "new");
        $newAttribute.innerHTML = `
          <input type="text" name="attributeName" placeholder="new"/>
          <button name="attributeRemove">x</button> 
          <input type="text" name="attributeContent" placeholder="empty"/>`;

        $attributeBox
          .querySelector("#editorAttribute")
          .insertBefore(
            $newAttribute,
            $attributeBox.querySelector("[data-id=addButton]")
          );
        this.state.content.set("new", "");
      });

    // 포스트 속성 삭제
    $attributeBox
      .querySelectorAll("[name=attributeRemove]")
      .forEach((removeButton) => {
        removeButton.addEventListener("click", (e) => {
          const targetList = e.target.closest("li");
          this.state.content.delete(targetList.dataset.id);
          targetList.remove();
          onRemove(this.state);
        });
      });
  };

  this.renderContent = () => {
    const $content = document.createElement("textarea");
    $content.setAttribute("name", "content");
    $content.setAttribute("type", "text");
    $content.setAttribute("id", "editorContent");
    $content.setAttribute("placeholder", "Content is empty");
    $content.value = this.state.content.get("Content");

    $contentBox.appendChild($content);
  };

  this.render = () => {
    this.renderTitle();
    this.renderAttributes();
    this.renderContent();

    $editor.querySelector("[name=title]").value = this.state.title;
  };

  this.render();

  // 에디터 제목 이벤트
  $titleBox.addEventListener("keyup", (e) => {
    const nextState = { ...this.state, title: e.target.value };
    this.state = nextState;

    onEditing(this.state);
  });

  // 에디터 속성 이벤트
  $attributeBox.addEventListener("keyup", (e) => {
    let nextState = { ...this.state };
    const prev = e.target.closest("li").dataset.id || "";

    // 속성 이름 조작 시, map의 key값 수정 및 재 랜더링 (복잡)
    if (e.target.getAttribute("name") === "attributeName") {
      let newContent = new Map();
      const index = { length: -2, targeted: -2 };
      for (const content of nextState.content) {
        let [key, value] = content;
        if (key === prev) {
          key = e.target.value;
          index.targeted = index.length;
        }
        index.length++;
        newContent.set(key, value);
      }
      nextState.content = newContent;
      this.state = nextState;

      // 재 렌더링
      $attributeBox.querySelector("ul").remove();
      this.renderAttributes();

      // 재 렌더링 후 포커스 지정
      $attributeBox
        .querySelectorAll(`[name=attribute]`)
        [index.targeted].children[0].focus();
      $attributeBox
        .querySelectorAll(`[name=attribute]`)
        [index.targeted].children[0].setSelectionRange(
          e.target.value.length,
          e.target.value.length
        );
    } else {
      // 속성 내용 조작 시, 해당 key의 value만 수정(간단)
      nextState.content.set(prev, e.target.value);
      this.state = nextState;
    }

    onEditing(this.state);
  });

  // 에디터 컨텐츠 이벤트
  $contentBox.addEventListener("keyup", (e) => {
    let nextState = { ...this.state };
    nextState.content.set("Content", e.target.value);
    this.state = nextState;

    onEditing(this.state);
  });
}
