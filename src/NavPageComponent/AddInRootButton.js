export default function AddInRootButton({ targetElement, onCreate }) {
  const addButton = document.createElement("button");
  targetElement.appendChild(addButton);
  addButton.textContent = "+ Add a Page";
  addButton.addEventListener("click", () => {
    event.stopPropagation(addButton);
    onCreate();
  });
}
