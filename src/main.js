import App from './components/App.js';
import { querySelector } from './utils/dom.js';
import { ERROR_MESSAGE } from './utils/constants.js';

const $target = querySelector('#app');

try {
  new App({ $target });
} catch (error) {
  console.error(error);
  $target.innerHTML = '';
  alert(`${ERROR_MESSAGE.ERROR_OCCURRENCE}\n[에러내용] : ${error.message}`);
}
