import DocumentList from './DocumentList.js';
import {
  getDocuments,
  createDocument,
  editDocument,
  deleteDocument,
} from './api.js';
import { push } from '../utils/router.js';
import Editor from './Editor.js';

export default function PostPage({ $target }) {
  this.state = [];
  let documentNum = 1;
  const $page = document.querySelector('.documents');

  // 새로운 포스트 만들기 버튼.
  const $createDocumentButton = document.createElement('button');
  $page.appendChild($createDocumentButton);
  $createDocumentButton.textContent = 'New Document';
  $createDocumentButton.addEventListener('click', async () => {
    const newPost = await createDocument({
      title: `${++documentNum}번째 document`,
    });
    this.setState();
  });

  const documentList = new DocumentList({
    $target: $page,
    initialState: [],
    onPostClick: documentId => {
      console.log('post', documentId);
    },
    onCreateButton: documentId => {
      createDocument({ title: `${documentId} nested`, parent: documentId });
      this.setState();
    },
    onDeleteButton: documentId => {
      deleteDocument({ documentId });
      // this.state = this.state.filter(doc => doc.id !== parseInt(documentId));
      this.setState();
    },
  });

  this.setState = async () => {
    this.state = await getDocuments();
    documentNum = this.state.length;
    console.log(this.state);
    documentList.setState(this.state);
    this.render();
  };

  this.render = () => {
    $target.appendChild($page);
  };

  //   this.render();
}
