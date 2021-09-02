import NotionEditPage from "./NotionEditPage.js";
import NotionPage from "./NotionPage.js";

//url 규칙
//루트 /  ->  document 리스트 랜더링
//그 외에 /document/id -> id에 해당하는 document edit 편집 + 전체 document 리스트 랜더링

export default function App({ $target }) {
  const notionPage = new NotionPage({
    $target,
    editDocument: (id) => {
      history.pushState(null, null, `/document/${id}`);
      this.route();
    },
    reset: () => {
      this.route();
    },
  });

  const notionEditPage = new NotionEditPage({
    $target,
    selectedId: null,
    update: () => notionPage.render(),
  });

  this.route = async () => {
    const { pathname } = window.location;
    if (pathname.indexOf("/document/") === 0) {
      const [, , id] = pathname.split("/");

      await notionPage.render();
      await notionEditPage.setState({ id });
    } else {
      notionPage.render();
      $target.innerHTML = "";
    }
  };

  this.route();
}
