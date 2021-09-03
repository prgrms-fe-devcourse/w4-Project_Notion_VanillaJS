export default function WelcomePage({ $target }) {
  const $welcomePage = document.createElement('div');

  $target.appendChild($welcomePage);
  $welcomePage.innerHTML = `
    <h1>환영합니다!</h1>
  `;

  this.render = () => {
    $target.innerHTML = '';
    $target.appendChild($welcomePage);
  }

  this.remove = () => {
    $welcomePage.remove();
  }
}