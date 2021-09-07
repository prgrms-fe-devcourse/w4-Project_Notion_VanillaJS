export default function UserName({$target, initialState}) {
  const $userName = document.createElement('div');
  $userName.setAttribute('class','username');
  
  this.state = initialState;
  
  this.render =() => {
    $userName.textContent = `
    ${this.state}님의 Notion
    `
  }
  
  this.render();
  $target.appendChild($userName);
}