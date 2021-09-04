import { push } from '../utils/Router.js';
import { numOfEnter } from '../utils/Constant.js';
import {
    setStyle,
    htmlReset,
    createElement,
    setAttribute,
} from '../utils/DOM.js';

export default function DocsList({ $target, initialState = [], addDoc, deleteDoc, reviseDocName }) {
    const $docsList = createElement('div');
    setAttribute([['class', 'doc-list']], $docsList);

    $target.appendChild($docsList);

    this.state = initialState;

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    const makeDocsTree = function (docArr, $target, depth) {
        if (docArr?.length === 0) return;

        const $ul = createElement('ul');
        $target.appendChild($ul);

        for (let i = 0; i < docArr.length; i++) {
            const doc = docArr[i];
            const [docTitle, _] = doc.title.split('/');

            $ul.innerHTML += `
      <li data-id=${doc.id} data-depth=${depth} class='doc-list'>
      <div class='list-container'>
      <div class='doc-title'>${docTitle}</div>
      <button class='add-button'><i class="fas fa-plus"></i></button>
      <button class='delete-button'><i class="fas fa-minus"></i></button>
      <button class='revise-button'><i class="fas fa-wrench"></i></button>
      </div>
      </li>
      `;
            $ul.addEventListener('click', (e) => onClick(e));
            const $li = $ul.lastElementChild;
            makeDocsTree(doc.documents, $li, depth + 1);
        }
    };

    this.render = () => {
        const $dummy = document.createDocumentFragment();
        makeDocsTree(this.state, $dummy, 0);
        htmlReset($docsList);
        $docsList.appendChild($dummy);
    };

    let isExistInputTag = false;

    const onClick = (e) => {
        e.stopImmediatePropagation();
        const { id } = e.target.closest('li[class=doc-list]').dataset;

        switch (e.target.className) {
            case 'add-button':
                {
                    if (!isExistInputTag) {
                        const $docNameInput = createElement('input');

                        setStyle(
                            [
                                ['display', 'block'],
                                ['margin', '0.5rem 0'],
                            ],
                            $docNameInput
                        );

                        $docNameInput.addEventListener('blur', (e) => {
                            addDoc(e.target.value, id);
                            isExistInputTag = false;
                        });

                        e.target.closest('div[class=list-container]').appendChild($docNameInput);
                        $docNameInput.focus();
                        isExistInputTag = true;
                    }
                }
                break;

            case 'delete-button':
                deleteDoc(id);
                break;

            case 'revise-button':
                docNameRevise(id, e);
                break;

            case 'doc-title':
                push(`/documents/${id}`);
                break;

            default:
                break;
        }
    };

    const docNameRevise = (id, e) => {
        if (!isExistInputTag) {
            const $divContainer = e.target.closest('.list-container');
            const $title = $divContainer.querySelector('.doc-title');
            const $docNameInput = createElement('input');

            setStyle(
                [
                    ['display', 'block'],
                    ['margin', '0 -4rem 0 0'],
                    ['display', 'inline'],
                ],
                $docNameInput
            );

            $docNameInput.addEventListener('blur', () => {
                setTimeout(() => {
                    if ($divContainer.querySelector('input')) {
                        $divContainer.replaceChild($title, $docNameInput);
                        isExistInputTag = false;
                    } else return;
                });
            });

            $docNameInput.addEventListener('keyup', (e) => {
                if (e.keyCode === numOfEnter) {
                    reviseDocName(e.target.value, id);
                    $title.innerText = e.target.value;
                    $divContainer.replaceChild($title, $docNameInput);
                    isExistInputTag = false;
                }
            });

            $divContainer.replaceChild($docNameInput, $title);
            $docNameInput.focus();
        }
        isExistInputTag = true;
    };

    this.render();
}
