import { request } from "./util/api.js";

export default function App({ $target }) {
  const $app = document.createElement('div');

  $target.appendChild($app);

  this.setState = async () => {
    const posts = await request('/documents');
    console.log(posts);
  }

  this.setState();
}
