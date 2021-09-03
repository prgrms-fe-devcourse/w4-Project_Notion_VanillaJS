import { request } from "../../util/api.js";
import { HTTP_METHOD } from "../../util/constant.js";
import { customCreateNode, emit, qs, qsAll } from "../../util/util.js";
import { SidebarEmpty, ToggleTriangle, Trash } from "../util/utilComponent.js";

export const createSidebarBlocks = (children, depth, parent = qs(".sidebar-block")) => {
  return children.map(({ id, title, documents }) => {
    const newNode = customCreateNode(
      "div",
      `<div class="notion-sidebar-block" data-id=${id} style="padding-left:${depth * 10}px; ${depth > 0 && "display: none;"}" >
        ${ToggleTriangle}
        <span>${title}</span>
        ${Trash}
        <button class="add" data-id=${id}>+</button>
      </div>`,
    );
    if (documents.length > 0) {
      const siblingNodes = createSidebarBlocks(documents, depth + 1, newNode);
      for (const sibling of siblingNodes) {
        sibling.children[0].classList.add(newNode.children[0].dataset.id);
        newNode.appendChild(sibling);
      }
      return newNode;
    }
    const siblingNode = customCreateNode("div", SidebarEmpty);
    siblingNode.style.paddingLeft = `${(depth + 2) * 10}px`;
    siblingNode.style.display = "none";
    siblingNode.classList.add("empty-block");
    siblingNode.classList.add(id);
    newNode.appendChild(siblingNode);
    return parent.appendChild(newNode);
  });
};

export const showChildSidebar = (target, id) => {
  if (!id) {
    id = target.closest(".notion-sidebar-block").dataset.id;
  }

  qsAll(".notion-sidebar-block").forEach((el) => {
    if (el.classList.contains(id)) {
      el.style.display = "flex";
      return;
    }
    qsAll(".empty-block").forEach((el) => {
      if (el.classList.contains(id)) {
        el.style.display = "flex";
      }
    });
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
      return;
    }
    qsAll(".empty-block").forEach((el) => {
      if (el.classList.contains(id)) {
        el.style.display = "none";
      }
    });
  });
};

export const styleHover = ({ currentTarget }, opacity) => {
  if (currentTarget.classList[0] === "notion-sidebar-block") {
    const btn = qs("button.add", currentTarget);
    const trashBtn = qs("svg.trash", currentTarget);
    trashBtn.style.opacity = opacity;
    btn.style.opacity = opacity;
  }
};

export const styleToggleBtn = (target) => {
  const svgNode = target.closest("svg");

  if (svgNode.classList.length < 2) {
    svgNode.classList.add("active");
    svgNode.style.setProperty("--toggle", "180deg");
    showChildSidebar(target);
  } else {
    svgNode.classList.remove("active");
    svgNode.style.setProperty("--toggle", "90deg");
    hideChildNode(target);
  }
};

export const makeTitlePrompt = async (createNewContent, parentTitleId) => {
  const data = prompt("제목을 입력하세요");
  if (!data) {
    return;
  }

  const result = await request(null, HTTP_METHOD.POST, { parent: parentTitleId, title: data });
  history.pushState(result, "", `/documents/${result.id}`);
  return createNewContent(result);
};

export const makeDeletePrompt = async (updateSidebar, deleteContentId) => {
  const data = confirm("이 문서를 삭제하시겠습니까?");
  if (!data) {
    return;
  }
  await request(deleteContentId, HTTP_METHOD.DELETE);
  history.pushState(null, "", `/`);
  updateSidebar();
};

export const showSelectedContent = async (selectedTitleId) => {
  const data = await request(selectedTitleId, HTTP_METHOD.GET);
  emit(qs(".notion-content-container"), "@changeContent", { id: data.id, title: data.title, content: data.content });
  history.pushState(null, "", `/documents/${selectedTitleId}`);
};
