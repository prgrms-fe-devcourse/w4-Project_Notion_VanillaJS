import { setAttribute } from "../utils/DOM.js";

export default function UserName({$target, initialState}) {
  const $userName = document.createElement('div');
  setAttribute([['class','username']], $userName);
  $target.appendChild($userName);

  this.state = initialState;

  this.setState =nextState => {
    this.state = nextState;
    this.render();
  }

  this.render =() => {
    $userName.innerHTML = `
      ${this.state}님의 Notion
    `
  }

  this.render();
}