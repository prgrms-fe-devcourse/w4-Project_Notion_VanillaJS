import PostPage from "./SideBar/PostPage.js";
import PostEditPage from "./PostMain/PostEditPage.js";

/*
  url 규칙

  루트 : postPage 그리기
  /posts/{id} - id에 해당하는 post 생성
  /post/new - new post 생성
*/

export default function App({ $target }) {
  const postPage = new PostPage({
    $target,
    onClick: (id) => {
      alert(id);
    },
  });

  const postEditPage = new PostEditPage({
    $target,
    initialState: {
      postId: "new",
    },
  });

  this.route = () => {
    const { pathname } = window.location;

    if (pathname === "/") {
      postPage.render();
    } else if (pathname.indexOf("/posts/") === 0) {
      const [, , postId] = pathname.split("/");
      postEditPage.setState({ postId });
    }
  };

  this.route();
}
