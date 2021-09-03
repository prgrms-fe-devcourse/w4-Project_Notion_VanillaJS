import DocumentEditPage from "./DocumentEditPage.js";
import App from "./App.js";

const $target = document.querySelector("#app");

// new App({
//   $target
// })


const documentEditPage = new DocumentEditPage({
  $target,
  initialState : {
    documentId : 'new',
    document : {
      title :'',
      content : ''
    }
  }
})

documentEditPage.render()

