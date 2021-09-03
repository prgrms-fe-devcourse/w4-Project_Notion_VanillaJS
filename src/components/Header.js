import {push} from "../utils/router.js"

export default function Header({ $target, initialState }) {
  const $header = document.createElement("h3");
  $target.appendChild($header);
  this.state = initialState;

  this.render = () => {
    $header.innerHTML = `${this.state}의 Notion`;
  }

  this.render()

  $header.addEventListener('click', e => {
      const {target} = e
      if(target) {
          push({
              type : 'header',
              id : null
          })
      }
  })
}
