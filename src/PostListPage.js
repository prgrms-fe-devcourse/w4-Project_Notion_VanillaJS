import PostList from "./PostList.js"
import { request } from "./util/api.js";

export default PostListPage({ $target }) {
  const $postListPage = document.createElement('div');

  const $postList = new PostList({
    $target: $postListPage,
    initialState,
    onAdd: async (id) => {
      const post = await request('/documents', {
        method: 'POST',
      });


    }
  })
}
