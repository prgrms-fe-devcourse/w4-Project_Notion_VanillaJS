export const displayDocumentList = (documents) => {

    return `<ul>
                ${documents.map( document => 
                        `<li data-id = "${document.id}" name = "list">
                            ${document.id} : ${document.title}
                            <button name = "add-btn" data-id ="${document.id}">Add</button>
                            <button name = "remove-btn" data-id ="${document.id}">Remove</button>
                            ${document.documents.length ? displayDocumentList(document.documents): ''}
                        </li>`
                        ).join('')}
                        
            </ul>`

}

