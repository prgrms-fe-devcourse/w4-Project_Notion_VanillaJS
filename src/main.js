import App from './App.js';
import {request} from './api.js';

const $target = document.querySelector('#app')

new App({$target})


const fetchDocumentList = async () => {
  // await request(`/documents/4021`, {
  //   method: 'PUT',
  //   body: JSON.stringify(
  //     {
  //       "title" : "소정의 루트에 내용 추가",
  //       "content" : '내용을 추가해보자'
  //     }
  //   )
  // })
  const documentList = await request('/documents/4021')
  console.log('documentList :>> ', documentList);
}

fetchDocumentList()

