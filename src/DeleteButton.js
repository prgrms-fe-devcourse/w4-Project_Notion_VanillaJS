export default function DeleteButton({
  targetElement,
  initialState,
  onDelete,
}) {
  this.state = initialState || null;
  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  targetElement.appendChild(deleteButton);
  deleteButton.innerText = "🗑";

  deleteButton.addEventListener("click", (e) => {
    event.stopPropagation(deleteButton);

    onDelete(this.state);
  });
}
