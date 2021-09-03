import Sidebar from "./Sidebar.js";
import Editor from "./Editor.js";
import ContentSection from "./ContentSection.js";
import { request } from "./api.js";
import { initRouter } from "./router.js";


// isInit div contenteditable

export default function App({ $target }) {
  const userName = 'yunjinim';

  const getDocList = async () => {
    return await request(userName, 'documents', {
      method: 'GET'
    });
  }

  const sidebar = new Sidebar({ 
    $target,
    userName,
    data: getDocList
  });

  const contentSection = new ContentSection({
    $target,
    userName,
    id: null
  });

  // const getDoc = async (id) => {
  //   return await request(userName, `documents/${id}`, {
  //     method: 'GET'
  //   });
  // }

  // let timer = null;

  // const editor = new Editor({
  //   $target: $contentSection,
  //   initialState: {
  //     id: null,
  //     title: "",
  //     content: "",
  //     documents: []
  //   },
  //   onEditing: (doc) => {
  //     if (timer !== null) {
  //       clearTimeout(timer);
  //     }

  //     timer = setTimeout(async () => {
  //       await request(userName, `documents/${doc.id}`, {
  //         method: 'PUT',
  //         body: JSON.stringify({
  //           title: doc.title,
  //           content: doc.content
  //         })
  //       })
  //     }, 3000);
  //   }
  // });

  this.route = async () => {
    const { pathname } = window.location;

    if (pathname.indexOf('/documents/') === 0) {
      const [, , docId] = pathname.split('/');
      contentSection.setState({
        $target,
        userName,
        id: docId
      });

    } else if (pathname === '/') {
      contentSection.setState({
        $target,
        userName,
        id: null
      });
    }
  }

  this.route();

  initRouter(() => this.route());
}