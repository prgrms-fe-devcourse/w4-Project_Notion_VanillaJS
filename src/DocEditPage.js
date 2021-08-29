import EditHeader from './EditHeader.js';
import { request } from './api.js';
import Editor from './Editor.js';
import { setItem, removeItem, getItem } from './storage.js';

export default function DocEditPage({
    $target,
    initialState = {
        id: '',
        title: '',
        content: '',
    },
}) {
    const $docEditPage = document.createElement('div');
    $docEditPage.className = 'edit-container';

    new EditHeader({
        $target: $docEditPage,
    });

    this.state = initialState;

    let timer = null;

    let CURRENT_DOC_KEY = `current-doc-${this.state.id}`;

    const editor = new Editor({
        $target: $docEditPage,
        intialState: {
            title: this.state.title,
            content: this.state.content,
        },
        onEditing: async (nextDoc) => {
            if (timer !== null) {
                clearTimeout(timer);
            }

            // 2초에 한번꼴로 로컬스토리지에 저장
            timer = setTimeout(() => {
                setItem(CURRENT_DOC_KEY, {
                    ...nextDoc,
                    savedTime: new Date(),
                });
            }, 2000);

            // 10초에 한번꼴로 서버에 저장
            setTimeout(async () => {
                await request(`/documents/${this.state.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(nextDoc),
                });

                this.setState({
                    ...this.state,
                    ...nextDoc,
                });
                removeItem(CURRENT_DOC_KEY);
            }, 10000);
        },
    });

    this.setState = async (nextState) => {
        // 해당 Doc에 처음 접근하는 경우, setState와 nextState의 무한루프 형성 방지를 위한 조건문
        if(!nextState.title && !nextState.content) {
            this.state = nextState;
            await fetchDoc();
            return;
        }

        this.state = nextState;

        editor.setState({
            title: this.state.title,
            content: this.state.content,
        });

        this.render();
    };

    this.render = () => {
        $target.appendChild($docEditPage);
    };

    const fetchDoc = async () => {
        const { id } = this.state;
        const serverDoc = await request(`/documents/${id}`, {
            method: 'GET',
        });

        const localDoc = getItem(CURRENT_DOC_KEY, {
            title: '',
            content: '',
        });
        if (localDoc.savedTime && localDoc.savedTime > serverDoc.updated_at) {
            this.setState({
                ...this.state,
                title: localDoc.title,
                content: localDoc.content,
            });

            await request(`/documents/${id}`, {
                method: 'PUT',
                body: JSON.stringify(localDoc),
            });

            removeItem(CURRENT_DOC_KEY);
        } else {
            this.setState({
                ...this.state,
                title: serverDoc.title,
                content: serverDoc.content,
            });
        }
    };
}
