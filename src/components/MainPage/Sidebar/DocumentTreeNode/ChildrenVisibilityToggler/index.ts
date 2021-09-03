import { span } from "@/VDOM/elements";
import { createComponent } from "@/VDOM";
import { Component } from "@/VDOM/Component";
import styles from "@/components/MainPage/Sidebar/DocumentTreeNode/ChildrenVisibilityToggler/styles.module.scss";

interface ChildrenVisibilityTogglerState {}
interface ChildrenVisibilityTogglerProps {
  isOpen: boolean;
  toggleOpen: (event: Event) => void;
}

const ChildrenVisibilityToggler = createComponent(
  class extends Component<
    ChildrenVisibilityTogglerProps,
    ChildrenVisibilityTogglerState
  > {
    render() {
      const { isOpen, toggleOpen } = this.props;
      return span(
        {
          className: `${styles.ChildrenVisibilityToggler} ${
            isOpen ? styles.open : ""
          }`,
          onClick: toggleOpen,
        },
        []
      );
    }
  }
);

export default ChildrenVisibilityToggler;
