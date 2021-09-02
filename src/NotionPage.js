import NotionList from "./NotionList.js";
import { request } from "./Api.js";
import { push } from "./router.js";

export default function NotionPage({ $target, editDocument, reset }) {
  const $page = document.createElement("div");
  $page.className = "notionPage";
  const notionList = new NotionList({
    $target: $page,
    initialState: [],

    //새로운 documemt 생성 후 생성된 id값을 찾아서 리턴
    newDocument: async (id, className) => {
      //Button 클릭시 document생성
      if (className === "plus") {
        const post = {
          title: "기본값",
          parent: id,
        };
        const newDocumentId = await fetchNewDocument(post);
        await editDocument(newDocumentId.id);
      }
      //Li 클릭시 document 수정
      else {
        editDocument(id);
      }
    },

    onRemove: async (id) => {
      await request(`/documents/${id}`, {
        method: "DELETE",
      });

      history.pushState(null, null, "/");
      reset();
    },
  });

  const fetchDocuments = async () => {
    const posts = await request("/documents");
    notionList.setState(posts);
  };

  const fetchNewDocument = async (post) => {
    const newDocument = await request("/documents", {
      method: "POST",
      body: JSON.stringify(post),
    });

    return await newDocument;
  };

  this.render = async () => {
    await fetchDocuments();
    $target.appendChild($page);
  };
}
