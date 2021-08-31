import Header from "./Header.js"
import MainPage from "./MainPage.js"
import RootList from "./RootList.js"


export default function App({
  $target
}) {

  const $rootListContainer = document.createElement('div')
  const $mainListContainer = document.createElement('div')

  $target.appendChild($rootListContainer)
  $target.appendChild($mainListContainer)

  new Header({
    $target: $rootListContainer,
    initialState: {
      name: 'jin'
    }
  })
  
  new RootList({
    $target: $rootListContainer
  })

  new MainPage({
    $target: $mainListContainer
  })

}