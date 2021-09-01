const EDITOR_TITLE_CHANGE_EVENT_NAME = 'editor-title-change'

const titleDispatcher = () => {
  window.dispatchEvent(new CustomEvent(EDITOR_TITLE_CHANGE_EVENT_NAME, {

  }))
}
/*
{
  "id":5057,
  "title":"문서 제목dsdasdsadsdf",
  "createdAt":"2021-08-31T18:04:15.392Z",
  "updatedAt":"2021-09-01T11:26:31.766Z",
  "content":null,
  "documents":[]
}
*/
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