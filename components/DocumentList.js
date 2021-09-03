import { push } from '../utils/router.js';

// css토글 기능 활성화를 위해서. isFirst가 필요합니다.
let isFirst;
const makeDocumentTree = (root, arr, isFirst) => {
  let ul = document.createElement('ul');
  if (isFirst) {
    ul.id = 'myUL';
    isFirst = false;
  } else {
    ul.classList.add('nested');
  }
  root.appendChild(ul);

  arr.forEach(function (item) {
    const li = document.createElement('li');
    li.innerHTML = `
    ${item.title}
    <button class="create_post">➕</button>
    <button class="delete_post">❌</button>
    `;
    li.dataset.id = item.id;
    ul.appendChild(li);

    // item.documents안에 내용이 있으면 재귀가 돈다.
    if (item.documents.length) {
      li.innerHTML = `
      <span class='caret'>${item.title}</span>
      <button class="create_post">➕</button>
      <button class="delete_post">❌</button>
      `;
      li.dataset.id = item.id;
      makeDocumentTree(li, item.documents);
      return;
    }
  });
};

export default function DocumentList({
  $target,
  initialState,
  onPostClick,
  onCreateButton,
  onDeleteButton,
}) {
  let $documentList = document.createElement('div');
  $documentList.classList.add('post_list');
  $target.appendChild($documentList);

  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    isFirst = true;
    $documentList.innerHTML = '';
    // console.log(this.state);
    makeDocumentTree($documentList, this.state, isFirst);
    isFirst = false;
  };

  if (this.state.length) {
    this.render();
  }

  $documentList.addEventListener('click', e => {
    const $li = e.target.closest('li');
    if ($li) {
      const $createButton = e.target.closest('.create_post');
      const $deleteButton = e.target.closest('.delete_post');
      const { id } = $li.dataset;
      if ($createButton) {
        onCreateButton(id);
      } else if ($deleteButton) {
        onDeleteButton(id);
      } else if ($li) {
        // push(`/documents/${id}`)
        onPostClick(id);
      }
    }
  });

  // 토글 클릭 등록
  $documentList.addEventListener('click', function (e) {
    const { className } = e.target;
    if (className.includes('caret')) {
      const toggler = e.target;
      toggler.parentElement.querySelector('.nested').classList.toggle('active');
      toggler.classList.toggle('caret-down');
    }
  });
}
