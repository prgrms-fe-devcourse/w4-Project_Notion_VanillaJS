import { getUserName } from "./api.js";
import { getItem } from "../utils/storage.js";

export default function PathHeader({ target, initialState }) {
    if (!(this instanceof PathHeader)) {
        return new PathHeader({ target, initialState });
    }

    // *****************************
    // * Valuables and Functions   *
    // *****************************
    const header = document.createElement("header");

    this.state = initialState;

    // *****************************
    // * Setting attribute         *
    // *****************************
    header.setAttribute("class", "path_header");

    // *****************************
    // * For Rendering             *
    // *****************************
    target.appendChild(header);

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.render = () => {
        // const { pathname } = this.state;
        // if (pathname === "/") {
        // }
        header.innerHTML = "header";
    };

    this.render();
}
