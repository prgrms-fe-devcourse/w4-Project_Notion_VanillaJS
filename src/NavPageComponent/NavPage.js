import UserProfile from "./UserProfile.js";
import DocumentsList from "./DocumentsListComponent/DocumentsList.js";
import AddInRootButton from "./AddInRootButton.js";
import { getUserName } from "../util/api.js";

export default function NavPage({
  targetElement,
  onCreate,
  onDelete,
  onSelect,
}) {
  const navElement = document.createElement("div");
  navElement.classList.add("nav-page");
  targetElement.appendChild(navElement);

  this.setState = (nextState) => {
    this.state = nextState || null;
    documentsList.setState(this.state);
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

  new AddInRootButton({
    targetElement: navElement,
    onCreate,
  });
}
