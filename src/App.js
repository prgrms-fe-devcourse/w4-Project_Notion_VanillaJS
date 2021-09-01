import Sidebar from "./component/Sidebar.js";
import Frame from "./component/Frame.js";
import { getDocument } from "./api/api.js";

export default function App({ $target }) {
  this.state = [];

  const sidebar = new Sidebar({
    $target,
    initialState: this.state,
  });

  // new Frame({ $target });

  this.render = async () => {
    const documents = await getDocument();
    this.state = documents;
    sidebar.setState(this.state);
  };

  this.render();
}
