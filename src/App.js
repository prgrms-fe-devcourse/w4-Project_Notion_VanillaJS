import Sidebar from "./Sidebar.js";
import ContentSection from "./ContentSection.js";
import { request } from "./api.js";
import { initRouter } from "./router.js";

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