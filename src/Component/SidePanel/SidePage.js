import { request } from "../api.js";
import { push } from "../router.js";
import DocumentList from "./DocumentList.js";
import DocumentListHeader from "./DocumentListHeader.js";
import Profile from "./Profile.js";

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
    init: [],
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
  });
  this.render = async () => {
    const documents = await request("/documents");
    documentList.setState(documents);
  };
  this.render();
}
