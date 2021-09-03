import { Component } from "@/VDOM/Component";
import { createComponent } from "@/VDOM";
import Router from "@/components/Router";

interface AppState {}
interface AppProps {}

const App = createComponent(
  class extends Component<AppProps, AppState> {
    render() {
      return Router({});
    }
  }
);

export default App;
