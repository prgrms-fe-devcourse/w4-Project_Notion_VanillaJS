import { request } from "./api.js"
import App from "./App.js"

const DUMMY_DATA = [
  {
    id: 1,
    title: '이번이다'
  }
]

const $target = document.querySelector('#app')

new App({
  $target
})


