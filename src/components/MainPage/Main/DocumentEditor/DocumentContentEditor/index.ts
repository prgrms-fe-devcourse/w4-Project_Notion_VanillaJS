import { Component } from "@/VDOM/Component";
import { div, textarea } from "@/VDOM/elements";
import { createComponent } from "@/VDOM";
import styles from "@/components/MainPage/Main/DocumentEditor/DocumentContentEditor/styles.module.scss";

interface DocumentContentEditorProps {
  value: string | null;
  onKeyUp: (event: Event) => void;
}
interface DocumentContentEditorState {}

const DocumentContentEditor = createComponent(
  class extends Component<
    DocumentContentEditorProps,
    DocumentContentEditorState
  > {
    render() {
      const { value, onKeyUp } = this.props;
      return div({ className: styles.DocumentContentEditor }, [
        textarea({ value, onKeyUp, placeholder: "내용 없음" }, []),
      ]);
    }
  }
);

export default DocumentContentEditor;
