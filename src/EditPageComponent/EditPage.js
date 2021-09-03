import EditPageHeader from "./EditPageHeaderComponent/EditpageHeader.js";
import EditPageImage from "./EditPageImageComponent/EditPageImage.js";
import EditPageIcon from "./EditpageIconComponent/EditPageIcon.js";
import EditPageTitle from "./EditPageTextComponent/EditPageTitle.js";
import EditPageText from "./EditPageTextComponent/EditPageText.js";
import ChildDocuemnts from "./ChildDocumentsComponent/ChildDocuments.js";
export default function EditPage({
  targetElement,
  initialState,
  onSave,
  onSelect,
}) {
  const editPageElement = document.createElement("div");
  editPageElement.className = "edit-page";
  targetElement.appendChild(editPageElement);
  this.state = initialState;
  this.render = () => {
    if (this.state.empty) {
      editPageElement.textContent = "Empty Page";
      return;
    }
    editPageElement.textContent = "";
  };
  this.setState = (nextState) => {
    this.state = nextState || { empty: true };

    this.render();
    if (this.state.empty) return;

    editPageHeader.setState(this.state);
    editPageImage.setState(this.state.content);
    editPageIcon.setState(this.state.content);
    editPageTitle.setState(this.state);
    editPagetext.setState(this.state.content);
    childDocuemnts.setState(this.state.documents);
  };
  const changeHeader = ({
    icon = document.querySelector(".editor-icon").textContent,
    title = document.querySelector(".editor-title").textContent,
  }) => {
    const { content } = this.state;
    const nextState = { ...this.state, content: { ...content, icon }, title };
    editPageHeader.setState(nextState);
    onSave(this.state.id);
  };
  const editPageHeader = new EditPageHeader({
    targetElement: editPageElement,
    onSave,
  });
  const editPageImage = new EditPageImage({
    targetElement: editPageElement,
    onSaveImage: () => {
      const { id } = this.state;
      onSave(id);
    },
  });
  const editPageIcon = new EditPageIcon({
    targetElement: editPageElement,
    changeHeader,
  });
  const editPageTitle = new EditPageTitle({
    targetElement: editPageElement,
    onSave,
    changeHeader,
  });
  const editPagetext = new EditPageText({
    targetElement: editPageElement,
    onSave,
  });
  const childDocuemnts = new ChildDocuemnts({
    targetElement: editPageElement,
    onSave,
    onSelect,
  });
}
