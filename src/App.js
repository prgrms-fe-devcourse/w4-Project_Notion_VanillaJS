import Sidebar from "./component/Sidebar.js";
import Frame from "./component/Frame.js";
import { createDocument, getDocument } from "./api/api.js";

export default function App({ $target }) {
  this.state = [];

  const sidebar = new Sidebar({
    $target,
    initialState: this.state,
    addDocument: async (id) => {
      const data = { title: "임시 추가", parent: id };
      await createDocument(data);
      this.render();
    },
  });

  // new Frame({ $target });

  this.render = async () => {
    const nextState = await getDocument();
    this.state = nextState;
    sidebar.setState(this.state);
  };

  this.render();
}
