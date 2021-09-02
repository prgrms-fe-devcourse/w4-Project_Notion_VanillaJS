import Sidebar from "./component/Sidebar.js";
import { createDocument, getDocument } from "./api/api.js";
import EditorPage from "./component/EditorPage.js";

export default function App({ $target }) {
  this.state = { id: "", title: "" };

  const sidebar = new Sidebar({
    $target,
    // onCeatedDocument: (document) => {
    //   const { id, title } = document;
    //   const nextState = { id, title };
    //   this.setState(nextState);
    // },
  });

  const editPage = new EditorPage({
    $target,
    initialState: { id: 708, title: this.state.title, content: "" },
  });

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = async () => {};

  this.render();
}
