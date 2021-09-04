import { constants } from './constant.js'

const titleDispatcher = () => {
  window.dispatchEvent(new CustomEvent(constants.EDITOR_TITLE_CHANGE_EVENT_NAME, {

  }))
}

const titleEventListener = (onFetch) => {
  window.addEventListener(constants.EDITOR_TITLE_CHANGE_EVENT_NAME, (event) => {
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
