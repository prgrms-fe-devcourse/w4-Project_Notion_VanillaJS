import App from "./App.js";
import {request} from './api.js'

const $target = document.querySelector("#app");

const documentTree = await request("", {
  method: 'GET'
})

const initialState = {
  documentTree,
  documentTitle: '',
  documentContent: '',
  documentId: ''
}
new App({
  $target,
  initialState
});
