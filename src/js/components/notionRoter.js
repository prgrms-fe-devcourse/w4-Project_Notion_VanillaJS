import Router from '../core/Router.js';
import App from './App.js';

const $app = document.querySelector('#app');

const notionRouter = new Router((uri) => {
  if (uri.includes('documents')) {
    const id = Number(uri.split('/').pop())
    new App($app, {selectedId : id})
  } else {
    new App($app, {selectedId: null})
  }
});

export default notionRouter
