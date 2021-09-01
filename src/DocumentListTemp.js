import Document from "./Document.js";
export default function DocumentsListTemp({
  targetElement,
  initialState,
  onCreate,
  onDelete,
}) {
  this.state = initialState || null;
  const documentsList = document.createElement("ul");
  targetElement.appendChild(documentsList);

  this.setState = (nextState) => {
    if (!nextState) return;
    this.state = nextState;
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
