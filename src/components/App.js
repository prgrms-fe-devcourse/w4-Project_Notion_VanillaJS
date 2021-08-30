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
    onClickDoc: (id) => {
      this.setState({
        ...this.state,
        selectedDoc: {
          id,
        },
      });
    },
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

  this.route = async () => {
    await docsPage.render();
    await editorPage.render();
  };

  this.route();
}
