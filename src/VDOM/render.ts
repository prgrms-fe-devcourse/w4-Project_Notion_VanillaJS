import { VDOMProps, VDOMNode, VDOMType } from "@/VDOM";

import { Operation, OperationType } from "@/VDOM/operation";

const isListener = (name: string) => name.startsWith("on");

export const render = (node: VDOMNode): HTMLElement | Text => {
  switch (node.type) {
    case VDOMType.ELEMENT: {
      const element: HTMLElement = document.createElement(node.tagName);
      const { props, children } = node;
      Object.entries(props).forEach(([key, value]) => {
        if (isListener(key)) {
          const eventType = key.toLowerCase().substring(2);
          element.addEventListener(eventType, value as EventListener);
        } else {
          if (typeof value === "string" || typeof value === "boolean") {
            element.setAttribute(key, `${value}`);
          }
          (element as Record<string, any>)[key] = value;
        }
      });

      children.forEach((child) => {
        element.appendChild(render(child));
      });

      return element;
    }
    case VDOMType.TEXT: {
      const element: Text = document.createTextNode(node.value);

      return element;
    }
    case VDOMType.COMPONENT: {
      if (node.instance) {
        const element = render(node.instance.render());
        node.instance.notifyMounted(element);
        return element;
      }

      const { component: Component } = node;
      node.instance = new Component();

      const element = render(node.instance.initProps(node.props));
      node.instance.notifyMounted(element);

      return element;
    }
  }
};

export const renderDOM = (id: string, rootNode: VDOMNode): void => {
  const root = document.getElementById(id);
  if (root === null) {
    throw new Error("id를 확인해주세요.");
  }
  root.appendChild(render(rootNode));
};

export const applyOperation = (
  element: HTMLElement | Text,
  operation: Operation,
  parentElement?: HTMLElement | Text
): void => {
  switch (operation.type) {
    case OperationType.SKIP: {
      break;
    }
    case OperationType.REPLACE: {
      const newElement = render(operation.node);
      element.replaceWith(newElement);
      operation.onMount && operation.onMount(newElement);
      break;
    }
    case OperationType.REMOVE: {
      element.remove();
      break;
    }
    case OperationType.APPEND: {
      const toAppend = render(operation.node);
      parentElement?.appendChild(toAppend);
      break;
    }
    case OperationType.UPDATE: {
      applyAttrs(element as HTMLElement, operation.props);
      for (let i = 0; i < operation.children.length; i++) {
        const childElement = element?.childNodes[i];
        const childOperation = operation.children[i];
        applyOperation(childElement as HTMLElement, childOperation, element);
      }
      break;
    }
  }
};

function applyAttrs(element: HTMLElement, props: VDOMProps): void {
  if (!element) return;
  Object.entries(props).forEach(([key, value]) => {
    if (value === undefined) {
      element.removeAttribute(key);
      (element as Record<string, any>)[key] = undefined;
    } else {
      if (isListener(key)) return;
      if (typeof value === "string" || typeof value === "boolean") {
        element.setAttribute(key, `${value}`);
      }
      (element as Record<string, any>)[key] = value;
    }
  });
}
