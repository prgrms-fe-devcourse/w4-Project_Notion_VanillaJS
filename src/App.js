import DocumentList from "./components/DocumentList.js";

export default function App({ $target, initialState }) {
  new DocumentList({ $target, initialState });
}
