export default function MainPage({ $target }) {
    const $mainPage = document.createElement('div')
    
    this.render = () => `<img src="/assets/Diamond.gif"><div id='mainTitle'>안녕하세오.😃<br>송송노션-이에오.</div>`

     this.render(
         $target.appendChild($mainPage)
     )
}