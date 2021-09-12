import Editor from "./Editor.js";
import { request } from "./api.js";
import SubDocsList from "./SubDocsList.js";

export default function DocsEditPage({ $target, initialState }) {
    const $page = document.createElement('div');
    $page.className = 'edit-page';

    this.state = initialState;

    this.setState = async nextState => {
        if (this.state.docId !== nextState.docId) {
            this.state = nextState;

            await fetchEachDoc(); 

            this.render();

            return;
        }

        this.state = nextState;
        
        editor.setState(this.state.docInfo);
                
        subDocsList.setState(this.state.docInfo);
    }

    let timer = null;

    const editor = new Editor({
        $target: $page,
        onEditing: (docInfo) => {
            if (timer !== null) {
                clearTimeout(timer);
            }

            timer = setTimeout(async () => {
                await request(`/documents/${docInfo.id}`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        "title": docInfo.title,
                        "content": docInfo.content
                    })
                });
            }, 1000);
        }
    });

    const subDocsList = new SubDocsList({
        $target: $page,
        initialState: this.state.docInfo
    });

    this.render = () => {
        $target.appendChild($page);
    }

    const fetchEachDoc = async () => {
        const { docId } = this.state;

        if (this.state.docId !== '') {
            const docInfo = await request(`/documents/${docId}`);

            this.setState({
                ...this.state,
                docInfo
            });
        }
    }
}
