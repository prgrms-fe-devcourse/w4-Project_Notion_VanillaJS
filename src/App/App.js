import PostsEditPage from "./page/EditPage/PostEditPage.js";
import PostsPage from "./page/PostPage/PostsPage.js";
import {
  getRootDocument,
  getContentDocument,
  deleteDocument,
  putDocument,
} from "../api/request.js";
import { setItem } from "./page/storage.js";

export default function App({ $target, initialState = [] }) {
  this.state = initialState;
  this.setState = ({ $target, nextState, type }) => {
    // console.log($target, nextState, type);
    this.state = nextState;
    if (type === "li-click") {
      postsPage.setState({ $target, nextState: this.state.documents, type });
      postsEditPage.setState({ $target, nextState });
    } else if (type === "btn-click") {
      $target = document.querySelector("#app");
      postsPage.setState({ $target, nextState: this.state, type });
      // postsEditPage.setState({ $target, nextState });
    }
    else if(type === 'edit-btn-click'){
      const $target = document.getElementById(`${nextState.id}`)
      postsPage.setState({$target , nextState:this.state, type})
    }

    this.render();
  };

  const postsPage = new PostsPage({
    $target,
    initialState,
    onClick: async ($target) => {
      const rootId = $target.id;
      const result = await getContentDocument(rootId);
      this.setState({ $target, nextState: result, type: "li-click" });
    },
    onEraseBtnClick: async ($target) => {
      if (confirm("정말 삭제하시겠습니까?")) {
        await deleteDocument($target.id);
        const initialState = await getRootDocument();
        console.log($target, initialState);
        this.setState({ $target, nextState: initialState, type: "btn-click" });
      }
    },
  });

  let timer = null;

  const postsEditPage = new PostsEditPage({
    $target,
    initialState,
    onEditing: (post) => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setItem(`temp-post-${this.state.id}`, {
          ...post,
          tempSaveDate: new Date(),
        });
        this.state = post;
      }, 1000);
    },
    onPosting: async ({$target , nextState , type}) => {
      const { title, id, content } = nextState;
      await putDocument(title, id, content);
      this.setState({$target, nextState, type})
      // 해야할 것 : title은 Post 후에 바뀌지 않으니 이를 this.setState를 통해 다시 렌더처리
    },
  });

  this.render = () => {};
  this.render();
}
