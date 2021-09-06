import { Component } from "@/VDOM/Component";
import { main } from "@/VDOM/elements";
import { createComponent } from "@/VDOM";
import DocumentEditor from "@/components/MainPage/Main/DocumentEditor";
import DefaultMain from "@/components/MainPage/Main/DefaultMain";
import { Document } from "@/types";
import styles from "@/components/MainPage/Main/styles.module.scss";

interface MainState {}
interface MainProps {
  currentDocumentId: string;
  setDocuments: (documents: Document[]) => void;
}

const Main = createComponent(
  class extends Component<MainProps, MainState> {
    render() {
      const { currentDocumentId, setDocuments } = this.props;
      return main(
        {
          className: styles.Main,
        },
        [
          currentDocumentId
            ? DocumentEditor({
                currentDocumentId,
                setDocuments,
              })
            : DefaultMain({}),
        ]
      );
    }
  }
);

export default Main;
