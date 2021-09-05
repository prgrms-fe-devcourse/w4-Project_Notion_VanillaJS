const Router = class {
  cb;
  constructor(cb) {
    this.cb = cb;
    window.onpopstate = () => this.load();
  }

  load() {
    const uri = location.pathname;
    const id = this.getId(uri)
    this.cb(id)
  }

  push(uri) {
    const id = this.getId(uri)
    this.cb(id)
    history.pushState(null, null, uri) 
  }

  getId(uri) {
    const id = Number(uri.split('/').pop()) || null;
    console.log(id)
    return id
  }
}

export default Router
