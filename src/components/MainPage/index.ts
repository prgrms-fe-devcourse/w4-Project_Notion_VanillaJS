import { Component } from "@/VDOM/Component";
import { div } from "@/VDOM/elements";
import { createComponent } from "@/VDOM";
import { Document, Action } from "@/types";
import { identity } from "@/utils";
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

const documentsDispatcher =
  (dispatch: (updater: (prevState: MainPageState) => MainPageState) => void) =>
  (action: Action): void => {
    switch (action.type) {
      case "UPDATE_DOCUMENTS": {
        const documents = action.payload;
        dispatch((prevState) => ({
          ...prevState,
          documents,
        }));
        break;
      }
      default: {
        dispatch(identity);
      }
    }
  };

const MainPage = createComponent(
  class extends Component<MainPageProps, MainPageState> {
    state = {
      documents: [],
      dispatcher: documentsDispatcher(this.setState.bind(this)),
    };

    async componentDidMount() {
      const { dispatcher } = this.state;
      const documents = await fetchDocuments();
      dispatcher({ type: "UPDATE_DOCUMENTS", payload: documents });
    }

    convertPathToDocumentId(currentPath: string) {
      const route = currentPath.split("/");
      return route[route.length - 1];
    }

    render() {
      const { currentPath, changeRoute } = this.props;
      const { documents, dispatcher } = this.state;
      const currentDocumentId = this.convertPathToDocumentId(currentPath);

      return div({ className: styles.MainPage }, [
        Sidebar({
          changeRoute,
          dispatcher,
          documents,
          currentDocumentId,
        }),
        Main({
          currentDocumentId,
          dispatcher,
        }),
      ]);
    }
  }
);

export default MainPage;
