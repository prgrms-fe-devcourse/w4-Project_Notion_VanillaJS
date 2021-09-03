import { Component } from "@/VDOM/Component";
import { createComponent } from "@/VDOM";
import { div } from "@/VDOM/elements";

interface RouterState {
  currentPath: string;
  eventCollector: DocumentFragment;
}
interface RouterProps {}

const ROUTE_CHANGE = "ROUTE_CHANGE";

const Router = createComponent(
  class extends Component<RouterProps, RouterState> {
    state = {
      currentPath: "",
      eventCollector: document.createDocumentFragment(),
    };

    componentDidMount() {
      const { currentPath, eventCollector } = this.state;

      eventCollector.addEventListener(ROUTE_CHANGE, ((event: CustomEvent) => {
        const {
          detail: { pathname },
        } = event;

        if (currentPath === pathname) return;

        window.history.pushState({}, "", pathname);

        this.checkRoute();
      }) as EventListener);

      this.checkRoute();
    }

    changeRoute(pathname: string) {
      const { eventCollector } = this.state;

      eventCollector.dispatchEvent(
        new CustomEvent(ROUTE_CHANGE, {
          detail: {
            pathname,
          },
        })
      );
    }

    checkRoute() {
      const { currentPath } = this.state;
      const { pathname } = window.location;

      if (currentPath === pathname) return;

      this.setState((prevState) => ({
        ...prevState,
        currentPath: pathname,
      }));
    }

    render() {
      return div({}, []);
    }
  }
);

export default Router;
