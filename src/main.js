import App from './App.js'
import { getItem } from './storage.js'

const $app = document.querySelector('.app')

const currentState = getItem('documents')

new App({
    $target: $app,
    currentState
})
