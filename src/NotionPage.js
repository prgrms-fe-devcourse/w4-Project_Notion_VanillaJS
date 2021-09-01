import NotionList from "./NotionList.js";
import { request } from "./Api.js";
import { push } from "./router.js";

export default function NotionPage({ $target, editDocument }) {
  const $page = document.createElement("div");

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
        await createDocument(post);

        const selectedDocumentId = await selectedDocument(id);
        editDocument(selectedDocumentId);
        await fetchDocuments();
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
      await fetchDocuments();
    },
  });

  const fetchDocuments = async () => {
    const posts = await request("/documents");
    notionList.setState(posts);
  };

  const createDocument = async (post) => {
    await request("/documents", {
      method: "POST",
      body: JSON.stringify(post),
    });

    await fetchDocuments();
  };

  //새로운 document id값 찾기
  const selectedDocument = async (id) => {
    const post = await request(`/documents/${id}`);
    const newDocumentId = post.documents.length;
    return parseInt(post?.documents[newDocumentId - 1].id);
  };

  this.render = async () => {
    await fetchDocuments();
    $target.appendChild($page);
  };
}
