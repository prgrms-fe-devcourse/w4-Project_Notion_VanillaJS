export default function Editor({
	$target,
	initialState = { title: "", content: "" },
	onEditing,
}) {
	const $editor = document.createElement("div");

	let isinitialize = false;

	this.state = initialState;
	$target.appendChild($editor);

	this.setState = (nextState) => {
		this.state = nextState;
		$editor.querySelector("[name=title]").value = this.state.title;
		$editor.querySelector("[name=content]").innerHTML =
			this.state.content.replace(/\n/g, "<br>");
		this.render();
	};
	this.render = () => {
		if (!isinitialize) {
			$editor.innerHTML = `
          <input type="text" name="title" style="width:600px" value="${this.state.title}"/>
          <div name="content" contentEditable="true" style="width:600px;height:400px">${this.state.content}</div>
          `;
			isinitialize = true;
		}
	};
	this.render();

	$editor.querySelector(`[name=title]`).addEventListener("keyup", (e) => {
		const nextState = {
			...this.state,
			title: e.target,
		};
		this.setState(nextState);
		onEditing(this.state);
	});

	$editor.querySelector(`[name=content]`).addEventListener("input", (e) => {
		const nextState = {
			...this.state,
			title: e.target,
		};
		this.setState(nextState);
		onEditing(this.state);
	});
} //Editor
