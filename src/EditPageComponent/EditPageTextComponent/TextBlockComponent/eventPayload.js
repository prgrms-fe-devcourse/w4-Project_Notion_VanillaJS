const myEvent = new CustomEvent("myevent", {
    detail: {},
    bubbles: true,
    cancelable: true,
    composed: false,
});

window.addEventListener("myevent", () => {
    alert("myevent가 감지되었습니다");
});
