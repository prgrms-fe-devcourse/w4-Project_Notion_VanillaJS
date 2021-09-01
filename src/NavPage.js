import UserProfile from "./UserProfile.js";
import DocumentsList from "./DocumentsList.js";
import AddInRootButton from "./AddInRootButton.js";
import {
  getDocumentById,
  getDocumentsList,
  getUserName,
  deleteDocument,
  createDocument,
} from "./api.js";
import { toggleWrap, initializeToggle } from "./toggle.js";
import { removeStorage } from "./storage.js";

export default function NavPage({ targetElement }) {
  const navElement = document.createElement("div");
  navElement.classList.add("nav-page");
  targetElement.appendChild(navElement);
  const onCreateInDocument = async (id) => {
    const parentDocument = await getDocumentById(id);
    createDocument(parentDocument);
  };
  const onSelect = async (id) => {
    toggleWrap(id);
  };
  const onCreateInRoot = () => {
    createDocument();
  };
  const onCreate = async (id) => {
    if (id) {
      await onCreateInDocument(id);
      initializeToggle(id);
    } else {
      await onCreateInRoot();
    }
    refreshDocumentsList();
  };

  const onDelete = async (id) => {
    const intendedPreDelete = document.getElementById(id);
    intendedPreDelete.remove();
    removeStorage(id);
    await deleteDocument(id);
    await refreshDocumentsList();
  };

  const refreshDocumentsList = async () => {
    const nextState = await getDocumentsList();
    documentsList.setState(nextState);
  };
  new UserProfile({
    targetElement: navElement,
    initialState: getUserName(),
  });

  const documentsList = new DocumentsList({
    targetElement: navElement,
    initialState: null,
    onCreate,
    onDelete,
    onSelect,
  });

  refreshDocumentsList();

  new AddInRootButton({
    targetElement: navElement,
    onCreate,
  });
}
