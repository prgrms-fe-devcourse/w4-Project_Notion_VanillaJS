export const editorTemplate = (title, content) => {
    return `
        <input type="text" name="title" style="width:800px; height: 50px; border:none; value="${title}" placeholder="제목없음"/>
        <textarea name="content" style="width:800px; height:600px; border:none" placeholder="내용을 입력해주세요.">${content}</textarea>    
    `
}
