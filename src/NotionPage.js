import NotionList from "./NotionList.js";
import { request } from "./Api.js";
import { push } from "./router.js";

export default function NotionPage({ $target, newDoument }) {
  const $page = document.createElement("div");

  const notionList = new NotionList({
    $target: $page,
    initialState: [],
    newDoument,
  });

  this.setState = async () => {
    const posts = await request("/documents");
    notionList.setState(posts);
    this.render();
  };

  this.render = async () => {
    $target.appendChild($page);
  };
}
