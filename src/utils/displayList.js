export const displayDocumentList = (documents) => {

    return `<ul>
                ${documents.map( document => 
                        `<li data-id = "${document.id}" name = "list">
                            ${document.id} : ${document.title}
                            <button name = "button" data-id ="${document.id}">Add</button>
                            ${document.documents.length ? displayDocumentList(document.documents): ''}
                        </li>`
                        ).join('')}
                        
            </ul>`

}

