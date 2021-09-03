import { renderDOM } from "@/VDOM/render";
import App from "@/App";
import "@/reset.scss";

renderDOM("root", App({}));
