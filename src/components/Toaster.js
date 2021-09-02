export default function Snackbar({ $target, message }) {
  const $toast = document.createElement('span');
  $toast.setAttribute('class', 'toast');
  $toast.textContent = message;

  this.render = () => {
    $target.appendChild($toast);

    $toast.classList.add('show');

    setTimeout(() => {
      $toast.classList.remove('show');
      setTimeout(() => {
        $target.removeChild($toast);
      }, 2000);
    }, 2000);
  };

  this.render();
}
