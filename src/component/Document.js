export default function Document(doc) {
  const { id, title, documents } = doc;

  return /*html*/ `
  <ul data-id=${id}>
    <li><button>열기</button>${title}<button>추가</button></li>
    <li>${
      documents.length === 0
        ? "Add a Page"
        : documents.map((document) => Document(document)).join("")
    }</li>
  </ul>`;
}
