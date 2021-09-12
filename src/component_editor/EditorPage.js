import EditorHeader from './EditorHeader.js';
import EditorTools from './EditorTools.js';
import { request } from '../utils/Api.js';
import Editor from './Editor.js';
import { setItem, removeItem, getItem } from '../utils/Storage.js';
import { createElement } from '../utils/DOM.js';
import { keyBy } from '../utils/Format.js';
import { Trie } from '../utils/Algorithm.js';

export default function EditorPage({
    $target,
    initialState = {
        id: '',
        title: '',
        content: '',
    },
}) {
    const $editorPage = createElement('div');
    $editorPage.setAttribute('class', 'editor-container');

    new EditorHeader({
        $target: $editorPage,
    });

    this.state = initialState;

    new EditorTools({
        $target: $editorPage,
        saveKeyword: (text) => {
            trie.insert(text);
            this.setState({ ...this.state, trie });
        },
    });

    let storageTimer = null;
    let serverTimer = null;
    const trie = new Trie();

    const editor = new Editor({
        $target: $editorPage,
        intialState: {
            title: this.state.title,
            content: this.state.content,
            trie,
        },

        onEditing: async (nextDoc) => {
            if (storageTimer !== null) {
                clearTimeout(storageTimer);
            }
            storageTimer = ((id) =>
                setTimeout(async () => {
                    setItem(keyBy(id), {
                        ...nextDoc,
                        savedTime: new Date(),
                    });
                }, 2000))(this.state.id);

            if (serverTimer !== null) return;
            // 서버와의 통신 횟수를 줄이기 위해서, 10초 간격으로 데이터 저장
            serverTimer = ((id) => {
                setTimeout(async () => {
                    await request(`/documents/${id}`, {
                        method: 'PUT',
                        body: JSON.stringify(nextDoc),
                    });
                    removeItem(keyBy(id));
                    clearTimeout(serverTimer);
                }, 10000);
            })(this.state.id);
        },
    });

    this.setState = async (nextState) => {
        // setState가 App에서 호출된 경우인지 확인
        if (isSentFromApp(nextState)) {
            this.state = nextState;
            await fetchDoc();
            return;
        }

        this.state = nextState;

        editor.setState({
            id: this.state.id,
            title: this.state.title,
            content: this.state.content,
            trie,
        });

        this.render();
    };

    this.render = () => {
        $target.appendChild($editorPage);
    };

    const fetchDoc = async () => {
        const { id } = this.state;

        const serverDoc = await request(`/documents/${id}`, {
            method: 'GET',
        });

        const localDoc = getItem(keyBy(id), {
            title: '',
            content: '',
        });

        // 스토리지에 저장된 데이터가 서버에 저장된 데이터보다 최신인 경우,
        // 스토리지 데이터 획득
        if (localDoc.savedTime && localDoc.savedTime > serverDoc.updatedAt) {
            this.setState({
                ...this.state,
                title: localDoc.title,
                content: localDoc.content,
            });

            await request(`/documents/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    title: localDoc.title,
                    content: localDoc.content,
                }),
            });

            removeItem(keyBy(id));
        } else {
            this.setState({
                ...this.state,
                title: serverDoc.title,
                content: serverDoc.content,
            });
        }
    };

    // setState가 App에서 호출된 경우인지 확인
    const isSentFromApp = (nextState) => !nextState.title && !nextState.content;
}
