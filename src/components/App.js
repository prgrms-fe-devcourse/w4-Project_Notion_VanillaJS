import Sidebar from './Sidebar.js';
import EditorPage from './EditorPage.js';

import { initRouter } from '../services/router.js';

export default function App({ $target }) {
  const $container = document.createElement('div');
  $container.setAttribute('class', 'app-inner');

  Object.assign($container.style, {
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
  });

  $target.appendChild($container);

  const sidebar = new Sidebar({
    $target: $container,
  });

  const editorPage = new EditorPage({
    $target: $container,
    initialState: {
      id: '',
    },
  });

  this.state = {
    selectedDoc: {
      id: '',
    },
  };

  this.setState = (nextState) => {
    this.state = nextState;
    editorPage.setState(this.state.selectedDoc);
  };

  this.render = async () => {
    await sidebar.render();
    await editorPage.render();
  };

  this.render();

  this.route = async () => {
    const { pathname } = window.location;

    if (pathname.indexOf('/documents') === 0) {
      const [, , id] = pathname.split('/');

      this.setState({
        ...this.setState,
        selectedDoc: {
          id: id === '' ? null : id,
        },
      });
    }
  };

  this.route();

  initRouter(() => this.route());
}
