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

    const keyBy = id => `current-doc-${id}`;

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
            timer = (id => {setTimeout(() => {
                setItem(keyBy(id), {
                    ...nextDoc,
                    savedTime: new Date(),
                });
            }, 1000)})(this.state.id);

            // 10초에 한번꼴로 서버에 저장
            (id=>{setTimeout(async () => {
                await request(`/documents/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify(nextDoc),
                });

                removeItem(keyBy(id));
            }, 3000)})(this.state.id);
        },
    });

    this.setState = async (nextState) => {
        // App을 통해서 setState를 하는 경우, fetchDoc은 필수 진행
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

        const localDoc = getItem(keyBy(id), {
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
