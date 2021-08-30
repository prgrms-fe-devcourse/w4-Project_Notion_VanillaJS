import ContentPage from "./Components/ContentPage/ContentPage.js";
import ListPage from "./Components/ListPage/ListPage.js";
import { makeRouter, routeName } from "./router.js";

export default function App({ $target }) {
  // Components
  const listPage = new ListPage({
    $target,
    initialState: { selectedDocument: null },
  });

  const contentPage = new ContentPage({
    $target,
    initialState: { documentId: null, document: null },
    onUpdateDocument: () => {
      listPage.render();
    },
  });
  // Routing
  this.route = () => {
    $target.innerHTML = "";
    const { pathname } = window.location;
    switch (pathname.split("/")[1]) {
      case routeName.home:
        listPage.render();
        break;
      case routeName.document:
        const [, , documentId] = pathname.split("/");
        listPage.render();
        contentPage.setState({ ...contentPage.state, documentId });
        break;
    }
  };
  // Init
  this.init = () => {
    this.route();
    makeRouter(() => this.route());
  };

  this.init();
}
