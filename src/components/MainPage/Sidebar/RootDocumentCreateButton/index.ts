import { Component } from "@/VDOM/Component";
import { div } from "@/VDOM/elements";
import { createComponent, VDOMNode } from "@/VDOM";
import { Action } from "@/types";
import { addDocument, fetchDocuments } from "@/utils/api/documents";
import styles from "@/components/MainPage/Sidebar/RootDocumentCreateButton/styles.module.scss";

interface RootDocumentCreateButtonState {}
interface RootDocumentCreateButtonProps {
  changeRoute: (pathname: string) => void;
  dispatcher: (action: Action) => void;
}

const RootDocumentCreateButton = createComponent(
  class extends Component<
    RootDocumentCreateButtonProps,
    RootDocumentCreateButtonState
  > {
    async onAddDocument(event: Event) {
      const { dispatcher, changeRoute } = this.props;
      const { id: newDocumentId } = await addDocument();
      changeRoute(`/documents/${newDocumentId}`);
      const documents = await fetchDocuments();
      dispatcher({ type: "UPDATE_DOCUMENTS", payload: documents });
    }

    render(): VDOMNode {
      return div(
        {
          className: `${styles.RootDocumentCreateButton}`,
          role: "button",
          onClick: this.onAddDocument.bind(this),
        },
        [div({ className: `${styles.CreateIcon}` }, ["+"]), "새로운 문서 추가"]
      );
    }
  }
);

export default RootDocumentCreateButton;