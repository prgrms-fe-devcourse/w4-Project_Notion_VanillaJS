const Router = class {
  cb;
  constructor(cb) {
    this.cb = cb;
    window.onpopstate = () => this.load();
  }

  load() {
    const uri = location.pathname;
    console.log(uri)
    this.cb(uri)
  }

  push(uri) {
    this.cb(uri)
    history.push(null, null, uri) 
  }
}

export default Router
