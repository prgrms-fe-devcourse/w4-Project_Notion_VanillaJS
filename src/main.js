import App from "./App.js";
import {request} from './api.js'

const $target = document.querySelector("#app");

const documentTree=await request("",{
  method:'GET'
})
// console.log(documentTree)
// const tmp=JSON.parse(documentTree)
// for(const doc of documentTree){
//   console.log(doc.createdAt)
// }
// console.log(tmp.title)
// console.log(tmp.createdAt)
// const docExample=await request('/{0}',{
//   method:'GET'
// })
// console.log(docExample);
// api 호출은 성공했고, 계층화에 관련 확인은 DUMMY데이터가 유용해서 우선은 더미 데이터 사용한다!!!!
// const DUMMY_DOC_TREE=[
//   {
//     "id": 1, // Document id
//     "title": "노션을 만들자1", // Document title
//     "documents": [
//       {
//         "id": 2,
//         "title": "블라블라2",
//         "documents": [
//           {
//             "id": 3,
//             "title": "함냐함냐3",
//             "documents": []
//           }
//         ]
//       },
//       {
//         "id": 5,
//         "title": "블라블라5",
//         "documents": [
//           {
//             "id": 7,
//             "title": "함냐함냐7",
//             "documents": []
//           }
//         ]
//       }
//
//     ]
//   },
//   {
//     "id": 4,
//     "title": "hello!",
//     "documents": []
//   }
// ]

// const initialState = {
// 	documentTree,
// 	documentTitle: "",
// 	documentContent: "",
// 	documentId: null,
// };
const initialState={
  documentTree,
  documentTitle:'',
  documentContent:'',
  documentId: ''
}
new App({
	$target,
	initialState
});
