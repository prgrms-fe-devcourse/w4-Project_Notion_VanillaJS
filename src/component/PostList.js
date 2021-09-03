import { push } from "../router.js";
import { getItem } from "../storage.js";

export default function PostList({
  $target,
  initialState,
  mainPageId,
  onRemove,
}) {
  if (mainPageId == "initialPage") {
    const $initialPage = document.createElement("div");
    $initialPage.setAttribute("id", "initialPage");
    $initialPage.innerHTML = "WelCome to<br/>Cloned Notion Page";

    document.querySelector("#header").appendChild($initialPage);
  }
  const $postList = document.createElement("div");
  const $newPostButton = document.createElement("div");
  $postList.setAttribute("id", "postListBox");
  $newPostButton.setAttribute("id", "postPageButtonBox");
  $newPostButton.setAttribute("data-mainpageId", mainPageId);
  $target.appendChild($newPostButton);
  $target.appendChild($postList);

  $newPostButton.innerHTML = `<button class="newPostButton">+New</button>`;

  this.state = initialState;

  this.setState = (nextState, parentId) => {
    this.state = nextState;
    this.render(parentId);
  };

  this.render = (parentId) => {
    $postList.innerHTML = `
      ${this.setPostList(this.state, parentId)}
      `;
  };

  this.setPostList = (postObject, parentId) => {
    let postList = `<ul class="postList" ${
      parentId ? `data-id=${parentId}` : ""
    }>${postObject
      .map((post) => {
        let subposts = ``;
        if (post.documents.length) {
          subposts += this.setSubPostList(post.documents, post.id);
        }
        return `
        <li data-id="${post.id}" id="post${post.id}" class="post">
          <button class="editPostButton" style="background-color:hsl(
            ${360 * Math.random()}, ${25 + 70 * Math.random()}%, 
            ${85 + 10 * Math.random()}%);">${post.title}</button>
          <button class="removePostButton">x</button>
          ${subposts}
          <button class="newSubpostButton">+New</button>
        </li>
        `;
      })
      .join("")}</ul>`;

    return postList;
  };

  this.setSubPostList = (postObject, parentId) => {
    let postList = `<ul class="postList" ${
      parentId ? `data-id=${parentId}` : ""
    }>${postObject
      .map((post) => {
        let subposts = ``;
        if (post.documents.length) {
          subposts += this.setPostList(post.documents, post.id);
        }
        return `
        <li data-id="${post.id}" id="post${post.id}" class="post">
          <button class="editPostButton">${post.title}</button>
          <button class="removePostButton">x</button>
          ${subposts}
        </li>
        `;
      })
      .join("")}</ul>`;

    return postList;
  };

  this.render();

  $postList.addEventListener("click", (e) => {
    const $btn = e.target.closest("button")
      ? e.target.closest("button")
      : e.target.children[0];
    const { id } = $btn.closest("li").dataset;
    const parentId = $btn.closest("li").parentNode.dataset.id;

    if ($btn.className === "editPostButton") {
      push(`/documents/${id}`, "edit", id, parentId);
    } else if ($btn.className === "newSubpostButton") {
      push(`/documents/new`, "new", undefined, id);
    } else if ($btn.className === "removePostButton") {
      const { pathname } = window.location;
      const [, , postId] = pathname.split("/");

      onRemove({
        removeItSelf: id === postId,
        targetId: id,
        parentId: parentId,
      });
    }
  });

  $target.querySelector(".newPostButton").addEventListener("click", () => {
    mainPageId = getItem("mainPageId", mainPageId);
    push(`/documents/new`, "new", undefined, mainPageId);
  });
}
