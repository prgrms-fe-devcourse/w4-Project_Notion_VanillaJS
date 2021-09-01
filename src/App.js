import NotionEditPage from "./NotionEditPage.js";
import NotionPage from "./NotionPage.js";
export default function App({ $target }) {
  const notionPage = new NotionPage({
    $target,
    editDocument: (id) => {
      notionEditPage.setState({ id });
    },
  });
  const notionEditPage = new NotionEditPage({
    $target,
    selectedId: null,
    update: () => notionPage.render(),
  });

  notionPage.render();
  notionEditPage.render();
}
