import Sidebar from "./component/SidebarPage/Sidebar.js";
import EditorPage from "./component/EditorPage/EditorPage.js";
import { getDocument } from "./utils/api.js";
import { initRouter } from "./utils/router.js";

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
  });

  this.state = { id: "", title: "", content: "" };

  this.setState = async (id) => {
    const nextState = await getDocument(id);
    this.state = nextState;

    editPage.setState(this.state);
  };

  initRouter((id) => this.setState(id));
}
