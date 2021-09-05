import { request, getUserName } from "../js/api.js";
import { getItem, setItem } from "./storage.js";

// *****************************
// * Valuables and Functions   *
// *****************************

const isSameId = (rootId, documentId) => (rootId === documentId ? true : false);

const findPath = (currentDocument, targetDocumentId, savedPath) => {
    if (currentDocument.id === targetDocumentId) {
        savedPath.push(currentDocument.title);
        setItem(`path_${getUserName()}`, savedPath);

        return true;
    }

    if (currentDocument.documents) {
        currentDocument.documents.forEach(({ title, documents }) => {
            savedPath.push(title);
            if (findPath(documents, targetDocumentId, savedPath)) {
                return true;
            }
            savedPath.pop();
        });
    }
};

// Save documents path to local storage, key is username and value is all of documents information.
export const saveDocumentsPathToLS = async () => {
    const roots = await request("/documents");

    setItem(`username_${getUserName()}`, roots);
};

// Get all documents(root and child) using DFS to display at sidebar.
export const getAllDocuments = (root, documentId) => {
    if (!root.documents.length) {
        return `<li class="document" data-id="${root.id}" ${
            isSameId(root.id, documentId)
                ? `style="font-weight: bold; background-color: rgba(55, 53, 47, 0.08);"`
                : ""
        }>
                    ${root.title}
                    <img src="/src/image/add.png" class="add-document" >
                    <img src="/src/image/delete.png" class="delete-document">
                </li>`;
    }

    return `<li class="document" data-id="${root.id}" ${
        isSameId(root.id, documentId)
            ? `style="font-weight: bold; background-color: rgba(55, 53, 47, 0.08);"`
            : ""
    }>
                    <img src="/src/image/arrow.png" class="rootDocument">
                    ${root.title}
                    <img src="/src/image/add.png" class="add-document" >
                    <img src="/src/image/delete.png" class="delete-document">
                <ul class="childDocument">
                    ${root.documents.map((child) => getAllDocuments(child, documentId)).join("")}
                </ul>
            </li>
            `;
};

// Parse URL to get ID of document.
export const getDocumentId = (pathname) => {
    if (pathname === "/") {
        return "/";
    } else if (pathname.indexOf("/documents/") === 0) {
        const [, , documentId] = pathname.split("/");
        return documentId;
    }
};

// Add New Document
export const addNewDocument = async (documentId) => {
    const newDocument = await request("/documents", {
        method: "POST",
        body: JSON.stringify({
            title: "제목없음",
            parent: `${documentId}`,
        }),
    });

    await saveDocumentsPathToLS();
    return newDocument.id;
};

// Update Title and Content of Document
export const updateDocument = async (documentId, title, content) => {
    const updateDocument = await request(`/documents/${documentId}`, {
        method: "PUT",
        body: JSON.stringify({
            title,
            content,
        }),
    });

    await saveDocumentsPathToLS();
};

// Delete Document
export const deleteDocument = async (documentId) => {
    const deleteDocument = await request(`/documents/${documentId}`, {
        method: "DELETE",
    });

    await saveDocumentsPathToLS();
};

// Get Current Document Path
export const getCurrentDocumentPath = (targetDocumentId) => {
    const documents = getItem(`username_${getUserName()}`, []);

    documents.forEach((root) => {
        if (findPath(root, targetDocumentId, [root.title])) {
            // console.log(root);
            return;
        }
    });
};
