import Account from './Account.js'
import Documents from './Documents.js'


export default function SideBar ({ $target, initialState}) {
    const $aside = document.createElement('aside')
    $aside.className = 'SideBar'
    $target.appendChild($aside)

    new Account({
        $target: $aside,
        username: "Alice",
        message: "타임어택.... ㅠㅠ"
    })

    new Documents({
        $target: $aside,
        initialState
    })

    this.render = () => {
        $target.appendChild($aside)
    }

    this.render()
}