let mouseOffset = { x: 0, y: 0 };

let isMouseDown = false;

function onMouseDown(e, targetElement) {
  isMouseDown = true;
  mouseOffset = {
    x: targetElement.offsetLeft - e.clientX,
    y: targetElement.offsetTop - e.clientY,
  };
}

function onMouseMove(e, targetElement) {
  e.preventDefault();
  if (!isMouseDown) return;
  const newLocationX = e.clientX + mouseOffset.x + "px";
  const newLocationY = e.clientY + mouseOffset.y + "px";
  targetElement.style.left = newLocationX;
  targetElement.style.top = newLocationY;
  targetElement.style.position = "absolute";
}

function onMouseUp() {
  isMouseDown = false;
}
export const existingBlockEvent = () => {
  const blockList = document.querySelectorAll(".drag-button");
  for (const block of blockList) {
    dragEvent(block);
  }
};
export const dragEvent = (targetElement) => {
  const parentElement = targetElement.closest("div");
  parentElement.addEventListener("mousedown", (e) => {
    onMouseDown(e, parentElement);
  });
  parentElement.addEventListener("mousemove", (e) => {
    onMouseMove(e, parentElement);
  });
  parentElement.addEventListener("mouseup", (e) => {
    onMouseUp(e, parentElement);
  });
  parentElement.addEventListener("mouseleave", (e) => {
    // 마우스가 엘리멘트를 벗어날 경우 방어코드
    onMouseUp(e, parentElement);
  });
};
