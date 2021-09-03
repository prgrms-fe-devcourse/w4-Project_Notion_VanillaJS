export default function Account ({ $target, username, message }) {
    const $account = document.createElement('div')
    $account.className = 'account'
    $target.appendChild($account);
  
    this.render = () => {
      $account.innerHTML = `
        <img src="./src/hae.png">
        <div id="profile">
          <div id="nickname">${username}</div>
          <div id="message">${message}</div>
        </div>
        `
    }
  
    this.render()
  }
