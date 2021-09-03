import { Component } from "@/VDOM/Component";
import { main } from "@/VDOM/elements";
import { createComponent } from "@/VDOM";
import DocumentEditor from "@/components/MainPage/Main/DocumentEditor";
import DefaultMain from "@/components/MainPage/Main/DefaultMain";
import { Action } from "@/types";
import styles from "@/components/MainPage/Main/styles.module.scss";

interface MainState {}
interface MainProps {
  currentDocumentId: string;
  dispatcher: (action: Action) => void;
}

const Main = createComponent(
  class extends Component<MainProps, MainState> {
    render() {
      const { currentDocumentId, dispatcher } = this.props;
      return main(
        {
          className: styles.Main,
        },
        [
          currentDocumentId
            ? DocumentEditor({
                currentDocumentId,
                dispatcher,
              })
            : DefaultMain({}),
        ]
      );
    }
  }
);

export default Main;
