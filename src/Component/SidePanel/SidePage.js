import { request } from "../api.js";
import { push } from "../router.js";
import { getItem, setItem } from "../storage.js";
import BookmarkList from "./BookmarkList.js";
import DocumentList from "./DocumentList.js";
import DocumentListHeader from "./DocumentListHeader.js";
import Profile from "./Profile.js";

const BOOK_MARK_LIST_KEY = "bookmark-list";
const DOCUMENT_LIST_KEY = "document-list";

export default function SidePage({ $target }) {
  const $page = document.createElement("div");
  $page.className = "side-page-container";
  $target.appendChild($page);

  this.state = [];
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  new Profile({
    $target: $page,
    init: {
      name: "minsgy",
    },
  });

  new DocumentListHeader({
    $target: $page,
    text: "즐겨찾기",
    onCreate: async () => {
      const response = await request(`/documents`, {
        method: "POST",
        body: JSON.stringify({
          title: "새로운 문서",
          parent: null,
        }),
      });
      push(`/documents/${response.id}`);
      this.render();
    },
  });

  const bookmarkList = new BookmarkList({
    $target: $page,
    init: getItem(BOOK_MARK_LIST_KEY, []),
    onSelect: async (documentId) => {
      push(`/documents/${documentId}`);
    },
    onCreate: async (documentId) => {
      const response = await request(`/documents`, {
        method: "POST",
        body: JSON.stringify({
          title: `새로운 문서`,
          parent: documentId,
        }),
      });
      push(`/documents/${response.id}`);
      this.render();
    },
    onRemove: async (documentId) => {
      if (confirm("정말로 삭제하시겠습니까 ?")) {
        await request(`/documents/${documentId}`, {
          method: "DELETE",
        });
        this.render();
      }
      return;
    },
    onBookmark: async (documentId) => {
      const response = await request(`/documents/${documentId}`);
      const nextState = [...bookmarkList.state, response];
      setItem(BOOK_MARK_LIST_KEY, nextState);
      this.render();
    },
  });

  new DocumentListHeader({
    $target: $page,
    text: "개인",
    onCreate: async () => {
      const response = await request(`/documents`, {
        method: "POST",
        body: JSON.stringify({
          title: "새로운 문서",
          parent: null,
        }),
      });
      push(`/documents/${response.id}`);
      this.render();
    },
  });

  const documentList = new DocumentList({
    $target: $page,
    init: getItem(DOCUMENT_LIST_KEY, []),
    onSelect: async (documentId) => {
      push(`/documents/${documentId}`);
    },
    onCreate: async (documentId) => {
      const response = await request(`/documents`, {
        method: "POST",
        body: JSON.stringify({
          title: `새로운 문서`,
          parent: documentId,
        }),
      });
      push(`/documents/${response.id}`);
      this.render();
    },
    onRemove: async (documentId) => {
      if (confirm("정말로 삭제하시겠습니까 ?")) {
        await request(`/documents/${documentId}`, {
          method: "DELETE",
        });
        this.render();
      }
      return;
    },
    onBookmark: async (documentId) => {
      const response = await request(`/documents/${documentId}`);
      const nextState = [...bookmarkList.state, response];

      setItem(BOOK_MARK_LIST_KEY, nextState);
      setItem(DOCUMENT_LIST_KEY);
      bookmarkList.setState(nextState);
      this.render();
    },
  });

  function diff(obj1, obj2) {
    let temp = [...obj2];
    for (let prop in obj2) {
      if (obj1.hasOwnProperty(prop)) {
        delete temp[prop];
      }
    }
    return temp;
  }

  this.render = async () => {
    const documents = await request("/documents");
    console.log(documents);
    const BookmarkFilterDocument = diff(bookmarkList.state, documents);
    documentList.setState(BookmarkFilterDocument);
    console.log(bookmarkList.state);
  };
  this.render();
}
