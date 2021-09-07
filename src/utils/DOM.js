export const htmlReset = ($target) => {
    return ($target.innerHTML = ``);
};

export const setStyle = ($target, styles) => {
    for (const eachStyle of styles) {
        const [styleName, value] = eachStyle;
        $target.style[styleName] = value;
    }
    return $target;
};

export const createTextNode = (text) => document.createTextNode(text);

export const createElement = (tagName) => document.createElement(tagName);

export const getElementById = (id) => document.getElementById(id);