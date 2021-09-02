export default function Profile ({ $target, username, quote }) {
  const profile = document.createElement('div')
  profile.className = 'profile'
  $target.appendChild(profile);

  this.render = () => {
    profile.innerHTML = `
      <img src="https://i.imgur.com/xHRfbeZ.jpg">
      <div id="info">
        <span id="name">${username}</span>
        <span id="quote">${quote}</span>
      </div>
      `
  }

  this.render()
}