export const displayDocumentList = (documents) => {

    return `<ul>
                ${posts.map( document => 
                        `<li data-id = "${document.id}" name = "list">
                            ${document.title}
                            <button name = "button" data-id ="${document.id}"${document.id}">Add</button>
                            ${document.documents.length ? displayPostList(document.documents): ''}
                        </li>`
                        ).join('')}
                        
            </ul>`

}

