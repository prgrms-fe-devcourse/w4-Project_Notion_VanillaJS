import ADDInDocumentButton from "./AddInDocumentButton.js";
import DeleteButton from "./DeleteButton.js";
export default function Document({
  targetElement,
  initialState,
  onCreate,
  onDelete,
}) {
  const documentElement = document.createElement("ul");
  targetElement.appendChild(documentElement);
  this.state = initialState || null;

  documentElement.id = this.state.id;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.render = () => {
    documentElement.innerText = this.state.title;
  };
  this.render();

  new DeleteButton({
    targetElement: documentElement,
    initialState: this.state.id,
    onDelete,
  });
  new ADDInDocumentButton({
    targetElement: documentElement,
    initialState: this.state.id,
    onCreate,
  });
}
