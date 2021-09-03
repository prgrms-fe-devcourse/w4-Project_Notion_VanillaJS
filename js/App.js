import NotionPage from "./NotionPage.js";
import NotionEditPage from "./NotionEditPage.js";
import { initRouter } from "./router.js";

export default function App({ $target }) {
    const notionPage = new NotionPage({ $target });

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

    this.route = async () => {
        $target.innerHTML = "";
        const { pathname } = window.location;

        if (pathname === "/") {
            notionPage.setState();
        } else if (pathname.indexOf("/documents/") === 0) {
            const [, , documentId] = pathname.split("/");
            notionPage.setState();
            notionEditPage.setState({ documentId });

        }
    }
    this.route();

    initRouter(() => this.route());
}
