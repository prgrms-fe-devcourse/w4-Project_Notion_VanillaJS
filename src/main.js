import App from './App.js';
import { querySelector } from './utils/DOM.js'

const $target = querySelector('#app');

 new App({
   $target
 })