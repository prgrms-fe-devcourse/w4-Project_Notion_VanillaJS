import { getDocument, modifyDocument } from "../api/api.js";
import { getItem, removeItem, setItem } from "../api/storage.js";
import Editor from "./Editor.js";

//에디터에 필요한 데이터를 가지고 있는 컴포넌트 상태 === 정보
export default function EditorPage({ $target, initialState }) {
  const $page = document.createElement("div");

  this.state = initialState;

  let timer = null;

  const editor = new Editor({
    $target: $page,
    initialState: { title: this.state.title, content: this.state.content },
    onEditing: async (post) => {
      setItem(this.state.id, post);

      if (timer !== null) {
        clearTimeout(timer);
      }

      timer = setTimeout(async () => {
        const data = getItem(this.state.id, post);
        const a = await modifyDocument(this.state.id, data);
        console.log(a);
        removeItem(this.state.id);
      }, 2000);
    },
  });

  this.setState = (nextState) => {
    this.state = nextState;

    editor.setState(nextState);
    this.render();
  };

  this.render = () => {
    $target.appendChild($page);
  };

  this.render();
}
