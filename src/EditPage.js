export default function EditPage({ $target, initialState }) {
	this.state = initialState;
  /**
   * initialState format
   * documentTitle:'',
			documentContent:'',
   *
   */
	const $editPage = document.createElement("div");
	$editPage.setAttribute("id", "edit-page");

	$target.appendChild($editPage);

	const $editTitle=document.createElement('div')
  const $editContent=document.createElement('div')
	$editPage.appendChild($editTitle)
  $editPage.appendChild($editContent)

	this.setState = (nextState) => {
		this.state = nextState;
		this.render();
	};
	this.render = () => {
    const {documentTitle,documentContent}=this.state
    // console.log(documentTitle);
    $editTitle.innerHTML=`
    <textarea rows='1' cols="50" id="textarea-title" placeholder="제목 없음">${documentTitle===undefined?'':documentTitle}</textarea>
    `
		$editContent.innerHTML = /* html */`
		
    <textarea rows="100" cols="100" id="textarea-content" placeholder="content">
      ${documentContent===null?'':documentContent}
      
    </textarea>
    
    
    `;
	};
	this.render();
}
