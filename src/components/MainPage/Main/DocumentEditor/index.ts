import { createComponent } from "@/VDOM";
import { div } from "@/VDOM/elements";
import { Component } from "@/VDOM/Component";
import { debounce } from "@/utils";
import { Document } from "@/types";
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
  setDocuments: (documents: Document[]) => void;
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
      const { currentDocumentId } = this.props;
      this.getDocumentFromStorageOrAPI(currentDocumentId);
    }

    componentWillReceiveProps(nextProps: DocumentEditorProps) {
      this.getDocumentFromStorageOrAPI(nextProps.currentDocumentId);
    }

    async getDocumentFromStorageOrAPI(documentId: string) {
      const { documentsStorage, title, content } = this.state;
      const { title: storedTitle, content: storedContent } =
        documentsStorage.getDocument(documentId);

      if (!(storedTitle || storedContent)) {
        const { title: fetchedTitle, content: fetchedContent } =
          await fetchDocument(documentId);
        this.setState((prevState) => ({
          ...prevState,
          title: fetchedTitle,
          content: fetchedContent,
        }));
      } else {
        this.setState((prevState) => ({
          ...prevState,
          title: storedTitle || title,
          content: storedContent || content,
        }));
      }
    }

    async onTitleChange(event: Event) {
      const { setDocuments, currentDocumentId } = this.props;
      const { documentsStorage, content } = this.state;

      const inputValue = (event.target as HTMLInputElement).value;

      documentsStorage.setDocument(currentDocumentId, {
        title: inputValue,
        content,
      });

      this.setState((prevState) => ({
        ...prevState,
        title: inputValue,
      }));

      await editDocument(currentDocumentId, inputValue, content);

      const documents = await fetchDocuments();

      setDocuments(documents);
    }

    async onContentChange(event: Event) {
      const { setDocuments, currentDocumentId } = this.props;
      const { documentsStorage, title } = this.state;

      const textAreaValue = (event.target as HTMLTextAreaElement).value;

      documentsStorage.setDocument(currentDocumentId, {
        title,
        content: textAreaValue,
      });

      this.setState((prevState) => ({
        ...prevState,
        content: textAreaValue,
      }));

      await editDocument(currentDocumentId, title, textAreaValue);

      const documents = await fetchDocuments();

      setDocuments(documents);
    }

    render() {
      const { title, content } = this.state;

      return div({ className: styles.DocumentEditor }, [
        DocumentTitleEditor({
          value: title,
          onKeyUp: debounce(this.onTitleChange.bind(this), 100),
        }),
        DocumentContentEditor({
          value: content,
          onKeyUp: debounce(this.onContentChange.bind(this), 100),
        }),
      ]);
    }
  }
);

export default DocumentEditor;
