import { push } from "../../router.js";

export default function ContentSettings({
  $target,
  initialState,
  onDeleteDocument,
}) {
  const $settings = document.createElement("div");
  $target.appendChild($settings);

  // State, setState
  //    state :  selectedDocument {id: Number , content: String , documents:Array}
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
      const { id, documents: underDocuments } = this.state;
      await deleteDocuments(id, underDocuments);
    }
  });

  // Function

  const deleteDocuments = async (id, underDocuments, isLast = true) => {
    if (underDocuments.length > 0) {
      await underDocuments.forEach(async (document) => {
        await deleteDocuments(document.id, document.documents, false);
      });
    }
    await onDeleteDocument(id, isLast);
  };
}
