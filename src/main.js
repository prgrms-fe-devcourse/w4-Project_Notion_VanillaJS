import App from './App.js'
import { getDocument } from './api.js'

const $app = document.querySelector('.app')

const currentState = await getDocument()

const $content = document.createElement('div')
$content.contentEditable = true

new App({
    $target: $app,
    currentState
})
