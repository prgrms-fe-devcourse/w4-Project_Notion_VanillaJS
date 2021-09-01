import Sidebar from "./component/Sidebar.js";
import Frame from "./component/Frame.js";

export default function App({ $target, initialState }) {
  try {
    new Sidebar({
      $target,
      initialState,
    });

    // new Frame({ $target });
  
  } catch (e) {
    console.log(e);
  }
}
