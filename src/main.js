import { request } from "./api.js"
import App from "./App.js"


const $target = document.querySelector('#app')

new App({
  $target
})









const DUMMY_DATA = // 생성하는 법
  {
    
    "title": "hello222222222",
    "parent": 3749,
    "content": '이것은 콘텐츠다'
    
  }
  const createnew = {
    "title": '이것은 몇번일까',
    'parent': null,
    'content': '하하호호'
  }
  




// GET, POST, PUT, DELETE

// const putRequest = await request(`${id}`, {
//   method: 'POST',
//   body: JSON.stringify(createnew)
// })


// const something = {
//   "title": '이거슨 네번째 입니다!',
//   "content": '4번입니다.'
// }

// await request('/3832', {       // 수정하기
//   method: 'PUT',
//   body: JSON.stringify(something)
// })
// const getall = await request('')

// const getRequest = await request(`/3784`, { // 가져오기
//   method: 'GET'
// })
// console.log(getall)
// console.log(getRequest)
