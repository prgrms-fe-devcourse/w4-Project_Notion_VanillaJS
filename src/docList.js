import { push } from "./router.js";  

export default function DocList({ $target, initialState, onCreate, onDelete }) {
  const $docList = document.createElement('div');

  $target.appendChild($docList);

  this.state = initialState;

  const postList = (data) => {
    return data.length > 0 
      ? `
        <ul>
          ${ data.map(post => `
            <li data-id="${ post.id }"> ${ post.title }
              <button class="cr-bt">+</button>
              <button class="del-bt">X</button>
            </li>
            ${ post.documents.length > 0
                ? `${ postList(post.documents) }`
                : `` }
          `).join('') }
        </ul>
      ` 
      : onCreate("기본 문서", null) ;
  }

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  }

  this.render =  () => {
    $docList.innerHTML = `
      ${postList(this.state)}
      <button class="cr-bt">+</button>
    `;

    const $button = $docList.querySelectorAll('button');
    $button.forEach((bt) => bt.addEventListener('click', (e) => {
      const $li = e.target.closest('li');
      if ($li) {
        const { id } = $li.dataset;
        if (e.target.className == "del-bt") {
          onDelete(parseInt(id));
        } else if (e.target.className == "cr-bt") {
          onCreate("제목을 입력하세요.", parseInt(id));
        }
      } else {
        onCreate("제목을 입력하세요.", null);
      }
    }));

    const $li = $docList.querySelectorAll('li');
    $li.forEach((li) => { li.addEventListener('click', (e) => {
      const { id } = e.target.dataset;
      push(`/documents/${id}`);
    });
    });
  }

  this.render();
}