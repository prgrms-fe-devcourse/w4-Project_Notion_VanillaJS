type ResponseWithData = Response & { data?: any };

interface Fetcher {
  run(input: RequestInfo, init?: RequestInit): Promise<ResponseWithData>;
}

const TIMEOUT = 5000;

class BaseFetcher implements Fetcher {
  run(input: RequestInfo, init?: RequestInit): Promise<ResponseWithData> {
    return fetch(input, init);
  }
}

class JsonFetcher implements Fetcher {
  constructor(private baseFetcher: Fetcher) {}

  async run(input: RequestInfo, init?: RequestInit): Promise<ResponseWithData> {
    const response = await this.baseFetcher.run(input, init);
    if (!response.ok) {
      const message = `An error has occurred: ${response.status}`;
      throw new Error(message);
    }
    const json = await response.json();
    response.data = json;
    return response;
  }
}

class TimeoutFetcher implements Fetcher {
  constructor(private baseFetcher: Fetcher) {}

  async run(input: RequestInfo, init?: RequestInit): Promise<ResponseWithData> {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), TIMEOUT);
    const response = await this.baseFetcher.run(input, {
      ...init,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  }
}

const fetcher = new TimeoutFetcher(new JsonFetcher(new BaseFetcher()));

export const enhancedFetcher = fetcher.run.bind(fetcher);
