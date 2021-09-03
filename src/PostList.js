import { request } from "./api.js";
import { push } from "./router.js";

export default function PostList({ $target, initialState, onClickPost }) {
  const $postList = document.createElement("div");
  $target.appendChild($postList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;

    this.render();
  };

  const subPostRendering = (post) => {
    const { documents } = post;
    let list = "";
    if (documents) {
      list = `
        <li data-id="${post.id}">
          <span class="displaySubDocument${
            documents.length ? " displayRotate" : ""
          }">▶</span>
          📄 ${post.title ? `${post.title}` : "제목 없음"}
          <span class="options">•••</span>
          <span class="createSubDocument">+</span>
        </li>`;
    } else {
      list = `
        <li data-id="${post.id}">
          <span class="displaySubDocument">▶</span>
          📄 ${post.title}
          <span class="options">•••</span>
          <span class="createSubDocument">+</span>
        </li>`;
    }

    if (!documents) return list;

    if (documents.length) {
      list += documents
        .map((document) => {
          return `<ul>${subPostRendering(document)}</ul>`;
        })
        .join("");
    }

    return list;
  };

  this.render = () => {
    $postList.innerHTML = `
      <ul class="root">
        ${this.state.map((post) => subPostRendering(post)).join("")}
        <li>
          <span class="createRootDocument">+ 페이지 추가</span>
        </li>
      </ul>
    `;
  };

  this.render();

  const invisibleSubDocuments = (currentNode) => {
    if (!currentNode) return;
    if (currentNode.tagName === "UL") {
      currentNode.classList.toggle("invisible");
      invisibleSubDocuments(currentNode.nextSibling);
    }
  };

  $postList.addEventListener("click", async (e) => {
    const className = e.target.className;
    if (className.indexOf("displaySubDocument") === 0) {
      e.target.classList.toggle("displayRotate");

      const childDocuments = e.target.closest("li").nextSibling;
      if (childDocuments && childDocuments.tagName === "UL") {
        invisibleSubDocuments(childDocuments);
      }
    } else if (className === "createRootDocument") {
      const createdPost = await request("/documents", {
        method: "POST",
        body: JSON.stringify({
          title: "",
          parent: null,
        }),
      });

      this.setState([...this.state, createdPost]);

      push(`/documents/${createdPost.id}`);
    } else if (className === "options") {
      const $li = e.target.closest("li");
      await request(`/documents/${$li.dataset.id}`, {
        method: "DELETE",
      });

      const nextState = await request("/documents", {
        method: "GET",
      });
      const parentPost = $li.parentNode.previousSibling;

      if (parentPost.dataset) {
        const { id } = parentPost.dataset;
        push(`/documents/${id}`);
      } else {
        push("/");
      }
      this.setState(nextState);
    } else if (className === "createSubDocument") {
      const { id } = e.target.closest("li").dataset;

      await request("/documents", {
        method: "POST",
        body: JSON.stringify({
          title: "제목 없음",
          parent: id,
        }),
      });

      const nextState = await request("/documents", {
        method: "GET",
      });

      this.setState(nextState);
    } else {
      const $li = e.target.closest("li");
      if ($li) {
        const { id } = $li.dataset;
        onClickPost(this.state, id);
        push(`/documents/${id}`);
      }
    }
  });
}
