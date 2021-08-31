import { initRouter } from '../services/router.js';
import DocsPage from './DocsPage.js';
import EditorPage from './EditorPage.js';

export default function App({ $target }) {
  const $container = document.createElement('div');

  Object.assign($container.style, {
    display: 'flex',
    'justify-content': 'space-around',
  });

  $target.appendChild($container);

  const docsPage = new DocsPage({
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
    await docsPage.render();
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
          id,
        },
      });
    }
  };

  this.route();

  initRouter(() => this.route());
}
