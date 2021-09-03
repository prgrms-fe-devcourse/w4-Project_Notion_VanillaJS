import { Component } from "@/VDOM/Component";
import { ul } from "@/VDOM/elements";
import { createComponent } from "@/VDOM";
import { Document, Action } from "@/types";
import DocumentTreeNode from "@/components/MainPage/Sidebar/DocumentTreeNode";
import DocumentTreeEmptyNode from "@/components/MainPage/Sidebar/DocumentTreeEmptyNode";
import styles from "@/components/MainPage/Sidebar/DocumentTree/styles.module.scss";

interface DocumentTreeState {}
interface DocumentTreeProps {
  documents: Document[];
  dispatcher: (action: Action) => void;
  changeRoute: (pathname: string) => void;
  currentDocumentId: string;
}

const DocumentTree = createComponent(
  class extends Component<DocumentTreeProps, DocumentTreeState> {
    render() {
      const { documents, dispatcher, changeRoute, currentDocumentId } =
        this.props;

      return documents.length
        ? ul(
            { role: "tree", className: styles.DocumentTree },
            documents.map((document) =>
              DocumentTreeNode({
                document,
                dispatcher,
                changeRoute,
                currentDocumentId,
              })
            )
          )
        : DocumentTreeEmptyNode({});
    }
  }
);

export default DocumentTree;
