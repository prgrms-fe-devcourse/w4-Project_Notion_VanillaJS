import DocumentList from '../components/DocumentList.js';
import { fetchGetDocuments } from '../utils/api.js';
import { checkCorrectTypeThrowError, checkUseConstructorFunction } from '../utils/validator.js';
import { createElement } from '../utils/dom.js';
import { CLASS_NAME } from '../utils/constants.js';

export default function DocumentsPage({ $target, onOpenModal }) {
  const validate = () => {
    checkCorrectTypeThrowError(onOpenModal, 'function');
    checkUseConstructorFunction(new.target, DocumentsPage);
  };

  validate();

  const $page = createElement('nav');
  const $sideButton = createElement('div');
  const $sideButtonIcon = createElement('i');

  $sideButtonIcon.classList.add(CLASS_NAME.FAS, CLASS_NAME.FA_ANGLE_DOUBLE_LEFT);
  $sideButton.className = CLASS_NAME.SIDE_BUTTON;
  $sideButton.appendChild($sideButtonIcon);
  $page.className = CLASS_NAME.DOCUMENT_PAGE;
  $page.appendChild($sideButton);
  $target.appendChild($page);

  const documentList = new DocumentList({
    $target: $page,
    initialState: [],
    onOpenModal,
  });

  this.setState = async () => {
    const documents = await fetchGetDocuments();
    documentList.setState(documents);
  };

  let isInit = false;

  this.init = () => {
    $sideButton.addEventListener('click', e => {
      if (!$page.classList.contains(CLASS_NAME.FADE_OUT)) {
        $page.classList.remove(CLASS_NAME.FADE_IN);
        $page.classList.add(CLASS_NAME.FADE_OUT);
        $sideButtonIcon.classList.remove(CLASS_NAME.FA_ANGLE_DOUBLE_LEFT);
        $sideButtonIcon.classList.add(CLASS_NAME.FA_ANGLE_DOUBLE_RIGHT);
      } else {
        $page.classList.remove(CLASS_NAME.FADE_OUT);
        $page.classList.add(CLASS_NAME.FADE_IN);
        $sideButtonIcon.classList.remove(CLASS_NAME.FA_ANGLE_DOUBLE_RIGHT);
        $sideButtonIcon.classList.add(CLASS_NAME.FA_ANGLE_DOUBLE_LEFT);
      }
    });

    isInit = true;
  };

  if (!isInit) {
    this.init();
  }
}
