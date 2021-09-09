import { request } from "./api.js";
import Editor from "./Editor.js";
import { push } from "./router.js";

export default function NotionEditPage({ $target, initialState }) {
    const $page = document.createElement("div");
    $page.className = "edit_page";
    this.state = initialState;

    const doc = this.state.doc;

    let timer = null;

    const editor = new Editor({
        $target: $page,
        initialState: doc,
        onEditing: (doc) => {
            if (timer !== null) {
                clearTimeout(timer);
            }
            timer = setTimeout(async () => {
                const docId = doc.id;
                alert("저장되었습니다.");
                await request(`/documents/${docId}`, {
                    method: "PUT",
                    body: JSON.stringify(doc)
                })
                push(`/documents/${docId}`);
                this.setState({
                    documentId: docId
                })
            }, 2500)
        }
    });

    this.setState = async (nextState) => {
        if (this.state.documentId !== nextState.documentId) {
            this.state = nextState;
            await fetchDoc();
            return;
        }

        this.state = nextState;
        this.render();
        editor.setState(this.state.doc || {
            title: "",
            content: ""
        });
    }

    this.render = () => {
        $target.appendChild($page);
    }

    const fetchDoc = async () => {
        const { documentId } = this.state;
        if (documentId) {
            const doc = await request(`/documents/${documentId}`)
            const $li = document.querySelector(`li[data-id="${documentId}"]>span`);
            $li.className = "disabled";
            this.setState({
                ...this.state,
                doc
            })
        }
    }
}
