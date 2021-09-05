import App from './components/App.js';
import Router from './core/Router.js';

const $app = document.querySelector('#app');

const app = new App($app)

const notionRouter = new Router((id) => {
  app.setState({selectedId: id})
})

export default notionRouter
