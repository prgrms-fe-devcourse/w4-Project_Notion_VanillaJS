export default function getDocument(doc) {
  const { id, title, documents } = doc;

  return /*html*/ `
  <ul id = 'document-${id}'>
    <div><button class="openClose-btn">열기</button>${title}<button class="add-btn">추가</button></div>
    <li style="display: none">${
      documents.length === 0
        ? "Add a Page"
        : documents.map((document) => getDocument(document)).join("")
    }</li>
  </ul>`;
}
