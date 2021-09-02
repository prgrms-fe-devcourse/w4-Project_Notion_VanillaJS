export default function EditPageIconSelector({
  targetElment,
  initialState,
  selectIcon,
}) {
  const editPageIconSelector = document.createElement("ul");
  editPageIconSelector.classList.add("hide");
  targetElment.appendChild(editPageIconSelector);

  this.state = initialState || [];
  this.toggleHideClass = () => {
    editPageIconSelector.classList.toggle("hide");
  };

  const iconGenertor = () => {
    this.state.forEach((icon) => {
      const iconElement = document.createElement("li");
      iconElement.className = "icon-in-selector";
      editPageIconSelector.appendChild(iconElement);
      iconElement.textContent = icon;
      iconElement.addEventListener("click", (e) => {
        event.stopPropagation(iconElement);
        const ishiden = editPageIconSelector.className === "hide";
        if (ishiden) return;
        const selectedIcon = e.target.textContent;
        selectIcon(selectedIcon);
      });
    });
  };
  iconGenertor();
}
