import { initRouter } from "./router.js";
import MainPage from "./MainPanel/MainPage.js";
import SidePage from "./SidePanel/SidePage.js";
import GuidePage from "./MainPanel/GuidePage.js";
export default function App({ $target }) {
  const sidePage = new SidePage({ $target });
  const mainPage = new MainPage({ $target });
  this.route = () => {
    const { pathname } = location;
    if (pathname === "/") {
      mainPage.setState({ id: null });
    } else if (pathname.indexOf("/documents/") === 0) {
      const [, , documentId] = pathname.split("/");
      mainPage.setState({ id: documentId });
    }
  };

  this.route();
  initRouter(() => this.route());
}
