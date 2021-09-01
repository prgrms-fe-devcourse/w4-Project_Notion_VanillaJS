import NotionList from "./NotionList.js";
import { request } from "./Api.js";
import { push } from "./router.js";

export default function NotionPage({ $target, editDocument }) {
  const $page = document.createElement("div");

  const notionList = new NotionList({
    $target: $page,
    initialState: [],
    newDocument: (id, tagName) => {
      console.log(id, tagName);
      //Button 클릭시 document생성
      if (tagName === "BUTTON") {
        const post = {
          title: "기본값",
          parent: id,
        };
        createDocument(post);
      }
      //Li 클릭시 document 수정
      else {
        editDocument(id);
      }
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

  this.render = async () => {
    await fetchDocuments();
    $target.appendChild($page);
  };
}
