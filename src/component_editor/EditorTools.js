import { createElement } from '../utils/DOM.js';
import KeywordList from './KeywordList.js';
import ToolList from './ToolList.js';

export default function EditorTools({ $target, saveKeyword }) {
    const $editorTools = createElement('div');
    $editorTools.setAttribute('class', 'editor-tools');
    $target.appendChild($editorTools);

    this.state = {
        keywords: [],
    };

    this.setState = (nextState) => {
        this.state = nextState;

        keywordList.setState({
            keywords: this.state.keywords,
        });
    };

    new ToolList({
        $target: $editorTools,
        onKeywordInput: (text) => {
            saveKeyword(text);
            const newKeywords = [...this.state.keywords, text];
            this.setState({
                ...this.state,
                keywords: newKeywords,
            });
        },
    });

    const keywordList = new KeywordList({
        $target: $editorTools,
        initialState: {
            keywords: this.state.keywords,
        },
    });
}
