import Sidebar from "./component/Sidebar.js";
import EditorPage from "./component/EditorPage.js";
import { getDocument } from "./api/api.js";
import { initRouter } from "./router.js";

export default function App({ $target }) {
  new Sidebar({
    $target,
    onCeatedDocument: async (createdInfo) => {
      // createdInfo 생성
      // data-set{ id: 'id',title: '문서 제목', createdAt: '생성된 날짜', updatedAt: '수정된 날짜' }
      const { id } = createdInfo;
      // nextState 생성
      // data-set { id: 1, title: "노션을 만들자", content: "즐거운 자바스크립트의 세계!", documents: []};
      const nextState = await getDocument(id);
      editPage.setState(nextState);
    },
  });

  const editPage = new EditorPage({
    $target,
    initialState: { id: "", title: "", content: "" },
  });

  this.render = () => {};

  // this.route = async () => {
  // const { pathname } = window.location;
  // if (pathname === "/") {
  //   sidebar.setState();
  // } else if (pathname.indexOf("/document/") === 0) {
  //   const [, , id] = pathname.split("/");
  //   const nextState = await getDocument(id);
  //   editPage.setState(nextState);
  // }
  // };

  // this.route();

  // initRouter(() => this.route());
}
