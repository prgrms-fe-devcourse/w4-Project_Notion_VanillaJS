import { request } from "./api.js";
import NotionEditPage from "./NotionEditPage.js";
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
                parent: parentId
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
            const currentUrl = document.location.href;
            const currentId = currentUrl.substring(currentUrl.lastIndexOf("/") + 1);
            const nextId = id;
            if (currentId !== nextId) {
                push(`/documents/${id}`);
            } else {
                push(`/documents/`);
            }
        }
    });

    const notionEditPage = new NotionEditPage({
        $target, initialState: {
            documentId: "new",
            parentId: null,
            doc: {
                title: "",
                content: ""
            }
        }
    })

    this.setState = async () => {
        const { pathname } = window.location;
        const [, , documentId] = pathname.split("/");
        const documents = await request("/documents");
        notionList.setState(documents);
        if (pathname.indexOf("/documents/") === 0) {
            notionEditPage.setState({ documentId });
        }
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
