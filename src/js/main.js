import App from './components/App.js'
import api from './api/index.js';
import DocList from './components/DocumentList.js';
import{ initRouter } from './core/Router.js';


const $app = document.querySelector('#app');

new App($app)

//initRouter(app.route)

/*
const content = [
  {
    "className": "test",
    "placeholder": "내용을 입력해 주세요",
    "text": "안되는 것 같은데..."
  }
]

const normalize = JSON.stringify(content);

console.log(normalize)

  const childDoc = {
    title: "content가 object형태여도 괜찮을까??",
    content: normalize      
  }

  const test = async () => {
    const docs = await api.getDoc(7625);
    const parsedContent = JSON.parse(docs.content)
    console.log(parsedContent);
  }

  test();
*/