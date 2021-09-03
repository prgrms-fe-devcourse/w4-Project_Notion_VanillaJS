import PostPage from './postPage.js';
import PostEditPage from './PostEditPage.js';
import { initRouter } from '../utils/router.js';
import Editor from './Editor.js';

// 데이터는 맨위에서 아래로 차례로 넘겨주기보다는
// 서버에서 바로 받아서 아래로 바로 넘겨주는 방식으로 취하자.
export default function App({ $target }) {
  //   this.state = initialState;
  // 아하! 비동기라서 post가 늦게 뜨는거구나!
  const postPage = new PostPage({ $target });
  //   postPage.setState();
  const postEditPage = new PostEditPage({
    $target,
    initialState: {
      postId: 'new',
      post: {
        title: '',
        content: '',
      },
    },
  });

  this.route = () => {
    const { pathname } = window.location;
    if (pathname === '/') {
      // $target.innerHTML = ``;
      postPage.setState();
      postEditPage.setState();
      console.log(pathname);
    } else if (pathname.indexOf('/documents/') === 0) {
      const [, , postId] = pathname.split('/');
      console.log(postId);
      PostEditPage.setState({ postId });
    }
  };

  this.route();

  initRouter(() => this.route());
}
