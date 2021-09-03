import { createComponent } from "@/VDOM";
import { div } from "@/VDOM/elements";
import { Component } from "@/VDOM/Component";
import { debounce } from "@/utils";
import { Action } from "@/types";
import {
  editDocument,
  fetchDocument,
  fetchDocuments,
} from "@/utils/api/documents";
import styles from "@/components/MainPage/Main/DocumentEditor/styles.module.scss";
import DocumentTitleEditor from "@/components/MainPage/Main/DocumentEditor/DocumentTitleEditor";
import DocumentContentEditor from "@/components/MainPage/Main/DocumentEditor/DocumentContentEditor";
import DocumentsStorage from "@/utils/storage/DocumentsStorage";

interface DocumentEditorProps {
  currentDocumentId: string;
  dispatcher: (action: Action) => void;
}
interface DocumentEditorState {
  title: string | null;
  content: string;
  documentsStorage: DocumentsStorage;
}

const DocumentEditor = createComponent(
  class extends Component<DocumentEditorProps, DocumentEditorState> {
    state = {
      title: "",
      content: "",
      documentsStorage: DocumentsStorage.getInstance(),
    };

    componentDidMount() {
      this.getDocumentFromStorageOrAPI(this.props.currentDocumentId);
    }

    componentWillReceiveProps(nextProps: DocumentEditorProps) {
      this.getDocumentFromStorageOrAPI(nextProps.currentDocumentId);
    }

    async getDocumentFromStorageOrAPI(documentId: string) {
      const { title, content } =
        this.state.documentsStorage.getDocument(documentId);

      if (!(title || content)) {
        const document = await fetchDocument(documentId);
        this.setState((prevState) => ({
          ...prevState,
          title: document.title,
          content: document.content,
        }));
      } else {
        this.setState((prevState) => ({
          ...prevState,
          title: title || this.state.title,
          content: content || this.state.content,
        }));
      }
    }

    async onTitleChange(event: Event) {
      const { dispatcher, currentDocumentId } = this.props;

      const inputValue = (event.target as HTMLInputElement).value;

      this.state.documentsStorage.setDocument(currentDocumentId, {
        title: inputValue,
        content: this.state.content,
      });

      this.setState((prevState) => ({
        ...prevState,
        title: inputValue,
      }));

      await editDocument(currentDocumentId, inputValue, this.state.content);

      const documents = await fetchDocuments();

      dispatcher({
        type: "UPDATE_DOCUMENTS",
        payload: documents,
      });
    }

    async onContentChange(event: Event) {
      const { dispatcher, currentDocumentId } = this.props;

      const textAreaValue = (event.target as HTMLTextAreaElement).value;

      this.state.documentsStorage.setDocument(currentDocumentId, {
        title: this.state.title,
        content: textAreaValue,
      });

      this.setState((prevState) => ({
        ...prevState,
        content: textAreaValue,
      }));

      await editDocument(currentDocumentId, this.state.title, textAreaValue);

      const documents = await fetchDocuments();

      dispatcher({
        type: "UPDATE_DOCUMENTS",
        payload: documents,
      });
    }

    render() {
      return div({ className: styles.DocumentEditor }, [
        DocumentTitleEditor({
          value: this.state.title,
          onKeyUp: debounce(this.onTitleChange.bind(this), 100),
        }),
        DocumentContentEditor({
          value: this.state.content,
          onKeyUp: debounce(this.onContentChange.bind(this), 100),
        }),
      ]);
    }
  }
);

export default DocumentEditor;
