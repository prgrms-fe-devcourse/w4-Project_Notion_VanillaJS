import Editor from "./Editor.js";

export default function NotionEditPage({ $target, initialState }) {
  console.log(initialState);
  const $notion = document.createElement("div");

  this.state = initialState;

  let timer = null;

  if (!!this.state) {
    const editor = new Editor({
      $target: $notion,
      initialState,
      onEditing: (post) => {
        if (timer !== null) clearTimeout(timer);
        timer = setTimeout(() => {
          console.log(post);
        }, 1000);
      },
    });
  }

  this.setState = (nextState) => {
    this.state = nextState;

    this.render();
  };

  this.render = () => {
    $target.appendChild($notion);
  };
}
