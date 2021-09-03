export const documentListTemplate = (documents, isRoot = false) => {
    return `
            ${documents
                .map(
                    ({id, title}) => `
                <div data-id="${id}" class="document-title" style="display: ${isRoot ? 'block' : 'none'}">
                    <button class="toggle"><span id="${id}-toggle"></span>&#9654;</button>
                    <button class="document"><span>${title}</span></button>
                    <button class="remove-button btn btn-cyan"><span class="remove-button-text">삭제</span></button>
                    <button class="add-button btn btn-cyan">+<span class="add-button-text">페이지 내에 하위페이지 추가하기</span></button>
                </div>
                `
                )
                .join('')}
            `
}

export const documentTemplate = (id, title) => {
    return `
            <div data-id="${id}" class="document-title" style="display: block">
                <button class="toggle"><span id="${id}-toggle"></span>&#9654;</button>
                <button class="document"><span>${title}</span></button>
                <button class="remove-button btn btn-cyan"><span class="remove-button-text">삭제</span></button>
                <button class="add-button btn btn-cyan">+<span class="add-button-text">페이지 내에 하위페이지 추가하기</span></button>
            </div>  
            `
}
