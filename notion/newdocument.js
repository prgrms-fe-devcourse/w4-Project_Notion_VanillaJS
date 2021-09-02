export default function NewDocument ({ $target, onCreate }) {
  const newbutton = document.createElement('div')
  $target.appendChild(newbutton)
  newbutton.className = 'create'
  newbutton.textContent = 'NEW DOCUMENT'

  newbutton.addEventListener('click', (e) => {
    onCreate()
  })
}