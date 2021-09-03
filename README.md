# Hi, No#tation !

## 목적

- SPA 애플리케이션 과정을 직접 부딪히며 익혀보자!
- Vanilla JS에 대한 역량을 좀 더 길러보자!
- 멋진 에디터를 만들어 보자! (진행 중)

---

## 💡 배운 점

1. `eslint`, `prettier` 등의 linter, formatter을 직접 설정하며 사용 방법을 익힐 수 있었어요! 💪🏻
2. `webpack` bundler를 직접 설정해보면서, 빌드 과정 및 세부 설정들을 좀 더 이해할 수 있었어요! 💪🏻
3. 어떤 디렉토리 구조가 나을지 고민하며, 좀 더 가독성을 높이려 체계적으로 나누려 노력해보았어요! 💪🏻
4. 고민을 겪어가보며 `SPA` route를 직접 설정해보며 `historyAPI`와 한계에 대해 더욱 이해할 수 있었어요! 💪🏻
5. 상태 관리를 직접 해보면서, `React` 등의 라이브러리의 작동 과정을 더욱 이해할 수 있었어요! 💪🏻
6. 자바스크립트만으로 특정 기능을 구현함으로써 기본 메서들을 더욱 잘 활용할 수 있었어요! 💪🏻

---

## 💧 아쉬운 점

1. 결국 에디터를 직접 구현하지는 못했다는 점이 아쉬워요! 😂
2. 주어진 기간에 대해 완전한 요구사항을 진행하지 못했어요! 😂
3. 상태 관리에 대해 단방향적으로 이루어진 것 같지 않아 아쉬웠어요! 😂

---

## 프로젝트 과정 📃

**과정을 되짚어보며 스스로 돌아볼 수 있는 시간을 가지기 위해** 글로 남겨두었어요.

> ### **프로젝트 과정은 다음 글들을 통해 확인이 가능합니다!**

- [불러오기 기능 구현하기](https://velog.io/@young_pallete/Project-PostList-%EB%B6%88%EB%9F%AC%EC%98%A4%EA%B8%B0-%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84)

- [글쓰기 기능 구현하기](https://velog.io/@young_pallete/Project-%EA%B8%80%EC%93%B0%EA%B8%B0-%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84)

- [라우트 구현하기](https://velog.io/@young_pallete/%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-JavaScript%EB%A1%9C-%EB%9D%BC%EC%9A%B0%ED%8A%B8-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0)

- [웹팩 직접 설정해보던 과정](https://velog.io/@young_pallete/javaScript%EC%97%90-webpack-%EB%8B%AC%EA%B8%B0)

- [토글 구현 과정](https://velog.io/@young_pallete/Project-%EC%9E%AC%EA%B7%80%EB%90%9C-%EB%85%B8%EB%93%9C%EC%97%90-%ED%86%A0%EA%B8%80-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0)

- [모달을 통한 api 기반 삭제/생성 구현 과정](https://velog.io/@young_pallete/Project-%EB%AA%A8%EB%8B%AC%EC%9D%84-%ED%86%B5%ED%95%9C-%EC%83%9D%EC%84%B1%EC%82%AD%EC%A0%9C-%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84)

- [SPA 새로고침 404 status issue 해결](https://velog.io/@young_pallete/Project-%EB%B9%88-%ED%8E%98%EC%9D%B4%EC%A7%80-%EB%B0%8F-%EB%AA%A8%EB%8B%AC-%EC%83%9D%EC%84%B1%ED%95%98%EA%B8%B0)

- [복잡한 구조 부담을 덜기 위한 절대 경로 설정](https://velog.io/@young_pallete/Project-webpack-resolve-%EC%84%A4%EC%A0%95%EC%9C%BC%EB%A1%9C-%EC%A0%88%EB%8C%80%EA%B2%BD%EB%A1%9C-%EB%B0%8F-%ED%99%95%EC%9E%A5%EC%9E%90-%EA%B4%80%EB%A6%AC%ED%95%98%EA%B8%B0)

- [Custom Event를 통한 전역에서의 상태 변경 (Editor title 변경 -> sideBar title 변경)](https://velog.io/@young_pallete/Project-%EC%BB%A4%EC%8A%A4%ED%85%80-%EC%9D%B4%EB%B2%A4%ED%8A%B8%EB%A1%9C-%EC%96%B4%E3%85%A1%EC%8D%B8%ED%95%98%EA%B2%8C-%EC%83%81%ED%83%9C-%EB%B3%80%EA%B2%BD%ED%95%98%EA%B8%B0)

---

## 차후 진행 예정 🔥

1. `PostEditPage`에서 노션처럼 상위 디렉토리 구조 표시! ⛏
2. 간단한 로그인/로그아웃 기능 구현 ⛏
3. Rich한 Editor 생성 ⛏
4. 단방향적인 상태 관리 변경 리팩토링! ⛏

---

## 동작 과정 🔍

다음과 같이 기존 고려했던 기능들을 잘 구현했답니다!

> 디자인은 많이 아쉽지만, 차후 더 어ㅡ썸하게 찾아 오겠읍니다! 😆

---

## 세부 구조

```
|   .babelrc
|   .eslintignore
|   .eslintrc
|   .gitignore
|   .prettierrc
|   client.env
|   index.html
|   jsconfig.json
|   package-lock.json
|   package.json
|   README.md
|   tree.txt
|   webpack.config.cjs
|
\---src
    |   App.js
    |   index.js
    |
    +---apis
    |   |   request.js
    |   |   router.js
    |   |
    |   \---route
    |       \---post
    |               createPost.js
    |               deletePost.js
    |               getPost.js
    |               getPostList.js
    |               updatePost.js
    |
    +---components
    |   |   Header.js
    |   |   Post.js
    |   |   PostForm.js
    |   |   SideBar.js
    |   |
    |   \---common
    |           Button.js
    |           Input.js
    |           Modal.js
    |
    +---pages
    |       MainPage.js
    |       PostEditPage.js
    |
    +---sass
    |   |   main.scss
    |   |   _color.scss
    |   |   _mixin.scss
    |   |   _variables.scss
    |   |
    |   +---component
    |   |       component.scss
    |   |       header.scss
    |   |       modal.scss
    |   |       postForm.scss
    |   |       sidebar.scss
    |   |
    |   \---pages
    |           pages.scss
    |
    +---static
    |   \---images
    |           logo.png
    |
    \---utils
            checkState.js
            classNames.js
            constants.js
            customDOMMethods.js
            customEvent.js
            debounce.js
            storage.js

```
