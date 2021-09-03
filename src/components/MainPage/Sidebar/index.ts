import { Component } from "@/VDOM/Component";
import { aside } from "@/VDOM/elements";
import { createComponent } from "@/VDOM";
import { Document, Action } from "@/types";
import styles from "@/components/MainPage/Sidebar/styles.module.scss";

interface SidebarProps {
  changeRoute: (pathname: string) => void;
  dispatcher: (action: Action) => void;
  documents: Document[];
  currentDocumentId: string;
}
interface SidebarState {}

const Sidebar = createComponent(
  class extends Component<SidebarProps, SidebarState> {
    render() {
      const { dispatcher, changeRoute, documents, currentDocumentId } =
        this.props;
      return aside({ className: styles.Sidebar }, []);
    }
  }
);

export default Sidebar;
