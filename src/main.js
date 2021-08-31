import App from "./App.js"
import DocEditPage from "./DocEditPage.js"
import RootContents from "./RootContents.js"

const $target = document.querySelector('#app')

new App({ $target })

// const docEditPage = new DocEditPage({
//   $target,
//   initialState: {
//     documentId: 'new'
//   }
// })

// docEditPage.setState({
//   documentId : 1
// })


// const rootcontents = new RootContents({
//   $target,
//   initialState: {
//     "id": 1,
//     "title": "노션을 만들자",
//     "content": "즐거운 자바스크립트의 세계!",
//     "documents": [
//       {
//         "id": 2,
//         "title": "",
//         "createdAt": "",
//         "updatedAt": ""
//       }
//     ],
//     "createdAt": "",
//     "updatedAt": ""
//   }
// })