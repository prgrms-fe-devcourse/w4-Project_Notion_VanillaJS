import { Component } from "@/VDOM/Component";
import { aside } from "@/VDOM/elements";
import { createComponent } from "@/VDOM";
import { Document } from "@/types";
import styles from "@/components/MainPage/Sidebar/styles.module.scss";
import RootDocumentCreateButton from "@/components/MainPage/Sidebar/RootDocumentCreateButton";
import DocumentTree from "@/components/MainPage/Sidebar/DocumentTree";

interface SidebarProps {
  changeRoute: (pathname: string) => void;
  setDocuments: (documents: Document[]) => void;
  documents: Document[];
  currentDocumentId: string;
}
interface SidebarState {}

const Sidebar = createComponent(
  class extends Component<SidebarProps, SidebarState> {
    render() {
      const { setDocuments, changeRoute, documents, currentDocumentId } =
        this.props;
      return aside({ className: styles.Sidebar }, [
        DocumentTree({
          documents,
          changeRoute,
          setDocuments,
          currentDocumentId,
        }),
        RootDocumentCreateButton({ setDocuments, changeRoute }),
      ]);
    }
  }
);

export default Sidebar;
