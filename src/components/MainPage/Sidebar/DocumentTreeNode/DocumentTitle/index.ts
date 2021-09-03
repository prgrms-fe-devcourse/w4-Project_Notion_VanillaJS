import { Component } from "@/VDOM/Component";
import { a } from "@/VDOM/elements";
import { createComponent } from "@/VDOM";
import styles from "@/components/MainPage/Sidebar/DocumentTreeNode/DocumentTitle/styles.module.scss";

interface DocumentTitleState {}
interface DocumentTitleProps {
  href: string;
  title: string | null;
  onClick: (event: Event) => void;
}

const DocumentTitle = createComponent(
  class extends Component<DocumentTitleProps, DocumentTitleState> {
    render() {
      const { href, title, onClick } = this.props;
      return a({ className: `${styles.DocumentTitle}`, href, onClick }, [
        title || "제목 없음",
      ]);
    }
  }
);

export default DocumentTitle;
