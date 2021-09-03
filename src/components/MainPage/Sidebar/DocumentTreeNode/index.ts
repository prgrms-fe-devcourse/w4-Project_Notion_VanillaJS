import { Component } from "@/VDOM/Component";
import { div, li, button } from "@/VDOM/elements";
import { createComponent, VDOMNode } from "@/VDOM";
import { Action, Document } from "@/types";
import DocumentTree from "@/components/MainPage/Sidebar/DocumentTree";
import ChildrenVisibilityToggler from "@/components/MainPage/Sidebar/DocumentTreeNode/ChildrenVisibilityToggler";
import DocumentTitle from "@/components/MainPage/Sidebar/DocumentTreeNode/DocumentTitle";
import {
  addDocument,
  fetchDocuments,
  removeDocument,
} from "@/utils/api/documents";
import styles from "@/components/MainPage/Sidebar/DocumentTreeNode/styles.module.scss";
import DocumentsStorage from "@/utils/storage/DocumentsStorage";

interface DocumentTreeNodeState {
  isOpen: boolean;
  documentStorage: DocumentsStorage;
}
interface DocumentTreeNodeProps {
  document: Document;
  dispatcher: (action: Action) => void;
  changeRoute: (pathname: string) => void;
  currentDocumentId: string;
}

const DocumentTreeNode = createComponent(
  class extends Component<DocumentTreeNodeProps, DocumentTreeNodeState> {
    state = {
      isOpen: false,
      documentStorage: DocumentsStorage.getInstance(),
    };

    toggleOpen(event: Event) {
      this.setState((prevState) => ({
        ...prevState,
        isOpen: !prevState.isOpen,
      }));
    }

    onDocumentClick(event: Event) {
      const {
        document: { id: documentId },
        changeRoute,
      } = this.props;

      event.preventDefault();

      this.setState((prevState) => ({ ...prevState, isOpen: true }));

      changeRoute(`/documents/${documentId}`);
    }

    async onAddDocument(event: Event) {
      const {
        document: { id: documentId },
        dispatcher,
        changeRoute,
      } = this.props;

      const { id: newDocumentId } = await addDocument(documentId);

      changeRoute(`/documents/${newDocumentId}`);

      const documents = await fetchDocuments();

      dispatcher({
        type: "UPDATE_DOCUMENTS",
        payload: documents,
      });

      this.setState((prevState: DocumentTreeNodeState) => ({
        ...prevState,
        isOpen: true,
      }));
    }

    async onRemoveDocument(event: Event) {
      const {
        document: { id: documentId },
        dispatcher,
        changeRoute,
        currentDocumentId,
      } = this.props;
      const { documentStorage } = this.state;

      await removeDocument(documentId);

      documentStorage.clearDocument(currentDocumentId);

      if (currentDocumentId === `${documentId}`) {
        changeRoute("/");
      }

      const documents = await fetchDocuments();

      dispatcher({
        type: "UPDATE_DOCUMENTS",
        payload: documents,
      });

      this.setState((prevState: DocumentTreeNodeState) => ({
        ...prevState,
        isOpen: false,
      }));
    }

    render(): VDOMNode {
      const {
        document: { id, title, documents },
        dispatcher,
        currentDocumentId,
      } = this.props;

      return li({ role: "treeitem" }, [
        div(
          {
            id,
            className: `${styles.DocumentTreeNode} ${
              this.state.isOpen ? styles.open : ""
            } ${`${id}` === currentDocumentId ? styles.choose : ""}`,
          },
          [
            div({ className: `${styles.Content}` }, [
              ChildrenVisibilityToggler({
                isOpen: this.state.isOpen,
                toggleOpen: this.toggleOpen.bind(this),
              }),
              DocumentTitle({
                href: `/documents/${id}`,
                onClick: this.onDocumentClick.bind(this),
                title,
              }),
              div({}, [
                button(
                  {
                    onClick: this.onAddDocument.bind(this),
                  },
                  ["+"]
                ),
                button({ onClick: this.onRemoveDocument.bind(this) }, ["-"]),
              ]),
            ]),
          ]
        ),
        DocumentTree({
          documents,
          dispatcher,
          changeRoute: this.props.changeRoute,
          currentDocumentId,
        }),
      ]);
    }
  }
);

export default DocumentTreeNode;
