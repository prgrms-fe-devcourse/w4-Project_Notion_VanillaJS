const caretId = 'position-of-caret'
const selection = window.getSelection()

export const setCaret = ($target) => {
  const $span = document.createElement('span')
  // $target.appendChild($span)
  $span.id = caretId

  selection.getRangeAt(0).insertNode($span)
  console.log('selection:', selection.getRangeAt(0))

  // $target.blur()
}

export const getCaret = ($target) => {
  $target.focus()
}
