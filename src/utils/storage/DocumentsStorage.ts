import BrowserStorage from "@/utils/storage/BrowserStorage";

const PREFIX_KEY = "DOCUMENT_";

export default class DocumentsStorage extends BrowserStorage<string> {
  private static instance?: DocumentsStorage;

  public static getInstance(): DocumentsStorage {
    if (!this.instance) {
      this.instance = new DocumentsStorage();
    }
    return this.instance;
  }

  public getDocument(documentId: string) {
    return this.get(`${PREFIX_KEY}${documentId}`, {});
  }

  public setDocument(documentId: string, value: any) {
    return this.set(`${PREFIX_KEY}${documentId}`, value);
  }

  public clearDocument(documentId: string) {
    return this.clearItem(`${PREFIX_KEY}${documentId}`);
  }
}
