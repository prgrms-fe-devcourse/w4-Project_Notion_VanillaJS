import { push } from '../utils/Router.js';
import { setStyle, htmlReset, createElement } from '../utils/DOM.js';
import { isEnterEntered } from '../utils/Check.js';

export default function DocsList({ $target, initialState = [], addDoc, deleteDoc, reviseDocName }) {
    const $docsList = createElement('div');
    $docsList.setAttribute('class', 'doc-list');

    this.state = initialState;

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    // 서버에서 받아온 문서 정보 list 만들기
    const makeDocsTree = function (docArr, $target, depth) {
        if (docArr?.length === 0) return;

        const $ul = createElement('ul');
        $target.appendChild($ul);

        for (let i = 0; i < docArr.length; i++) {
            const doc = docArr[i];
            const [docTitle, _] = doc.title.split('/');

            // 렌더링 되지 않고, 메모리상에서 $ul의 내부 태그만 업데이트 되므로,
            // 리플로우 걱정 없이 작성함
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
            $ul.addEventListener('click', (e) => onListClick(e));
            makeDocsTree(doc.documents, $ul.lastElementChild, depth + 1);
        }
    };

    this.render = () => {
        const $dummy = document.createDocumentFragment();
        makeDocsTree(this.state, $dummy, 0);
        htmlReset($docsList);
        $docsList.appendChild($dummy);
    };

    this.render();

    // 렌더링이 된 후 appendChild
    $target.appendChild($docsList);

    const onListClick = (e) => {
        e.stopImmediatePropagation();
        const { id } = e.target.closest('li[class=doc-list]').dataset;

        switch (e.target.className) {
            case 'add-button':
                docAdd(id, e);
                break;

            case 'delete-button':
                deleteDoc(id);
                break;

            case 'revise-button':
                nameRevise(id, e);
                break;

            case 'doc-title':
                push(`/documents/${id}`);
                break;

            default:
                break;
        }
    };

    // 문서 수정시 input태그의 존재 유무 확인
    let isExistInputTag = false;

    const docAdd = (id, e) => {
        // 이미 새로운 문서를 작성하려고 준비중인데 add 버튼을 또 클릭하는 경우 처리
        if (!isExistInputTag) {
            const $docNameInput = createElement('input');

            setStyle($docNameInput, [
                ['display', 'block'],
                ['margin', '0.5rem 0'],
            ]);

            // input태그가 blur되면 문서 자동 작성
            $docNameInput.addEventListener('blur', (e) => {
                if (isExistInputTag) {
                    addDoc(checkDocTitleLen(e), id);
                    isExistInputTag = false;
                }
            });

            // Enter가 입력돼도 문서 작성
            $docNameInput.addEventListener('keyup', (e) => {
                if (isEnterEntered(e)) {
                    addDoc(checkDocTitleLen(e), id);
                    isExistInputTag = false;
                }
            });

            e.target.closest('div[class=list-container]').appendChild($docNameInput);
            $docNameInput.focus();
            isExistInputTag = true;
        }
    };

    const nameRevise = (id, e) => {
        // if문을 통해서 이름 수정 버튼을 두번 누르는 경우, 제외
        if (!isExistInputTag) {
            const $divContainer = e.target.closest('.list-container');
            const $title = $divContainer.querySelector('.doc-title');
            const $docNameInput = createElement('input');

            setStyle($docNameInput, [
                ['display', 'block'],
                ['margin', '0 -4rem 0 0'],
                ['display', 'inline'],
            ]);

            $docNameInput.addEventListener('keyup', (e) => {
                if (isEnterEntered(e)) {
                    // 이름이 정상적으로 수정된 경우에만 실행
                    reviseDocName(checkDocTitleLen(e, $title.textContent), id);
                    // 문서 수정 이름이 입력되지 않은 경우와 입력된 경우를 나누어서 처리
                    $title.textContent = checkDocTitleLen(e, $title.textContent);
                    $divContainer.replaceChild($title, $docNameInput);
                    isExistInputTag = !isExistInputTag;
                }
            });

            $docNameInput.addEventListener('blur', (e) => {
                // setTimeout을 통해서 딜레이를 주지 않으면, 이름을 수정하고 엔터를 누를 때
                // 'keup'이벤트의 콜백 함수 내에서 isExistInpuTag를 false로 만들었음에도 불구하고
                // 'blur'이벤트의 콜백 함수 내에선 이 값이 반영이 안돼있음
                setTimeout(() => {
                    if (isExistInputTag) {
                        $title.textContent = checkDocTitleLen(e, $title.textContent);
                        $divContainer.replaceChild($title, $docNameInput);
                        isExistInputTag = !isExistInputTag;
                    } else return;
                });
            });

            $divContainer.replaceChild($docNameInput, $title);
            $docNameInput.focus();
        }
        isExistInputTag = true;
    };

    // 수정하는 문서 제목의 길이가 1보다 작은 경우, defalutValue 할당
    // defaultValue가 없는 경우 'new doc'할당
    const checkDocTitleLen = (e, defaultValue) => (e.target.value.length ? e.target.value : defaultValue ? defaultValue : 'new doc');
}
