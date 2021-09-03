import { Component } from "@/VDOM/Component";
import { div, textarea } from "@/VDOM/elements";
import { createComponent } from "@/VDOM";
import styles from "@/components/MainPage/Main/DocumentEditor/DocumentTitleEditor/styles.module.scss";
interface DocumentTitleEditorProps {
  value: string | null;
  onKeyUp: (event: Event) => void;
}
interface DocumentTitleEditorState {}

const DocumentTitleEditor = createComponent(
  class extends Component<DocumentTitleEditorProps, DocumentTitleEditorState> {
    render() {
      const { value, onKeyUp } = this.props;
      return div({ className: `${styles.DocumentTitleEditor}` }, [
        textarea({ value, onKeyUp, placeholder: "제목 없음" }, []),
      ]);
    }
  }
);

export default DocumentTitleEditor;
