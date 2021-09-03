export default function AddRootDocumentButton({ $target, initialState, onClick }) {
  const $addRootDocumentButton = document.createElement('div');

  $target.appendChild($addRootDocumentButton);

  this.state = initialState;
  console.log(this.state);
  this.setState = nextState => {
    this.state = nextState;

    this.render();
  };

  this.render = () => {
    $addRootDocumentButton.innerHTML = `
        <button class="add-new-root-document">${this.state.title}</button>
      `;
  };

  this.render();

  $addRootDocumentButton.addEventListener('click', onClick);
}
