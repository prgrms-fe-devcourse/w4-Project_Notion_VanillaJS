import App from "./App.js";

function main() {
  this.$target = document.getElementById("App");
  new App({ $target: this.$target });
}

new main();
