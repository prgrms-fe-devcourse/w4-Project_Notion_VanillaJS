import { Component } from "@/VDOM/Component";
import { createComponent } from "@/VDOM";
import { div } from "@/VDOM/elements";

interface AppState {}
interface AppProps {}

const App = createComponent(
  class extends Component<AppProps, AppState> {
    render() {
      return div({}, ["Hello World"]);
    }
  }
);

export default App;
