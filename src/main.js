import App from "./App.js"
import Editor from "./Editor.js"
import RootContents from "./RootContents.js"
import { getItem, setItem } from "./storage.js"

const $target = document.querySelector('#app')

// new App({ $target })

const TEMP_DOC_SAVE_KEY = 'temp-documnet'

const doc = getItem(TEMP_DOC_SAVE_KEY, {
  title: '',
  content: '',
})

new Editor({ 
  $target, 
  initialState: doc, 
  onEditing: (document) => {
    setItem(TEMP_DOC_SAVE_KEY, {
      ...document,
      tempSaveDate: new Date()
    })
  }
})

const rootcontents = new RootContents({
  $target,
  initialState: {
    "id": 1,
    "title": "노션을 만들자",
    "content": "즐거운 자바스크립트의 세계!",
    "documents": [
      {
        "id": 2,
        "title": "",
        "createdAt": "",
        "updatedAt": ""
      }
    ],
    "createdAt": "",
    "updatedAt": ""
  }
})