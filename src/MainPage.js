export default function MainPage({ $target }) {
    const $mainPage = document.createElement('div')
    
    this.render = () => `<img id='helpMe' src='/assets/hempMe.png'><div id='mainTitle'>일주일<br>갈았어요.</div>`

     this.render(
         $target.appendChild($mainPage)
     )
}