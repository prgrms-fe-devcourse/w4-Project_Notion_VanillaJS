export default function Frame({ $target }) {
  const $frame = document.createElement("div");
  $frame.className = "notion-frame";
  $target.appendChild($frame);

  this.render = () => {
    $frame.textContent = "프레임입니다.";
  };

  this.render();
}
