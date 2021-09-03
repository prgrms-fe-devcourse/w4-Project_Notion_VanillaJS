export const displayPostList = (posts) => {

    return `<ul>
                ${posts.map( post => 
                        `<li data-id = "${post.id}" name = "list">
                            ${post.title}
                            <button name = "button" data-id ="${post.id}"${post.id}">Add</button>
                            ${post.documents.length ? displayPostList(post.documents): ''}
                        </li>`
                        ).join('')}
                        
            </ul>`

}

