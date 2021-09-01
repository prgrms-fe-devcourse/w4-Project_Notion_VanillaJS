const EDITOR_TITLE_CHANGE_EVENT_NAME = 'editor-title-change'

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

export const EventUtils = {
  titleDispatcher,
  titleEventListener
}