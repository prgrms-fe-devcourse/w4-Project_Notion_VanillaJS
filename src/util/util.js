export const qs = (selector, scope = document) => {
  if (!selector) throw "no selector";
  return scope.querySelector(selector);
};
export const qsAll = (selector, scope = document) => {
  if (!selector) throw "no selector";
  return scope.querySelectorAll(selector);
};
export function on(target, eventName, handler) {
  if (!target) throw "no selector";
  target.addEventListener(eventName, handler);
}

export const customCreateNode = (el, inner) => {
  if (!el || !inner) throw "no element of innerHTML";
  const tmp = document.createElement(el);
  tmp.innerHTML = inner;
  return tmp;
};

export function emit(target, eventName, detail) {
  if (!target) throw "no target";
  const event = new CustomEvent(eventName, { detail });

  target.dispatchEvent(event);
}
