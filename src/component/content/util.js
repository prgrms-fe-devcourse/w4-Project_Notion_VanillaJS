import { emit, qs } from "../../util/util.js";

export const reflectToViewer = (target) => {
  if (target.className === "content-header") {
    emit(qs(".viewer"), "@reflectHeaderToViewer", target.innerText);
  } else if (target.className === "content-body") {
    emit(qs(".viewer"), "@reflectContentToViewer", target.innerText);
  }
};
