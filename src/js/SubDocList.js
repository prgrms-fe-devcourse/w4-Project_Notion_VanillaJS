export default function SubDocList({ $target, initialState }) {
  const $subDocList = document.createElement("div")
  $subDocList.id = "subDocList"
  $target.appendChild($subDocList)
  this.state = initialState
  this.setState = (nextState) => {
    this.state = nextState
    console.log(this.state.length)
    this.render()
  }

  this.render = () => {
    $subDocList.innerHTML = `
			${
        this.state.length > 0
          ? `<h3> 하위 페이지 </h3>`
          : `<h3>하위 페이지가 없습니다</h3>`
      }
			<div id="listContainer">
				${this.state
          .map(
            (doc) =>
              `<div class="subListItem" data-id="${doc.id}">${doc.title}</div>`
          )
          .join("")}			
			</div>
		`
  }
  this.render()
}
