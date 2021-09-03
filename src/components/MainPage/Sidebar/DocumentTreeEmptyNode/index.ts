import { Component } from "@/VDOM/Component";
import { div } from "@/VDOM/elements";
import { createComponent } from "@/VDOM";

import styles from "@/components/MainPage/Sidebar/DocumentTreeEmptyNode/styles.module.scss";

interface DocumentTreeEmptyNodeProps {}
interface DocumentTreeEmptyNodeState {}

const DocumentTreeEmptyNode = createComponent(
  class extends Component<
    DocumentTreeEmptyNodeProps,
    DocumentTreeEmptyNodeState
  > {
    render() {
      return div({ className: `${styles.DocumentTreeEmptyNode}` }, [
        "하위 문서가 없습니다.",
      ]);
    }
  }
);

export default DocumentTreeEmptyNode;
