import Editor from "./Editor.js"
import { setItem, getItem } from "./storage.js"

export default function PostEditPage({
  $target,
  initialState
}) {
  const $page = document.createElement('div')

  this.state = initialState

  const TEMP_POST_SAVE_KEY = 'temp-post'
  const post = getItem(TEMP_POST_SAVE_KEY, {
    title: '',
    content: ''
  })

  let timer = null

  new Editor({
    $target,
    initialState: post, 
    onEditing: (post) => {
      if (timer !== null) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        console.log(post)
        setItem(TEMP_POST_SAVE_KEY, {
          ...post,
          tempSaveDate: new Date()
        })
      }, 2000)
    }
  })

  this.render = () => {
    $target.appendChild($page)
  }

  if (this.state !== 'new') {

  }
}