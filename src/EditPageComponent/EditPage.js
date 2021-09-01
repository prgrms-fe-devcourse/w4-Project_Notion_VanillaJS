import EditPageHeader from "/src/EditPageComponent/EditPageHeaderComponent/EditpageHeader.js";
import EditPageImage from "../EditPageImageComponent/EditPageImage.js";
import EditPageIcon from "../EditpageIconComponent/EditPageIcon.js";
import EditPageTitle from "./EditPageTitle.js";
import EditPageText from "./EditPageText.js";
import ChildDocuemnts from "./ChildDocumentsComponent/ChildDocuments.js";
export default function EditPage({
  targetElement,
  initialState,
  onSave,
  onSelect,
}) {
  const editPageElement = document.createElement("div");
  targetElement.appendChild(editPageElement);
  this.state = initialState;
  this.render = () => {
    if (!this.state.title) {
      editPageElement.textContent = "빈문서입니다.";
      return;
    }
    editPageElement.textContent = "";
  };
  this.setState = (nextState) => {
    this.state = nextState || {
      title: null,
      content: "",
      content: "",
      documents: [],
    };

    this.render();
    editPageHeader.setState(this.state);
    editPageImage.setState(this.state.content);
    editPageIcon.setState(this.state.content);
    editPageTitle.setState(this.state);
    editPagetext.setState(this.state.content);
    childDocuemnts.setState(this.state.documents);
  };
  const changeHeaderIcon = (icon) => {
    const { content } = this.state;
    const nextState = { ...this.state, content: { ...content, icon } };
    console.log(nextState);
    editPageHeader.setState(nextState);
    onSave(this.state.id);
  };
  const editPageHeader = new EditPageHeader({
    targetElement: editPageElement,
    onSave,
  });
  const editPageImage = new EditPageImage({
    targetElement: editPageElement,
    onSave,
  });
  const editPageIcon = new EditPageIcon({
    targetElement: editPageElement,
    changeHeaderIcon,
  });
  const editPageTitle = new EditPageTitle({
    targetElement: editPageElement,
    onSave,
    changeHeader: (id) => {
      editPageHeader.changetext(id);
    },
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
