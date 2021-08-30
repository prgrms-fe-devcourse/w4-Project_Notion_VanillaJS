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
      id: 1,
    },
  });

  this.state = {
    documents: [],
  };

  this.route = async () => {
    await docsPage.render();
    await editorPage.render();
  };

  this.route();
}
