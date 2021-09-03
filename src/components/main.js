import App from "./App.js"
import Editor from "./Editor.js"

const $target = document.querySelector('#app')

// new App({
//   $target
// })

new Editor({
  $target,
  initialState:{
    title: 'hi',
    content : 'hello'
  },
  onEditing : (post) => {
    console.log(post)
  }
})

