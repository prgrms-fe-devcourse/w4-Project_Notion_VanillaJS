export const createElement = (tagName, attributes = {}, ...children) => {
  const $element = document.createElement(tagName);

  Object.entries(attributes).forEach(([key, value]) => {
    $element.setAttribute(key, value);
  });

  children.forEach((child) => {
    $element.appendChild(child);
  });

  return $element;
};

export const $ = (selector, parent = null) => (
  parent instanceof Element
    ? parent.querySelector(selector)
    : document.querySelector(selector)
);
