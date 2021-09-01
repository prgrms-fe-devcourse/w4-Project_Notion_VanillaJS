export default function ChildDocumentLink({
  targetElement,
  initialState,
  onSelect,
}) {
  const childDocumentLink = document.createElement("li");
  childDocumentLink.className = "editor-child-document";
  this.state = initialState || { title: "" };

  this.render = () => {
    const { title } = this.state;
    childDocumentLink.textContent = title;
    targetElement.appendChild(childDocumentLink);
  };

  this.render();
  childDocumentLink.addEventListener("click", () => {
    const { id } = this.state;
    onSelect(id);
  });
}
