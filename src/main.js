import App from './App.js'
import { getDocument } from './api.js'

const $app = document.querySelector('.app')

const currentState = await getDocument()

new App({
    $target: $app,
    currentState
})
