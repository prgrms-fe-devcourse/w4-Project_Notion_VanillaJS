interface Storage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export default abstract class BrowserStorage<T extends string> {
  private readonly storage: Storage;

  constructor(getStorage = (): Storage => window.localStorage) {
    this.storage = getStorage();
  }

  protected get(key: T, defaultValue: unknown): any {
    try {
      const value = this.storage.getItem(key);
      return value ? JSON.parse(value) : defaultValue;
    } catch (err: unknown) {
      return defaultValue;
    }
  }

  protected set(key: T, value: unknown): void {
    return this.storage.setItem(key, JSON.stringify(value));
  }

  protected clearItem(key: T): void {
    this.storage.removeItem(key);
  }

  protected clearItems(keys: T[]): void {
    keys.forEach((key) => this.clearItem(key));
  }
}
