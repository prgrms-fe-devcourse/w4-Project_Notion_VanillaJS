import UserProfile from "./UserProfile.js";
import DocumentsListTemp from "./DocumentListTemp.js";
import {
  getDocumentById,
  getDocumentsList,
  getUserName,
  deleteDocument,
  createDocument,
} from "./api.js";

export default function NavPage({ targetElement }) {
  const navContainer = document.createElement("div");
  targetElement.appendChild(navContainer);
  new UserProfile({
    targetElement: navContainer,
    initialState: getUserName(),
  });

  const onCreate = async (id) => {
    const parentDocument = await getDocumentById(id);
    await createDocument(parentDocument);
    refreshDocumentsList();
  };
  const onDelete = async (id) => {
    const intendedPreDelete = document.getElementById(id);
    intendedPreDelete.remove();
    await deleteDocument(id);
    await refreshDocumentsList();
  };

  const documentsList = new DocumentsListTemp({
    targetElement: navContainer,
    initialState: null,
    onCreate,
    onDelete,
  });

  const refreshDocumentsList = async () => {
    const nextState = await getDocumentsList();
    documentsList.setState(nextState);
  };
  refreshDocumentsList();
}
