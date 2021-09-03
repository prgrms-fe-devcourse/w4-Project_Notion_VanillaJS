import { VDOMProps, VDOMNode, VDOMType } from "@/VDOM";

export const enum OperationType {
  APPEND,
  REPLACE,
  REMOVE,
  UPDATE,
  SKIP,
}

interface AppendOperation {
  type: OperationType.APPEND;
  node: VDOMNode;
}

interface ReplaceOperation {
  type: OperationType.REPLACE;
  node: VDOMNode;
  onMount?: (element: HTMLElement | Text) => void;
}

interface RemoveOperation {
  type: OperationType.REMOVE;
}

interface UpdateOperation {
  type: OperationType.UPDATE;
  props: VDOMProps;
  children: Operation[];
}

interface SkipOperation {
  type: OperationType.SKIP;
}

export type Operation =
  | AppendOperation
  | ReplaceOperation
  | RemoveOperation
  | UpdateOperation
  | SkipOperation;

export const createDiff = (oldNode: VDOMNode, newNode: VDOMNode): Operation => {
  if (oldNode === newNode) {
    return {
      type: OperationType.SKIP,
    };
  }

  if (
    oldNode.type === VDOMType.TEXT &&
    newNode.type === VDOMType.TEXT &&
    oldNode.value === newNode.value
  ) {
    return {
      type: OperationType.SKIP,
    };
  }

  if (
    oldNode.type === VDOMType.COMPONENT &&
    newNode.type === VDOMType.COMPONENT &&
    oldNode.component === newNode.component &&
    oldNode.instance
  ) {
    newNode.instance = oldNode.instance;
    if (oldNode.props === newNode.props) {
      return { type: OperationType.SKIP };
    }
    return newNode.instance.setProps(newNode.props);
  }

  if (oldNode.type === VDOMType.COMPONENT) {
    oldNode.instance?.unmount();
    oldNode.instance = undefined;
    return {
      type: OperationType.REPLACE,
      node: newNode,
    };
  }

  if (newNode.type === VDOMType.COMPONENT) {
    const { component: Component } = newNode;
    newNode.instance = new Component();
    return {
      type: OperationType.REPLACE,
      node: newNode.instance.initProps(newNode.props),
      onMount: (element: HTMLElement | Text) =>
        newNode.instance?.notifyMounted(element),
    };
  }

  if (oldNode.type === VDOMType.TEXT || newNode.type === VDOMType.TEXT) {
    return {
      type: OperationType.REPLACE,
      node: newNode,
    };
  }

  if (oldNode.tagName !== newNode.tagName) {
    return {
      type: OperationType.REPLACE,
      node: newNode,
    };
  }

  const propsDiff = diffProps(oldNode.props, newNode.props);
  const childrenDiff = diffChildren(oldNode.children, newNode.children);

  return {
    type: OperationType.UPDATE,
    props: propsDiff,
    children: childrenDiff,
  };
};

const diffProps = (oldProps: VDOMProps, newProps: VDOMProps): VDOMProps => {
  const diff: VDOMProps = {};

  for (const key in oldProps) {
    if (oldProps[key] !== newProps[key]) {
      diff[key] = newProps[key];
    }
  }

  for (const key in newProps) {
    if (oldProps[key] === undefined) {
      diff[key] = newProps[key];
    }
  }

  return diff;
};

const diffChildren = (
  oldChildren: VDOMNode[],
  newChildren: VDOMNode[]
): Operation[] => {
  const operations: Operation[] = [];
  for (let i = 0; i < Math.max(oldChildren.length, newChildren.length); i++) {
    const oldChild = oldChildren[i];
    const newChild = newChildren[i];

    if (oldChild === undefined) {
      operations.push({
        type: OperationType.APPEND,
        node: newChild,
      });
    } else if (newChild === undefined) {
      if (oldChild.type === VDOMType.COMPONENT) {
        oldChild.instance?.unmount();
        oldChild.instance = undefined;
      }
      operations.push({
        type: OperationType.REMOVE,
      });
    } else {
      operations.push(createDiff(oldChild, newChild));
    }
  }

  return operations;
};
