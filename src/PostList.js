export default function PostList({ $target, initialState, onAdd }) {
  const $postList = document.createElement('div');

  $target.appendChild($postList);

  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  }



  this.render = () => {
    $postList.innerHTML = `
    <div>
      Add New Page
      <button class="addPost">+</button>
    </div>
    <ul>
    </ul>
    `;
  }

  // $postList.addEventListener('click', e => {});
}
