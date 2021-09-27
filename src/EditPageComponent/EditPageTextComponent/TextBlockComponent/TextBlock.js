import HandleInBlock from "./handleInBlock.js";
import TextInBlock from "./TextInBlock.js";
import { dragEvent, existingDrag } from "./blockDragAndDrop.js";
export default function TextBlock({ targetElement, initialState }) {
    this.state = initialState || { text: "", tagName: "div" };
    const { text, tagName } = this.state;
    const textBlock = document.createElement(tagName);
    textBlock.className = "editor-text-block";
    this.element = "";
    this.setState = (nextState) => {
        this.state = nextState || { text: "", tagName: "div" };
        this.render();
    };

    this.render = () => {
        targetElement.appendChild(textBlock);
        textBlock.textContent = "";
        const handleInBlock = new HandleInBlock({ targetElement: textBlock });
        const textInBlock = new TextInBlock({ targetElement: textBlock });
        this.element = textInBlock.element;
        dragEvent(handleInBlock.element);
    };
    existingDrag();
    this.render();
}
