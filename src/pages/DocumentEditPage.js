import DocumentEditor from '../components/DocumentEditor.js';
import { fetchGetDocument } from '../utils/api.js';
import { checkIsEmptyThrowError, checkUseConstructorFunction } from '../utils/validator.js';
import { CLASS_NAME } from '../utils/constants.js';
import { createElement } from '../utils/dom.js';

export default function DocumentEditPage({ $target, initialState }) {
  const validate = state => {
    checkUseConstructorFunction(new.target, DocumentEditPage);
    checkIsEmptyThrowError(state);
  };

  validate(initialState);
  this.state = initialState;

  const $page = createElement('div');
  $page.className = CLASS_NAME.EDIT_PAGE;

  const documentEditor = new DocumentEditor({
    $target: $page,
    initialState: {},
  });

  this.setState = async nextState => {
    validate(nextState);
    const documentInfo = await fetchGetDocument(nextState);
    documentEditor.setState(documentInfo);
    this.render();
  };

  this.clear = () => {
    documentEditor.setState({});
  };

  this.render = () => {
    $target.appendChild($page);
  };

  this.render();
}
