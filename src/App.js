import Sidebar from "./component/Sidebar.js";
import Frame from "./component/Frame.js";

export default function App({ $target, initialState }) {
  new Sidebar({ $target, initialState });
  new Frame({ $target });
}
