import Document from "./DocumentComponent/Document.js";
export default function DocumentsList({
  targetElement,
  initialState,
  onCreate,
  onDelete,
  onSelect,
}) {
  this.state = initialState || null;
  const documentsList = document.createElement("ul");
  documentsList.className = "document-list";
  targetElement.appendChild(documentsList);

  this.setState = (nextState) => {
    this.state = nextState || [];
    documentsList.innerHTML = "";
    buildTreeViewWithDocuments();
  };

  const buildTreeViewWithDocuments = (
    documents = this.state,
    parentElement = documentsList
  ) => {
    if (!documents) return;
    for (const childDocument of documents) {
      new Document({
        targetElement: parentElement,
        initialState: childDocument,
        onCreate,
        onDelete,
        onSelect,
      });
      recuriveBulidTreeViewWithDocuments(childDocument);
    }
  };

  const recuriveBulidTreeViewWithDocuments = (targetDocument) => {
    if (targetDocument.documents.length === 0) return;
    const childElement = document.getElementById(targetDocument.id);
    buildTreeViewWithDocuments(targetDocument.documents, childElement);
  };

  buildTreeViewWithDocuments();
}
