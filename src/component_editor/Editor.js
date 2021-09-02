import {
    getTagOf,
    createElement,
    querySelector,
    getInputValue,
    getKeyCodeOf,
    setStyle,
    createTextNode,
    setAttribute,
    setTextContent,
    getClassName,
    getElementById,
    getTextContent,
} from '../utils/DOM.js';
import { lazyFilter, revisedReduce, take, head, map, lazyMap, wrappedByArr, length } from '../utils/RxJS.js';
import { numOfSpaceBar, numOfEnter } from '../utils/Constant.js';
import { Trie } from '../utils/Algorithm.js';

export default function Editor({
    $target,
    initialState = {
        mainTitle: '',
        mainContent: '',
    },
    onEditing,
}) {
    const $editor = createElement('div');
    setAttribute([['class','editor']], $editor);

    $target.appendChild($editor);

    this.state = initialState;

    let tempState = {
        title: '',
        content: '',
    };

    let sel = null;
    let range = null;
    let headerIndex = null;

    this.setState = (nextState) => {
        this.state = nextState;
        tempState = { ...this.state };
        this.render();
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

        setTimeout(() => {
            querySelector($editor, '.content').focus();
        });

        sel = window.getSelection && window.getSelection();

        if (sel && sel.rangeCount > 0) {
            range = sel.getRangeAt(0);
        }

        if (sel && typeof headerIndex === 'number') {
            const $header = querySelector(querySelector($editor, '.content'), `.header${headerIndex}`);
            range.setStartAfter($header);
        }
    };

    const findMarkDown = (str, content) => {
        return (
            ((str.indexOf('# ') === 0 || content.indexOf('# ') === 0) && 'hashOne') ||
            ((str.indexOf('## ') === 0 || content.indexOf('## ') === 0) && 'hashTwo') ||
            ((str.indexOf('### ') === 0 || content.indexOf('### ') === 0) && 'hashThree') ||
            false
        );
    };

    const isMarkDownInput = (content) => {
        return revisedReduce(
            content.split('<div>'),
            lazyFilter((str) => findMarkDown(str, content)),
            take(1),
            head
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
                            str.replace('</div>', ''), // # 안녕하세요 저는 김영후 입니다</div> ==> 안녕하세요 저는 김영후 입니다
                            wrappedByArr, // ['# 안녕하세요 저는 김영후 입니다']
                            map((str) => str.slice(2, str.length)), // ['안녕하세요 저는 김영후 입니다']
                            map((onlyContent) => (temp.innerHTML += `<h1 class='header${index}'>${onlyContent}</h1>`))
                        );
                    }
                    break;
                case 'hashTwo':
                    {
                        headerIndex = index;

                        revisedReduce(
                            str.replace('</div>', ''),
                            wrappedByArr,
                            map((str) => str.slice(3, str.length)),
                            map((onlyContent) => (temp.innerHTML += `<h2 class='header${index}'>${onlyContent}</h2>`))
                        );
                    }
                    break;
                case 'hashThree':
                    {
                        headerIndex = index;

                        revisedReduce(
                            str.replace('</div>', ''),
                            wrappedByArr,
                            map((str) => str.slice(4, str.length)),
                            map((onlyContent) => (temp.innerHTML += `<h3 class='header${index}'>${onlyContent}</h3>`))
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

    $editor.addEventListener('keydown', (e) => {
        if (isAutoCompleteExist === true && getKeyCodeOf(e) === numOfEnter) {
            e.preventDefault();
            const $autoComplete = getElementById('autoComplete');
            const autoCompleteWord = getTextContent($autoComplete);
            const $autoCompleteParent = $autoComplete.parentNode;
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

    let cursorPosBeforeChar = null;
    let cursorPosAfterChar = null;

    $editor.addEventListener('keyup', (e) => {
        switch (getClassName(getTagOf(e))) {
            case 'content':
                {
                    tempState.content = getTagOf(e).innerHTML;
                    onEditing(tempState);

                    if (isMarkDownInput(tempState.content)) {
                        this.setState(tempState);
                        return;
                    }

                    if (getKeyCodeOf(e) === numOfSpaceBar) {
                        isSpaceBarEntered = true;
                        cursorPosBeforeChar = null;
                        firstString = '';
                    }
                    
                    if (isSpaceBarEntered) {
                        sel = window.getSelection();
                        range = sel.getRangeAt(0);
                        
                        if (!cursorPosBeforeChar) {
                            cursorPosBeforeChar = range.startOffset;
                            cursorPosAfterChar = range.startOffset + 1;
                        }
                        const cloned = range.cloneRange();
                        
                        cloned.selectNodeContents(querySelector($editor, '.content'));

                        cloned.setStart(range.startContainer, cursorPosBeforeChar);

                        if (range.startContainer.length >= cursorPosAfterChar) {
                            cloned.setEnd(range.startContainer, cursorPosAfterChar);

                            if (cloned.toString().length === 1) {
                                firstString = cloned.toString();
                            }
                        }
                    }
                    
                    if (trie.getAllWords(firstString).length !== 0) {
                        deleteAutoComplete();

                        const autoCompleteWord = revisedReduce(
                            trie.getAllWords(firstString),
                            lazyMap((similarWord) => similarWord.replace(firstString, '')),
                            head
                        );

                        const $temp = revisedReduce(
                            'span',
                            createElement,
                            setAttribute([['id', 'autoComplete']]),
                            setStyle([['display', 'inline']]),
                            setTextContent(autoCompleteWord)
                        );

                        autoComplete('preview', $temp);
                        isAutoCompleteExist = true;
                    }
                }
                break;

            case 'title-input':
                {
                    const [docTitle, _] = this.state.title.split('/');
                    tempState.title = docTitle + '/' + getInputValue(getTagOf(e));
                    onEditing(tempState);
                }
                break;

            default:
                break;
        }
    });

    const trie = new Trie();

    trie.insert('안녕하세요');
    trie.insert('데브코스');
    trie.insert('프로그래머스');
    trie.insert('노션 클로닝');

    const autoComplete = (decision, $temp) => {
        sel = window.getSelection();
        range = sel.getRangeAt(0);
        range.insertNode($temp);
        if (decision === 'preview') range.setEndBefore($temp);
        else if (decision === 'insert') range.setEndAfter($temp);

        sel = null;
    };

    const deleteAutoComplete = () => {
        // const $contentContainer = querySelector($editor, '.content');
        const $autoComplete = getElementById('autoComplete');
        const $autoCompleteParent = $autoComplete?.parentNode || null;

        if ($autoComplete && $autoCompleteParent) {
            $autoCompleteParent.removeChild($autoComplete);
        }
    };

    const cursorPosAfterAutoComplete = (offset, autoCompleteStrLen) => {
        return offset + autoCompleteStrLen;
    };
}
