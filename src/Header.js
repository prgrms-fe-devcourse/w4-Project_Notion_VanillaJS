export default function Header({$target}){
    const sideBar = $target.querySelector('nav')
    const mainHeader = document.createElement('div')
    mainHeader.classList.add('main-header')

    sideBar.appendChild(mainHeader)

    this.render = () => {
        mainHeader.innerHTML = `<a class="link" href="/"><b class="link" href="/">Heejin's</b>Notion</a>`
    }
    this.render()
  /*  mainName.innerHTML =`<a href="/" ><b>Heejin's</b> Notion </a>`
    mainName.classList.add('main-title') */
     
}
