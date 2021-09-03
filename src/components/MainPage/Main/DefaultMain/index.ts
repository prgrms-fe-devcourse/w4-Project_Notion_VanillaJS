import { Component } from "@/VDOM/Component";
import { div } from "@/VDOM/elements";
import { createComponent } from "@/VDOM";
import styles from "@/components/MainPage/Main/DefaultMain/styles.module.scss";

interface DefaultMainProps {}
interface DefaultMainState {}

const DefaultMain = createComponent(
  class extends Component<DefaultMainProps, DefaultMainState> {
    render() {
      return div({ className: `${styles.DefaultMain}` }, [
        "문서를 선택해주세요.",
      ]);
    }
  }
);

export default DefaultMain;
