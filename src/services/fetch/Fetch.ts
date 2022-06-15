export class Fetch {
  static #instance: Fetch;
  #baseUrl = `https://xrlkcpfarp7azb3m6fse22mbbe0nuorf.lambda-url.ap-northeast-2.on.aws`;

  static getInstance() {
    if (!this.#instance) this.#instance = new Fetch();
    return this.#instance;
  }

  private constructor() {
    return;
  }

  setBaseConfigs(baseUrl?: string) {
    if (baseUrl && baseUrl !== this.#baseUrl) this.#baseUrl = baseUrl;
  }

  async getMockHistory(code = '005930', period = 'day') {
    const params = new URLSearchParams({ period });
    return this.#get(`prices/domestic/${code}?${params.toString()}`);
  }

  async #get(paths: string) {
    return fetch(`${this.#baseUrl}/${paths}`).then((res) => res.json());
  }
}
