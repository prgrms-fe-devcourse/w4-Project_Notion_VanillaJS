import SideBar from './SideBar.js'
import Editor from './Editor.js'

export default function App ({
    $target,
    initialState = [
        {
            "id": 1,
            "title": "Untitled",
            "documents": []
        }
    ]
}) {

    this.state = initialState

    this.setState = () => {}

    this.setState()

    new SideBar ({
        $target, initialState
    })

    new Editor ({
        $target, initialState
    })


}