export default function AddRootDocButton({ $target, onClickAddButton }) {
  const $button = document.createElement('button');

  this.render = () => {
    $button.textContent = 'New root document';
    $target.appendChild($button);
  };

  this.render();

  $button.addEventListener('click', () => {
    onClickAddButton();
  });
}
