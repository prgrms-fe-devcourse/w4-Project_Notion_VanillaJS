import { qsAll } from "../../util/util.js";

export const showChildNode = (target, id) => {
  if (!id) {
    id = target.closest(".notion-sidebar-block").dataset.id;
  }
  qsAll(".notion-sidebar-block").forEach((el) => {
    if (el.classList.contains(id)) {
      el.style.display = "flex";
    } else {
      qsAll(".empty-block").forEach((el) => {
        if (el.classList.contains(id)) {
          el.style.display = "flex";
        }
      });
    }
  });
};

export const hideChildNode = (target, id) => {
  if (!id) {
    id = target.closest(".notion-sidebar-block").dataset.id;
  }
  qsAll(".notion-sidebar-block").forEach((el) => {
    if (el.classList.contains(id)) {
      hideChildNode(target, el.dataset.id);
      el.style.display = "none";
    } else {
      qsAll(".empty-block").forEach((el) => {
        if (el.classList.contains(id)) {
          el.style.display = "none";
        }
      });
    }
  });
};
