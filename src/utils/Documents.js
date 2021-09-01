import { request, getUserName } from "../js/api.js";
import { setItem } from "./storage.js";

// Save documents path at local storage, key is username and value is all of documents information.
export const saveDocumentsPath = async ({ pathname }) => {
    const roots = await request("/documents");

    setItem(`username_${getUserName()}`, roots);
};

// Get all documents(root and child) using DFS to display at sidebar
export const getAllDocuments = (root, documentId) => {
    if (!root.documents.length) {
        return `<li class="document" data-id="${root.id}" style="font-weight: ${
            root.id === documentId ? "bold" : "normal"
        };">${root.title}</li>`;
    }

    return `<li class="document" data-id="${root.id}" style="font-weight: ${
        root.id === documentId ? "bold" : "normal"
    };">
                ${root.title}</li>
                <ul>
                    ${root.documents.map((child) => getAllDocuments(child, documentId)).join("")}
                </ul>
            `;
};

export const getDocumentId = (pathname) => {
    if (pathname === "/") {
        return "/";
    } else if (pathname.indexOf("/documents/") === 0) {
        const [, , documentId] = pathname.split("/");
        return documentId;
    }
};
