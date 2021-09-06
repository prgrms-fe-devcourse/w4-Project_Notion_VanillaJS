import { Component } from "@/VDOM/Component";
import { div } from "@/VDOM/elements";
import { createComponent } from "@/VDOM";
import { Document } from "@/types";
import { fetchDocuments } from "@/utils/api/documents";
import Sidebar from "@/components/MainPage/Sidebar";
import Main from "@/components/MainPage/Main";
import styles from "@/components/MainPage/styles.module.scss";

interface MainPageProps {
  currentPath: string;
  changeRoute: (pathname: string) => void;
}
interface MainPageState {
  documents: Document[];
}

const MainPage = createComponent(
  class extends Component<MainPageProps, MainPageState> {
    state = {
      documents: [],
    };

    async componentDidMount() {
      const documents = await fetchDocuments();
      this.setDocuments(documents);
    }

    setDocuments(documents: Document[]) {
      this.setState((prevState) => ({ ...prevState, documents }));
    }

    convertPathToDocumentId(currentPath: string) {
      const route = currentPath.split("/");
      return route[route.length - 1];
    }

    render() {
      const { currentPath, changeRoute } = this.props;
      const { documents } = this.state;
      const currentDocumentId = this.convertPathToDocumentId(currentPath);

      return div({ className: styles.MainPage }, [
        Sidebar({
          changeRoute,
          setDocuments: this.setDocuments.bind(this),
          documents,
          currentDocumentId,
        }),
        Main({
          currentDocumentId,
          setDocuments: this.setDocuments.bind(this),
        }),
      ]);
    }
  }
);

export default MainPage;
