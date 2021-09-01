import ADDInDocumentButton from "./AddInDocumentButton.js";
import DeleteButton from "./DeleteButton.js";
import { getItem } from "./storage.js";
export default function Document({
  targetElement,
  initialState,
  onCreate,
  onDelete,
  onSelect,
}) {
  const documentElement = document.createElement("ul");
  targetElement.appendChild(documentElement);
  this.state = initialState || null;
  const { id } = this.state;
  documentElement.id = this.state.id;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.render = () => {
    const documentElementClass = getItem(this.state.id, "");
    documentElement.innerText = this.state.title;
    documentElement.className = documentElementClass;
  };
  this.render();

  new DeleteButton({
    targetElement: documentElement,
    initialState: id,
    onDelete,
  });
  new ADDInDocumentButton({
    targetElement: documentElement,
    initialState: id,
    onCreate,
  });

  documentElement.addEventListener("click", () => {
    event.stopPropagation(documentElement);
    onSelect(id);
  });
}
