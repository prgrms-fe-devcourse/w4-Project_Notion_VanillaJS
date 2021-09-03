import { request } from "./api.js";
import NotionList from "./NotionList.js";
import { push } from "./router.js";

export default function NotionPage({ $target }) {
    const $page = document.createElement("div");

    const notionList = new NotionList({
        $target: $page,
        initialState: [],
        onAdd: async (parentId) => {
            const doc = {
                title: "새 항목",
                parent: parentId,
            };
            const createdDoc = await fetchDoc(doc);
            push(`/documents/${createdDoc.id}`);
        },
        onRemove: async (id) => {
            await request(`/documents/${id}`, {
                method: "DELETE",
            });
            push('/');
        },
        onDocClick: (id) => {
            push(`/documents/${id}`);
        },
        documentData: {}
    });

    this.setState = async () => {
        const documents = await request("/documents");
        notionList.setState(documents);
        this.render();
    }

    const fetchDoc = async (doc) => {
        return await request("/documents", {
            method: "POST",
            body: JSON.stringify(doc),
        });
    }

    this.render = () => {
        $target.appendChild($page);
    }
}
