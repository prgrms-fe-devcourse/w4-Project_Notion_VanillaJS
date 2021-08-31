import NotionPage from "./NotionPage.js";
import NotionEditPage from "./NotionEditPage.js";
import { initRouter } from "./router.js";
import { request } from "./Api.js";

export default function App({ $target }) {
  const notionPage = new NotionPage({
    $target,
    newDoument: (documentId) => {
      // const createPost = request("/documents", {
      //   method: "POST",
      //   body: JSON.stringify(documentPage),
      // });
      console.log(documentId);
      notionEditPage.setState({ documentId });
    },
  });
  const notionEditPage = new NotionEditPage({
    $target,
    initialState: {
      documentId: null,
    },
  });
  this.route = () => {
    $target.innerHTML = "";
    const { pathname } = window.location;
    notionPage.setState();
    notionEditPage.setState();
    // if (pathname === "/") {
    //   notionPage.setState();
    // } else if (pathname.indexOf("/document/") === 0) {

    //   const [, , documentId] = pathname.split("/");
    //   notionEditPage.setState({ documentId });
    // }
  };

  this.route();
  //initRouter(() => this.route());
}
