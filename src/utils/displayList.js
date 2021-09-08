export const displayDocumentList = (documents) => {
  return `<ul>
                ${documents
                  .map(
                    (document) =>
                      `<li data-id = "${document.id}" name = "list">
                           ${document.title}
                            <span class ="btn-box"><button name = "add-btn" data-id ="${
                              document.id
                            }"><i class="far fa-plus-square"></i></button>
                            <button name = "remove-btn" data-id ="${
                              document.id
                            }"><i class="far fa-minus-square"></i></button></span>
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
