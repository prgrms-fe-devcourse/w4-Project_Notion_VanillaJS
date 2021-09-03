import { createDiff, Operation, OperationType } from "@/VDOM/operation";
import { applyOperation } from "@/VDOM/render";
import { VDOMNode } from "@/VDOM";

export abstract class Component<P, S> {
  protected props: P;
  protected state: S;

  private scheduled: number | null = null;

  private currentRootNode: VDOMNode;
  private mountedElement: HTMLElement | Text | null;

  protected setState(updater: (prevState: S) => S): void {
    const newState = updater(this.state);
    if (this.state === newState) return;
    this.state = newState;
    this.schedule();
  }

  private schedule() {
    if (this.scheduled !== null) {
      cancelAnimationFrame(this.scheduled);
      this.scheduled = null;
    }
    this.scheduled = requestAnimationFrame(() => {
      applyOperation(
        this.mountedElement as HTMLElement | Text,
        this.getUpdateOperation()
      );
    });
  }

  public setProps(props: P): Operation {
    this.componentWillReceiveProps(props);
    this.props = props;
    return this.getUpdateOperation();
  }

  private getUpdateOperation(): Operation {
    const newRootNode = this.render();
    const operation = createDiff(this.currentRootNode, newRootNode);
    if (operation.type === OperationType.REPLACE) {
      operation.onMount = (element) => (this.mountedElement = element);
    }
    this.currentRootNode = newRootNode;
    return operation;
  }

  public notifyMounted(element: HTMLElement | Text): void {
    this.mountedElement = element;
    requestAnimationFrame(this.componentDidMount.bind(this));
  }

  public initProps(props: P): VDOMNode {
    this.props = props;
    this.currentRootNode = this.render();
    return this.currentRootNode;
  }

  public unmount(): void {
    this.componentWillUnmount();
    this.mountedElement = null;
  }

  public componentWillReceiveProps(nextProps: P): void {}
  public componentDidMount() {}
  public componentWillUnmount() {}

  public abstract render(): VDOMNode;
}
