import HTTP_METHODS from './http.js'

const BASE_URL = 'https://kdt.roto.codes/documents'

const request = (uri, config) => fetch(BASE_URL + uri, config);

const requestJsonData = (uri, config) => 
  request(uri, config).then(data => data.json());

const doc = {
  getAll() {
    return requestJsonData('', HTTP_METHODS.GET());     
  },

  getDoc(docId) {
    return requestJsonData(docId, HTTP_METHODS.GET())
  },

  create(doc) {
    return requestJsonData('', HTTP_METHODS.POST(doc))
  },

  update(docId, newDoc) {
    return requestJsonData(docId, HTTP_METHODS.PUT(newDoc))
  },

  delete(docId) {
    return request(docId, HTTP_METHODS.DELETE())
  }
}

export default doc

