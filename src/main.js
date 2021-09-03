import App from './App.js';
import PostListPage from './PostListPage.js';

const $target = document.querySelector('#app');

new App({
  $target,
  initialState: [],
});

const postListPage = new postListPage()

const fetchPosts = async () => {
  const posts = await request('/posts');

  postList.setState(posts);
}

fetchPosts();
