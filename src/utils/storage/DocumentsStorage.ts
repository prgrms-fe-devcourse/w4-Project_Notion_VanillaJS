import BrowserStorage from "@/utils/storage/BrowserStorage";

const PREFIX_KEY = "DOCUMENT_";
const OPEN_KEYS = "OPEN_KEYS";

export const REMOVE = "REMOVE";
export const INSERT = "INSERT";

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

  public getOpenKeys() {
    return this.get(`${PREFIX_KEY}${OPEN_KEYS}`, []);
  }

  public setOpenKeys(documentId: string, mode: typeof INSERT | typeof REMOVE) {
    const openKeys = this.get(`${PREFIX_KEY}${OPEN_KEYS}`, []);

    const newOpenKeys =
      mode === INSERT
        ? [...openKeys, documentId]
        : openKeys.filter((key: string) => key !== documentId);

    return this.set(`${PREFIX_KEY}${OPEN_KEYS}`, newOpenKeys);
  }
}
