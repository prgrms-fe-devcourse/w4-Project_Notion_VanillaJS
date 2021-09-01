import DocList from './DocList.js';

export default function SubDocLinks({ $target, initialState }) {
  const $listContainer = document.createElement('div');
  $listContainer.setAttribute('class', 'subdoclinks-container');

  Object.assign($listContainer.style, {
    overflow: 'auto',
  });

  this.state = initialState;

  const subDocList = new DocList({
    $target: $listContainer,
    initialState: this.state,
  });

  this.setState = (nextState) => {
    this.state = nextState;

    subDocList.setState(this.state);
    this.render();
  };

  this.render = () => {
    $target.appendChild($listContainer);
  };

  this.render();

  $listContainer.addEventListener('click', (e) => {
    const $li = e.target.closest('li');
    console.log($li.dataset.id);
  });
}
