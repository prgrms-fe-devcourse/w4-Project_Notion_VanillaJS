import { createElement } from '../utils/dom.js';
import { checkIsEmptyThrowError, checkUseConstructorFunction, isEmptyArray } from '../utils/validator.js';
import { makeChildDocumentLinkTemplate } from '../utils/template.js';
import { dispatchMovePage } from '../utils/eventListeners.js';
import { CLASS_NAME } from '../utils/constants.js';

export default function ChildDocumentLink({ $target, initialState }) {
  const validate = state => {
    checkUseConstructorFunction(new.target, ChildDocumentLink);
    checkIsEmptyThrowError(state);
  };

  validate(initialState);
  this.state = initialState;

  const $childDocumentLink = createElement('div');
  $childDocumentLink.className = CLASS_NAME.CHILD_DOCUMENT_CONTAINER;

  $target.appendChild($childDocumentLink);

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $childDocumentLink.innerHTML = `
      ${this.state.length > 0 ? makeChildDocumentLinkTemplate(this.state) : ''}
    `;
  };

  this.render();

  let isInit = false;

  this.init = () => {
    $childDocumentLink.addEventListener('click', e => {
      const { className, dataset } = e.target;

      if (className === CLASS_NAME.CHILD_DOCUMENT_LINK) {
        dispatchMovePage(`/document/${dataset.id}`);
      }
    });
    isInit = true;
  };

  if (!isInit) {
    this.init();
  }
}
