import Editor from "./Editor.js";

export default function NotionEditPage({ $target, initialState }) {
  const $notion = document.createElement("div");

  const post = {
    content: "",
  };

  const editor = new Editor({
    $target: $notion,
    initialState: post,
    onEditing: (post) => {
      console.log(post);
    },
  });

  this.state = initialState;

  this.setState = (nextState) => {
    console.log(this.state);
    const { documentId } = this.state;
    if (!!documentId && documentId !== nextState.documentId) {
      this.state = nextState;
    }
    // console.log(this.state.documentId);
    // console.log(nextState);
    editor.setState(post);
    this.render();
  };

  this.render = () => {
    $target.appendChild($notion);
  };
}
