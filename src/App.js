import ControlPage from "./ControlPage.js";
import ContentPage from "./ContentPage.js";
import { initRouter } from "./router.js";
import { setItem } from "./storage.js";

export default function App({ $target }) {
  const controlPage = new ControlPage({ $target });
  const contentPage = new ContentPage({ $target });

  this.route = () => {
    console.log("라우팅 발생!");
    const { pathname } = window.location;
    const [, , documentId = "/", parentId = null] = pathname.split("/");
    const $contentPage = document.querySelector(".contentPage");
    const $editor = $contentPage.querySelector(".editor");

    if (pathname === "/") {
      $editor.classList.add("hideDisplay");

      contentPage.setState({
        documentId,
        parentId,
      });
    } else {
      $editor.classList.remove("hideDisplay");

      setItem("selectedDocument", [Number(documentId)]);

      contentPage.setState({
        documentId,
        parentId,
      });
    }

    controlPage.setState();
  };

  this.route();

  initRouter(() => this.route());

  window.addEventListener("popstate", () => {
    this.route();
  });
}
