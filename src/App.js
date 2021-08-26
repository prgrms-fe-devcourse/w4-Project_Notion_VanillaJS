import PostEditor from './PostEditor.js';
import PostList from './PostList.js';

export default function App({ $target, initialState }) {
  const postList = new PostList({
    $target
  });

  const postEditor = new PostEditor({
    $target
  });
}
