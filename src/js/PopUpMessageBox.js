export default function popUpMessageBox({ $target, message }) {
  const $messageBox = document.createElement("div")
  $messageBox.className = "popUpMessageBox"
  $messageBox.innerHTML = `<h4> ${message} <h4>`
  $target.appendChild($messageBox)
  setTimeout(() => {
    $target.removeChild($messageBox)
  }, 1000)
}
