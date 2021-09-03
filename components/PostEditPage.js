import Editor from './editor.js';
import { getItem, setItem } from '../utils/Storage.js';
import { debounce } from '../utils/debounce.js';
import { createDocument, editDocument, getDocuments } from './api.js';
import { replace } from '../utils/router.js';

export default function PostEditPage({ $target, initialState }) {
  this.state = initialState;
  const $page = document.querySelector('.editor');

  let TEMP_POST_SAVE_KEY = 'temp-post-key';

  const post = getItem(TEMP_POST_SAVE_KEY, {
    title: '',
    content: '',
  });
  console.log(this.state);

  // console.log(post);
  const editor = new Editor({
    $target: $page,
    inititalState: post,
    onEditing: post => {
      debounce(async () => {
        setItem(TEMP_POST_SAVE_KEY, { ...post, tempSaveDate: new Date() });
        const isNew = this.state.postId === 'new';
        console.log(this.state.postId);
        if (isNew) {
          console.log('new');
          const createdPost = await createDocument({ title: post.title });
          replace(`documents/${createdPost.id}`);

          this.setState({ postId: createdPost.id });
        } else {
          editDocument({
            documentId: this.state.postId,
            title: this.state.title,
            content: this.state.content,
          });
        }
      }, 1000);
      console.log(post);
    },
  });

  // 맨처음에 로딩할때 new가 입력되므로 그때는  if(nextState.postId === 'new') 가 필요
  this.setState = async (nextState = { postId: 'new' }) => {
    console.log(this.state);
    TEMP_POST_SAVE_KEY = `temp-post-${nextState.postId}`;
    const tempPost = getItem(TEMP_POST_SAVE_KEY, { title: '', content: '' });
    if (nextState.postId === 'new') {
      editor.setState(tempPost);
      return;
    }

    const storedPost = await getDocuments({ documentId: nextState.postId });
    if (tempPost.tempSaveDate && tempPost.tempSaveDate > storedPost.updatedAt) {
      editor.setState(tempPost);
      this.state = { ...tempPost };
      // return;
    }

    this.state = { ...storedPost };
    console.log('이전과 다른 포스팅  PE.setState');
    console.log(storedPost);
    // editor.setState(storedPost);
  };

  this.render = () => {
    $target.appendChild($page);
  };

  this.render();
}
