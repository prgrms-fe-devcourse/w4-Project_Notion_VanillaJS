export default function Editor({ $target, init, onEdit }) {
  const $editor = document.createElement("div");
  $editor.className = "main-page-container__editor";
  // $editor.innerHTML = `
  //   <input class="main-page-container__titleEditor" type='text' name='title' />
  //   <textarea class="main-page-container__contentEditor" name="content"></pre>
  // `;
  this.state = init;
  $target.appendChild($editor);

  let isInit = false;
  this.appendChild = () => {
    $target.appendChild($editor);
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.render = () => {
    // const richState = this.state.content
    //   .split("\n")
    //   .map((line) => {
    //     // console.log(line);
    //     if (line.indexOf("# ") === 0) {
    //       // #으로 시작하는 경우
    //       return `<h1>${line.substr(2)}</h1>`;
    //     } else if (line.indexOf("## ") === 0) {
    //       console.log(`${line.substring(3)}`);
    //       return `<h2>${line.substr(3)}</h2>`;
    //     } else if (line.indexOf("### ") === 0) {
    //       return `<h3>${line.substr(3)}</h3>`;
    //     }
    //     return line;
    //   })
    //   .join("<br>");
    if (!isInit) {
      $editor.innerHTML = `
        <input class="main-page-container__titleEditor" type='text' name='title' value="${this.state.title}"></input>
        <textarea class="main-page-container__contentEditor" name="content">${this.state.content}</textarea>
      `;
      isInit = true;
    }

    $editor.querySelector("[name=title]").value = this.state.title;
    $editor.querySelector("[name=content]").value = this.state.content;
    // $editor.querySelector("[name=content]").innerHTML = this.state.content;
  };

  this.render();

  // $editor.querySelector("[name=title]").addEventListener("keyup", (e) => {
  //   const nextState = {
  //     ...this.state,
  //     title: e.target.value,
  //   };
  //   this.setState(nextState);
  //   onEdit(this.state);
  // });

  // $editor.querySelector("[name=content]").addEventListener("input", (e) => {
  //   const nextState = {
  //     ...this.state,
  //     content: e.target.innerHTML,
  //   };
  //   // this.setState(nextState);
  //   onEdit(nextState);
  //   // console.log(this.state);
  // });
  $editor.addEventListener("keyup", (e) => {
    const { target } = e;
    const name = target.getAttribute("name");
    if (this.state[name] !== undefined) {
      const nextState = {
        ...this.state,
        [name]: target.value,
      };
      this.setState(nextState);
      onEdit(this.state);
    }
  });
}
