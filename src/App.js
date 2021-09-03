import PostsPage from "./PostsPage.js";
import EditPage from "./EditPage.js";
import MainPage from "./MainPage.js";

export default function App({ $target }) {
  const $postsPageContainer = document.createElement('div')
  const $editPageContainer = document.createElement('div')

  $postsPageContainer.className = 'postsPageContainer';
  $editPageContainer.className = 'editPageContainer';

  $target.appendChild($postsPageContainer)
  $target.appendChild($editPageContainer)

  const postsPage = new PostsPage({
    $target: $postsPageContainer,
    initialState: [],
    onClick: (id) => {
      if(id === 'null') history.pushState(null, null, `/`)
      else history.pushState(null, null, `/documents/${id}`)
      this.route()
    }
  });

  const mainPage = new MainPage({
    $target: $editPageContainer
  })

  const editPage = new EditPage({
    $target: $editPageContainer,
    initialState: {
      id: null
    },
    onChange: (nextState) => {
      postsPage.onChange(nextState)
    }
  })

  this.route = () => {
    const { pathname } = window.location
    $editPageContainer.innerHTML = ''
    if(pathname === '/') {
      postsPage.render()
      $editPageContainer.innerHTML = mainPage.render()
    } else if (pathname.indexOf('/documents/') === 0) {
      const [, , id] = pathname.split('/')
      postsPage.render()
      editPage.setState({ id })
    }
  }

  this.route();
}