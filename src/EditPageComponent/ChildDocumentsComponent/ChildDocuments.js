import ChildDocumentLink from "./ChildDocumentLink.js";
export default function ChildDocuemnts({
  targetElement,
  onSelect,
  initialState,
}) {
  const childDocuemntsElement = document.createElement("ul");
  childDocuemntsElement.className = "editor-child-document";

  this.state = initialState || [];
  this.setState = (nextState) => {
    this.state = nextState || [];
    this.render();
  };

  this.render = () => {
    childDocuemntsElement.textContent = "";
    targetElement.appendChild(childDocuemntsElement);
    this.state.forEach((child) => {
      new ChildDocumentLink({
        targetElement: childDocuemntsElement,
        initialState: child,
        onSelect,
      });
    });
  };
}
