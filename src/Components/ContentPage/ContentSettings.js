import { push } from "../../router.js";

export default function ContentSettings({ $target, initialState, onDelete }) {
  const $settings = document.createElement("div");
  $target.appendChild($settings);

  // State, setState
  //    state : { id: documentId, underDocuments: Array }
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;

    this.render();
  };

  this.render = () => {
    $settings.innerHTML = `
        <button class="content-settings_delete">delete this Document</button>

        `;
  };

  // EventHandler
  $settings.addEventListener("click", async (e) => {
    const { target } = e;
    if (target.classList.contains("content-settings_delete")) {
      const { id, underDocuments } = this.state;
      await deleteDocument(id, underDocuments);
      push("/");
    }
  });

  // Function

  const deleteDocument = async (id, underDocuments) => {
    await onDelete(id);
    if (underDocuments.length > 0) {
      await underDocuments.forEach(async (document) => {
        deleteDocument(document.id, document.documents);
      });
    }
  };
}
