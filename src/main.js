import { request } from "./api.js"
import RootDocs from "./RootDocs.js"

const $target = document.querySelector('#app')

const rootdocs = new RootDocs({
  $target,
  initialState: [
    {
      "id": 1, // Document id
      "title": "노션을 만들자", // Document title
      "documents": [
        {
          "id": 2,
          "title": "블라블라",
          "documents": [
            {
              "id": 3,
              "title": "함냐함냐",
              "documents": []
            }
          ]
        }
      ]
    },
    {
      "id": 4,
      "title": "hello!",
      "documents": []
    }
  ]
})



const fetchDocs = async () => {
  const docs = await request('/documents')

  rootdocs.setState(docs)
}

// fetchDocs()
