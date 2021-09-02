const EDITOR_TITLE_CHANGE_EVENT_NAME = 'editor-title-change'
const DOCUMENT_DELETE_EVENT_NAME = 'document-change'

const titleDispatcher = () => {
  window.dispatchEvent(new CustomEvent(EDITOR_TITLE_CHANGE_EVENT_NAME, {

  }))
}

const titleEventListener = (onFetch) => {
  window.addEventListener(EDITOR_TITLE_CHANGE_EVENT_NAME, (event) => {
    console.log('listen!')
    onFetch()
  })
}
/*
const DeleteDispatcher = () => {
  window.dispatchEvent(new CustomEvent(EDITOR_TITLE_CHANGE_EVENT_NAME))
}

const deleteEventListener = (onFetch) => {
  window.addEventListener(EDITOR_TITLE_CHANGE_EVENT_NAME, (event) => {
    console.log('listen!')
    onFetch()
  })
}
*/

export const EventUtils = {
  titleDispatcher,
  titleEventListener
}
