export default function AddRootDocButton({ $target, onClickAddButton }) {
  const $button = document.createElement('button');
  $button.setAttribute('class', 'sidebar__add-new-root-button');

  this.render = () => {
    $button.textContent = '+ New root document';
  };

  this.render();

  $button.addEventListener('click', () => {
    onClickAddButton();
  });

  $target.appendChild($button);
}
