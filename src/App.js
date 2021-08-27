import Sidebar from "./component/Sidebar.js";
import Frame from "./component/Frame.js";

export default function App({ $target }) {
  new Sidebar({ $target });
  new Frame({ $target });
}
