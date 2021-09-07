export const displayDocumentList = (documents) => {
  return `<ul>
                ${documents
                  .map(
                    (document) =>
                      `<li data-id = "${document.id}" name = "list">
                           ${document.title}
                            <span class ="btn-box"></span><button><i class="far fa-plus-square" name = "add-btn" data-id ="${
                              document.id
                            }"></i></button>
                            <button ><i class="far fa-trash-alt" name = "remove-btn" data-id ="${
                              document.id
                            }"></i></button></span>
                            ${
                              document.documents.length
                                ? displayDocumentList(document.documents)
                                : ""
                            }
                        </li>`
                  )
                  .join("")}
                        
            </ul>`;
};
