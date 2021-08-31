import Client from './HttpClient.js'

const BASE_URL = 'https://kdt.roto.codes/documents'

const httpClient = new Client(BASE_URL);

const api = {
  getAllDocs() {
    return httpClient.get('')     
  },

  getDoc(docId) {
    return httpClient.get(docId);
  },

  create(newDoc) {
    return httpClient.post('', newDoc)
  },

  update(docId, targetDoc) {
    return httpClient.put(docId, targetDoc)
  },

  delete(docId) {
    return httpClient.delete(docId)
  }
}

export default api
