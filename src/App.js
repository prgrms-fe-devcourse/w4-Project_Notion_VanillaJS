import NavPage from "/src/NavPageComponent/NavPage.js";
import EditPage from "/src/EditPageComponent/EditPage.js";
import { toggleWrap, initializeToggle } from "/src/util/toggle.js";
import { removeChildStorage, removeItem } from "/src/util/storage.js";
import {
    getDocumentById,
    deleteDocument,
    createDocument,
    updateDocumentById,
    getDocumentsList,
} from "./util/api.js";
import { pushStateUrl, getIdFromUrl, clearUrl } from "./util/router.js";
export default function App({ targetElement }) {
    const loadDocumentByUrl = async () => {
        const id = getIdFromUrl();
        if (!id) {
            editPage.setState();
            return;
        }
        const document = await getDocumentById(id);
        if (!document) {
            clearUrl();
            editPage.setState();
            return;
        }

        const nextState = {
            ...document,
            content: JSON.parse(document.content),
        };

        editPage.setState(nextState);
    };

    const onSelect = async (id) => {
        toggleWrap(id);
        pushStateUrl(id);
        loadDocumentByUrl();
    };

    const createInRoot = async () => {
        const newDocument = await createDocument();
        pushStateUrl(newDocument.id);
    };

    const createInDocument = async (id) => {
        const parentDocument = await getDocumentById(id);
        const newDocument = await createDocument(parentDocument);
        pushStateUrl(newDocument.id);
        removeChildStorage(id);
    };

    const onCreate = async (id) => {
        if (id) {
            await createInDocument(id);
            initializeToggle(id);
        } else {
            await createInRoot();
        }
        loadDocumentByUrl();
        loadDocumentsList();
    };

    const checkCurrentDocumentDeleted = (id) => {
        const currentPageDocument = getIdFromUrl();
        const isCurrentPageDeleted = currentPageDocument == id;
        if (!isCurrentPageDeleted) return;
        clearUrl();
    };

    const onDelete = async (id) => {
        const confirmation = confirm("정말 지우겠습니까?");
        if (!confirmation) {
            return;
        }
        if (id === 12835) {
            alert("🥺");
            return;
        }
        const intendedDeleteElement = document.getElementById(id);
        checkCurrentDocumentDeleted(id);
        intendedDeleteElement.remove();
        removeChildStorage(id);
        removeItem(id);
        await deleteDocument(id);
        loadDocumentsList();
        loadDocumentByUrl();
    };

    const getPayLoadData = () => {
        const title = document.querySelector(".editor-title").textContent;
        const text = document.querySelector(".editor-text").innerHTML;
        const image = document.querySelector(".editor-image").src;
        const icon = document.querySelector(".editor-header-icon").textContent;
        const data = {
            ...editPage.state,
            title,
            content: { text, image, icon },
        };
        return data;
    };
    const onSaveWithnoDebounce = async () => {
        const data = getPayLoadData();
        await updateDocumentById(data);
        loadDocumentsList();
    };

    const navPage = new NavPage({
        targetElement,
        onDelete,
        onCreate,
        onSelect,
    });
    let timer = null;
    const onSave = () => {
        if (timer !== null) clearTimeout(timer);
        timer = setTimeout(() => {
            onSaveWithnoDebounce();
        }, 500);
    };
    const editPage = new EditPage({
        targetElement,
        initialState: null,
        onSave,
        onSelect,
    });

    const loadDocumentsList = async () => {
        const nextState = await getDocumentsList();
        navPage.setState(nextState);
    };

    loadDocumentsList();
    window.addEventListener("load", () => {
        loadDocumentByUrl();
    });
    window.addEventListener("popstate", () => {
        loadDocumentByUrl();
    });
    window.addEventListener("onSaveEvent", () => {
        onSaveWithnoDebounce();
    });
}
