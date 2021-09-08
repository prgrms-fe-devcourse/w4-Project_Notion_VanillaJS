import DocumentPage from "./DocumentPage.js";
import DocumentEditPage from "./DocumentEditPage.js";
import { initRoute } from "../utils/router.js";
import MainPage from "./MainPage.js";
import { removeDiv } from "../utils/removeDiv.js";


export default function App({ $target }) {
  const documentPage = new DocumentPage({
    $target,
  });

  const documentEditPage = new DocumentEditPage({
    $target,
    initialState: {
      documentId: "new",
      document: {
        title: "",
        content: "",
      },
    },
  });

  const mainPage = new MainPage({
    $target,
    initialState: "신효정",
  });

  this.render = () => {
    documentPage.render();
  };

  this.render();
  this.route = (parent) => {
    const { pathname } = window.location;
    if (pathname === "/") {
      removeDiv('.edit-page')
      mainPage.render()
    } else {
      removeDiv('.main-page')
      const [, id] = pathname.split("/");
      documentEditPage.setState({
        documentId: id,
        parentId: parent,
      });
    }
  };


  initRoute((parent) => this.route(parent));
}
