import EditorHeader from './EditorHeader.js';
import { request } from '../utils/Api.js';
import Editor from './Editor.js';
import { setItem, removeItem, getItem } from '../utils/Storage.js';
import { createElement, setAttribute } from '../utils/DOM.js';
import { keyBy } from '../utils/Format.js';

export default function EditorPage({
    $target,
    initialState = {
        id: '',
        title: '',
        content: '',
    },
}) {
    const $editorPage = createElement('div');
    setAttribute([['class', 'editor-container']],$editorPage);

    new EditorHeader({
        $target: $editorPage,
    });

    this.state = initialState;

    let timer = null;

    const editor = new Editor({
        $target: $editorPage,
        intialState: {
            title: this.state.title,
            content: this.state.content,
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
        if (!nextState.title && !nextState.content) {
            this.state = nextState;
            await fetchDoc();
            return;
        }

        this.state = nextState;
        console.log('editorPage setState실행');

        editor.setState({
            title: this.state.title,
            content: this.state.content,
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
}
