import { createElement, createTextNode, getElementById } from '../utils/DOM.js';
import { lazyFilter, revisedReduce, take, head, map, lazyMap, wrappedByArr } from '../utils/RxJS.js';
import { numOfSpaceBar, numOfEnter } from '../utils/Constant.js';

export default function Editor({
    $target,
    initialState = {
        mainTitle: '',
        mainContent: '',
    },
    onEditing,
}) {
    const $editor = createElement('div');
    $editor.setAttribute('class', 'editor');
    $target.appendChild($editor);

    this.state = initialState;

    let tempState = {
        title: '',
        content: '',
    };

    let sel = null;
    let range = null;
    let headerIndex = null;

    let trie = null;

    this.setState = (nextState) => {
        if (nextState.content === this.state.content) {
            this.state.trie = nextState.trie;
        } else {
            this.state = nextState;
            trie = this.state.trie;
            tempState = { ...this.state };
            this.render();
        }
    };

    this.render = () => {
        const { title, content } = this.state;
        const [docTitle, contentTitle] = title.split('/');
        $editor.innerHTML = `
          <div class='title-container'>
          <label for='title'>title</label>
          <input id='title' class='title-input' value='${contentTitle || docTitle}'>
          </div>
          <div class='content-container'>
          <div class='subject'>content</div>
          <div class='content' contentEditable='true'>${showContents(content)}</div>
          </div>
          `;

        // 문서를 불러온 후 focus를 하려면 이 방식으로 해야함. 이유는 모르겠음
        setTimeout(() => {
            $editor.querySelector('.content').focus();
        });

        sel = window.getSelection && window.getSelection();

        // 셀렉션 방어 코드
        // 문서에 focus가 됐음에도 getSelection()이 안되는 경우가 존재.
        // 구체적인 이유는 모르겠으나 스택 오버플로우에서 다음과 같은 방어 코드를 제시함.
        if (sel && sel.rangeCount > 0) {
            range = sel.getRangeAt(0);
        }

        if (sel && typeof headerIndex === 'number') {
            const $header = $editor.querySelector('.content').querySelector(`.header${headerIndex}`);
            range.setStartAfter($header);
        }
    };

    const findMarkDown = (str) => {
        return (
            // str.indexOf('# ') === 0은, 12345라는 글내용을 작성하고 # 12345 를 작성하는 경우 캐치
            // str.indexOf('#&nbsp;') === 0은, # 으로 시작하는 경우 #nbsp;로 입력되는 것을 캐치
            ((str.indexOf('# ') === 0 || str.indexOf('#&nbsp;') === 0) && 'hashOne') ||
            ((str.indexOf('## ') === 0 || str.indexOf('##&nbsp;') === 0) && 'hashTwo') ||
            ((str.indexOf('### ') === 0 || str.indexOf('###&nbsp;') === 0) && 'hashThree') ||
            false
        );
    };

    const isMarkDownInput = (content) => {
        return revisedReduce(
            // content = '안녕하세요<div>저는 김영후 입니다</div><div>전자통신공학과를 졸업했습니다</div><div># 현재는 데브코스를 수강중입니다.</div>
            content.split('<div>'),
            lazyFilter((str) => findMarkDown(str, content)), // split = ['안녕하세요', '저는 김영후입니다</div>', '# 전자통신공학과를 졸업했습니다</div>']
            take(1), // [' # 전자통신공학과를 졸업했습니다</div>'];
            head // '# 전자통신공학과를 졸업했습니다</div>'
        )
            ? true
            : false;
    };

    const showContents = (content) => {
        if (!content) return '';

        const temp = document.createDocumentFragment();
        temp.innerHTML = '';

        content.split('<div>').forEach((str, index) => {
            switch (findMarkDown(str, content)) {
                case 'hashOne':
                    {
                        headerIndex = index;

                        revisedReduce(
                            str.replace('</div>', '').replace('&nbsp;', ''), // # 안녕하세요 저는 김영후 입니다</div> ==> 안녕하세요 저는 김영후 입니다
                            wrappedByArr, // ['# 안녕하세요 저는 김영후 입니다']
                            map((str) => str.slice(1, str.length)), // ['안녕하세요 저는 김영후 입니다']
                            map(
                                (onlyContent) =>
                                    (temp.innerHTML += `<h1 class='header${index}'>${onlyContent.length ? onlyContent : '#'}</h1>`)
                            )
                        );
                    }
                    break;
                case 'hashTwo':
                    {
                        headerIndex = index;

                        revisedReduce(
                            str.replace('</div>', '').replace('&nbsp;', ''),
                            wrappedByArr,
                            map((str) => str.slice(3, str.length)),
                            map(
                                (onlyContent) =>
                                    (temp.innerHTML += `<h2 class='header${index}'>${onlyContent.length ? onlyContent : '#'}</h2>`)
                            )
                        );
                    }
                    break;
                case 'hashThree':
                    {
                        headerIndex = index;

                        revisedReduce(
                            str.replace('</div>', '').replace('&nbsp;', ''),
                            wrappedByArr,
                            map((str) => str.slice(4, str.length)),
                            map(
                                (onlyContent) =>
                                    (temp.innerHTML += `<h3 class='header${index}'>${onlyContent.length ? onlyContent : '#'}</h3>`)
                            )
                        );
                    }
                    break;
                default:
                    temp.innerHTML += str.includes('</div>') ? `<div>${str}` : `${str}`;
                    break;
            }
        });

        return temp.innerHTML;
    };

    let firstString = '';
    let isAutoCompleteExist = false;
    let isSpaceBarEntered = false;

    let cursorPosBeforeChar = null;
    let cursorPosAfterChar = null;
    $editor.addEventListener('keyup', (e) => {
        switch (e.target.className) {
            case 'content':
                {
                    tempState.content = e.target.innerHTML;
                    onEditing(tempState);

                    // #, ##, ### 이 들어오는 경우 체크
                    if (isMarkDownInput(tempState.content)) {
                        this.setState(tempState);
                        return;
                    }

                    // 스페이스바가 입력된 경우,
                    // AutoComplete 로직을 실행시키기 위해 isSpaceBarEntered를 true로 만듬
                    if (e.keyCode === numOfSpaceBar) {
                        isSpaceBarEntered = true;

                        // 초기환
                        cursorPosBeforeChar = null;
                        firstString = '';
                    }

                    // 스페이스바가 입력된 경우, 즉 AutoComplete을 체크할 준비가 된경우
                    if (isSpaceBarEntered) {
                        // 커서 정보 획득
                        sel = window.getSelection();
                        range = sel.getRangeAt(0);

                        // 커서 정보가 지정되지 않은 경우,
                        if (!cursorPosBeforeChar) {
                            // 첫 글자 이전 커서 위치 및 이후 위치 획득
                            cursorPosBeforeChar = range.startOffset;
                            cursorPosAfterChar = range.startOffset + 1;
                        }

                        const cloned = range.cloneRange();

                        cloned.selectNodeContents($editor.querySelector('.content'));

                        cloned.setStart(range.startContainer, cursorPosBeforeChar);

                        if (range.startContainer.length >= cursorPosAfterChar) {
                            cloned.setEnd(range.startContainer, cursorPosAfterChar);

                            // 뛰어쓰기 이후 첫 글자를 획득함
                            if (cloned.toString().length === 1) {
                                firstString = cloned.toString();
                            }
                        }
                    }

                    // 자동 완성이 현재 화면에 display 돼있고, 사용자로부터 입력받은 키가 Enter가 아닌 경우(커서가 앞이나 뒤로 이동하는 경우 === 글자가 입력된 경우)
                    // 자동완성을 삭제함
                    if (isAutoCompleteExist && (range.startOffset <= cursorPosBeforeChar || range.startOffset > cursorPosAfterChar)) {
                        deleteAutoComplete();
                        isAutoCompleteExist = false;
                        isSpaceBarEntered = false;
                        firstString = '';
                    }

                    // trie에 획득된 첫 글자를 던져주고, 등록된 키워드가 있는지 확인하는 절차
                    if (trie.getAllWords(firstString).length !== 0) {
                        // 이미 입력된 자동 완성이 있다면 삭제함
                        deleteAutoComplete();

                        // firstString이 '프'인 경우, autoCompleteWord는 '로그래머스'가 됨
                        const autoCompleteWord = revisedReduce(
                            trie.getAllWords(firstString),
                            lazyMap((similarWord) => similarWord.replace(firstString, '')),
                            head
                        );

                        // 프로그래머스에서 '로그래머스'는 자동 완성 글자인데, 이 글자를 span태그 안에 넣어서 색깔을 추가함
                        const $preview = createElement('span');
                        $preview.setAttribute('id', 'autoComplete');
                        $preview.style.display = 'inline';
                        $preview.textContent = autoCompleteWord;

                        autoComplete('preview', $preview);

                        // 현재 자동 완성된 텍스트가 존재하고 있음을 true로 만듬
                        isAutoCompleteExist = true;

                        // 이후에는 1. 엔터가 입력되는 경우, 2. 엔터 이외의 입력이 일어나는 경우로 나뉨
                    }
                }
                break;

            case 'title-input':
                {
                    const [docTitle, _] = this.state.title.split('/');
                    tempState.title = docTitle + '/' + e.target.value;
                    onEditing(tempState);
                }
                break;

            default:
                break;
        }
    });

    $editor.addEventListener('keydown', (e) => {
        // 자동 완성이 현재 화면에 display 돼있고, 사용자로부터 입력받은 키가 Enter인 경우, 자동완성 실행
        if (isAutoCompleteExist === true && e.keyCode === numOfEnter) {
            e.preventDefault();
            const $autoComplete = getElementById('autoComplete');
            const $autoCompleteParent = $autoComplete.parentNode;
            const autoCompleteWord = $autoComplete.textContent;
            const $text = createTextNode(autoCompleteWord);
            $autoCompleteParent.removeChild($autoComplete);

            sel = window.getSelection();
            range = sel.getRangeAt(0);
            range.insertNode($text);
            range.setStartAfter($text);

            isAutoCompleteExist = false;
            isSpaceBarEntered = false;
            firstString = '';
        }
    });

    const autoComplete = (decision, $autoComplete) => {
        sel = window.getSelection();
        range = sel.getRangeAt(0);
        range.insertNode($autoComplete);
        if (decision === 'preview') range.setEndBefore($autoComplete);
        else if (decision === 'insert') range.setEndAfter($autoComplete);

        sel = null;
    };

    const deleteAutoComplete = () => {
        const $autoComplete = getElementById('autoComplete');
        const $autoCompleteParent = $autoComplete?.parentNode || null;

        if ($autoComplete && $autoCompleteParent) {
            $autoCompleteParent.removeChild($autoComplete);
        }
    };
}
