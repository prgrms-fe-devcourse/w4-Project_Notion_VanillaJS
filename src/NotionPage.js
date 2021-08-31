import NotionComponent from "./NotionComponent.js";
import { request } from "./Api.js";

export default function NotionPage({ $target }) {
  const $page = document.createElement("div");

  const notionComponent = new NotionComponent({
    $target: $page,
    initialState: [],
  });

  this.setState = async () => {
    const posts = await request("/documents");
    console.log(posts);
    notionComponent.setState(posts);
    this.render();
  };

  this.render = async () => {
    $target.appendChild($page);
  };
}
