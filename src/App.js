import Documents from "./Documents.js"

export default function App({ $target, currentState }) {

    new Documents({
        $target,
        currentState,
    })
}
