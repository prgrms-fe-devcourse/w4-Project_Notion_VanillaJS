import { canGetElementsLater } from './RxJS.js';

export const htmlReset = ($target) => {
    return ($target.innerHTML = ``);
};

export const getTagOf = (e) => {
    return e.target;
};

export const getClosestTag = ($target, attr) => {
    return $target.closest(attr);
};

export const getDataSet = ($target) => {
    return $target.dataset;
};

export const setStyle = canGetElementsLater((styles, $target) => {
    for (const eachStyle of styles) {
        const [styleName, value] = eachStyle;
        $target.style[styleName] = value;
    }
    return $target;
});

export const setTextContent = canGetElementsLater((text, $target) => (($target.textContent = text), $target));

export const createTextNode = (text) => document.createTextNode(text);

export const getTextContent = ($target) => $target.textContent;

export const setAttribute = canGetElementsLater((attr, $target) => {
    for (const eachAttr of attr) {
        const [attrName, attrValue] = eachAttr;

        $target.setAttribute(attrName, attrValue);
    }
    return $target;
});

export const createElement = (tagName) => document.createElement(tagName);

export const querySelector = ($parentTag, tagInfo) =>
    tagInfo ? $parentTag.querySelector(tagInfo) : ((tagInfo = $parentTag), document.querySelector(tagInfo));

export const getElementById = (id) => document.getElementById(id)

export const getInputValue = ($target) => $target.value

export const getClassName = ($target) => $target.className

export const getKeyCodeOf = (e) => e.keyCode
