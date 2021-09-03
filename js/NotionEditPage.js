import { request } from "./api.js";
import Editor from "./Editor.js";
import { getItem, removeItem, setItem } from "./storage.js";
import { push } from "./router.js";

export default function NotionEditPage({ $target, initialState }) {
    const $page = document.createElement("div");
    this.state = initialState;
    let docLocalSaveKey = `temp-notion-${this.state.documentId}`;

    const doc = getItem(docLocalSaveKey, {
        title: "새 항목",
        content: ""
    });

    let timer = null;

    const editor = new Editor({
        $target: $page,
        initialState: doc,
        onEditing: (doc) => {
            if (timer !== null) {
                clearTimeout(timer);
            }
            timer = setTimeout(async () => {
                setItem(docLocalSaveKey, {
                    ...doc,
                    tempSaveDate: new Date()
                });

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
                removeItem(docLocalSaveKey);
            }, 2000)
        }
    });

    this.setState = async (nextState) => {
        if (this.state.documentId !== nextState.documentId) {
            docLocalSaveKey = `temp-notion-${nextState.documentId}`;
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

            const tempDoc = getItem(docLocalSaveKey, {
                title: "",
                content: ""
            });

            if (tempDoc.tempSaveDate && tempDoc.tempSaveDate > doc.updated_at) {
                if (confirm("저장되지 않은 임시 데이터가 있습니다. 불러올까요?")) {
                    this.setState({
                        ...this.state,
                        doc: tempDoc
                    })
                    return;
                }
            }

            this.setState({
                ...this.state,
                doc
            })
        }
    }
}
