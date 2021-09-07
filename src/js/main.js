import App from './components/App.js';
import Router from './core/Router.js';

const $app = document.querySelector('#app');

let app = new App($app) 

const notionRouter = new Router(
  id => {
    app.setState({selectedId: id})
  },
  id => {
    app = new App($app)
    if (id) {
      app.setState({selectedId: id})  
    }
  }
)

export default notionRouter
