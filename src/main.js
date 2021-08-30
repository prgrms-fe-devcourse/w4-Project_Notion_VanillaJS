import App from './components/App.js';
import { querySelector } from './utils/dom.js';

const $target = querySelector('#app');

try {
  new App({ $target });
} catch (error) {
  console.error(error);
  alert(`에러가 발생했습니다 에러내용 : ${error.message}`);
}
