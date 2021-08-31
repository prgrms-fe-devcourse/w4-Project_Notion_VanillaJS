import App from './components/App.js'
import api from './api/index.js';
import DocList from './components/DocList.js';

const $app = document.querySelector('#app');

const docs = await api.getAllDocs()

new DocList(
  $app,
  {
    state: docs 
  }
)
//new App($app)

  const childDoc = {
    title: "두번째 문서의 네번째 자식 문서",
    content: "이 문서는 세번째 문서입니다.",
    parent: 4269
  }

  const test = async () => {
    const docs = await api.getAllDocs();
    console.log(docs);
  }

  test();
