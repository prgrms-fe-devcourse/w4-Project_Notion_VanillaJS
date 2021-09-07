const Router = class {
  constructor(onLoad, onInit) {
    this.onLoad = onLoad;
    this.onInit = onInit;
    window.onpopstate = () => this.load();
    window.onload= () => this.load()
  }

  init() {
    const uri = location.pathname;
    const id = this.getId(uri)
    this.onInit(id) 
  }

  load() {
    const uri = location.pathname;
    const id = this.getId(uri)
    this.onLoad(id)
  }

  push(uri) {
    const id = this.getId(uri)
    this.onLoad(id)
    history.pushState(null, null, uri) 
  }

  getId(uri) {
    const id = Number(uri.split('/').pop()) || null;
    return id
  }
}

export default Router
