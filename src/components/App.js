import DocumentPage from "./DocumentPage.js";
import DocumentEditPage from "./DocumentEditPage.js";
import { initRoute } from "../utils/router.js";
import MainPage from "./MainPage.js";

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

  this.route = (parent) => {
    $target.innerHTML = "";
    const { pathname } = window.location;
    if (pathname === "/") {
      documentPage.render();
      mainPage.render();
    } else {
      const [, id] = pathname.split("/");
      documentPage.render();
      documentEditPage.setState({
        documentId: id,
        parentId: parent,
      });
    }
  };

  this.route();

  initRoute((parent) => this.route(parent));
}
