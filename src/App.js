import Header from "./Header.js"
import Editor from "./Editor.js"
import RootList from "./RootList.js"
import { setItem, getItem } from "./storage.js"

const DUMMY_DATA = [
  {
    "id": 1, // Document id
    "title": "노션을 만들자", // Document title
    "parent": null,
    "createdAt": "",
    "updatedAt": "",
    "documents": [
      {
        "id": 2,
        "title": "블라블라",
        "parent": 1,
        "createdAt": "",
        "updatedAt": "",
        "documents": [
          {
            "id": 3,
            "title": "함냐함냐",
            "parent": 2,
            "createdAt": "",
            "updatedAt": "",
            "documents": []
          }
        ]
      }
    ]
  },
  {
    "id": 4,
    "title": "hello!",
    "parent": null,
    "createdAt": "",
    "updatedAt": "",
    "documents": []
  }
]

export default function App({
  $target
}) {

  const $rootListContainer = document.createElement('div')
  const $mainListContainer = document.createElement('div')

  $target.appendChild($rootListContainer)
  $target.appendChild($mainListContainer)

  new Header({
    $target: $rootListContainer,
    initialState: {
      name: 'jin'
    }
  })
  
  new RootList({
    $target: $rootListContainer,
    initialState: DUMMY_DATA
  })

  const TEMP_POST_SAVE_KEY = 'temp-post'
  const post = getItem(TEMP_POST_SAVE_KEY, {
    title: '',
    content: ''
  })

  let timer = null

  new Editor({
    $target: $mainListContainer,
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
}