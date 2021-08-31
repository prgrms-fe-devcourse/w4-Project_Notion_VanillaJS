import NotionPage from "./NotionPage.js";

export default function App({ $target }) {
  const notionPage = new NotionPage({ $target });

  this.route = () => {
    $target.innerHTML = "";
    const { pathname } = window.location;
    if (pathname === "/") {
      notionPage.setState();
    }
  };

  this.route();
}
