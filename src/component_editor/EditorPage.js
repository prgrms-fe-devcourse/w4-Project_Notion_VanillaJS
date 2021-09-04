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
    $editorPage.setAttribute('class','editor-container');
   
    const trie = new Trie();
    
    new EditorHeader({
        $target: $editorPage,
    });

    this.state = initialState;

    let timer = null;

    new EditorTools({
        $target : $editorPage,
        saveKeyWord : (text) => {
            trie.insert(text);
            this.setState({...this.state, trie});
        }
    })

    const editor = new Editor({
        $target: $editorPage,
        intialState: {
            title: this.state.title,
            content: this.state.content,
            trie
        },

        onEditing: async (nextDoc) => {
            if (timer !== null) {
                clearTimeout(timer);
            }

            timer = ((id) =>
                setTimeout(async () => {
                    setItem(keyBy(id), {
                        ...nextDoc,
                        savedTime: new Date(),
                    });

                    await request(`/documents/${id}`, {
                        method: 'PUT',
                        body: JSON.stringify(nextDoc),
                    });

                    removeItem(keyBy(id));
                }, 1000))(this.state.id);
        },
    });

    this.setState = async (nextState) => {
        if (isSentFromApp(nextState)) {
            this.state = nextState;
            await fetchDoc();
            return;
        }

        this.state = nextState;

        editor.setState({
            id : this.state.id,
            title: this.state.title,
            content: this.state.content,
            trie
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

    const isSentFromApp = (nextState) => !nextState.title && !nextState.content;
}
