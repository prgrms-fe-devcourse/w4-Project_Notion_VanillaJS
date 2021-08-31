import HttpMethods from '../utils/constants/httpMethods.js';

const USER_NAME = 'Dorr'

const Client = class {
  baseUrl;
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  convertReqUrlFrom(uri) {
    const validUri = String(uri).startsWith('/') ? String(uri) : `/${uri}`;
    return `${this.baseUrl}${validUri}` 
  }

  configHttp(method, body) {
    const headers = { 
      "x-username": USER_NAME,
      "Content-Type": "application/json"
    }
    const config = {method, headers}
    
    if (body) {
      config.body = JSON.stringify(body);
    }

    return config;
  }

  request(uri, method = HttpMethods.GET, body) {
    const reqUrl = this.convertReqUrlFrom(uri);
    const config = this.configHttp(method, body);

    return fetch(reqUrl, config).then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('API 호출 중 에러가 발생했습니다.')
    }).catch(e => {
      console.error(e);
    })
  }

  requestJsonData(uri, method) {
    this.request(uri, method).then(data => data.json());
  }

  get(uri) {
    return this.request(uri);
  }

  post(uri, body) {
    return this.request(uri, HttpMethods.POST, body)
  }
  
  put(uri, body) {
    return this.request(uri, HttpMethods.PUT, body)
  }

  delete(uri) {
    return this.request(uri, HttpMethods.DELETE)
  }
}

export default Client
