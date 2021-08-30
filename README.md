# 노션 클로닝 프로젝트

## 기본 요구사항

바닐라 JS만을 이용해 노션을 클로닝합니다.

기본적인 레이아웃은 노션과 같으며, 스타일링, 컬러값 등은 원하는대로 커스텀합니다.

- 글 단위를 Document라고 합니다. Document는 Document 여러개를 포함할 수 있습니다.
- 화면 좌측에 Root Documents를 불러오는 API를 통해 루트 Documents를 렌더링합니다.
  - Root Document를 클릭하면 오른쪽 편집기 영역에 해당 Document의 Content를 렌더링합니다.
  - 해당 Root Document에 하위 Document가 있는 경우, 해당 Document 아래에 트리 형태로 렌더링 합니다.
  - Document Tree에서 각 Document 우측에는 + 버튼이 있습니다. 해당 버튼을 클릭하면, 클릭한 Document의 하위 Document로 새 Document를 생성하고 편집화면으로 넘깁니다.
- 편집기에는 기본적으로 저장 버튼이 없습니다. Document Save API를 이용해 지속적으로 서버에 저장되도록 합니다.
- History API를 이용해 SPA 형태로 만듭니다.
  - 루트 URL 접속 시엔 별다른 편집기 선택이 안 된 상태입니다.
  - /documents/{documentId} 로 접속시, 해당 Document 의 content를 불러와 편집기에 로딩합니다.

## 보너스 요구사항

- 기본적으로 편집기는 textarea 기반으로 단순한 텍스트 편집기로 시작하되, 여력이 되면 div와 contentEditable을 조합해서 좀 더 Rich한 에디터를 만들어봅니다.
- 편집기 최하단에는 현재 편집 중인 Document의 하위 Document 링크를 렌더링하도록 추가합니다.
- 편집기 내에서 다른 Document name을 적은 경우, 자동으로 해당 Document의 편집 페이지로 이동하는 링크를 거는 기능을 추가합니다.
- 그외 개선하거나 구현했으면 좋겠다는 부분이 있으면 적극적으로 구현해봅니다!

## API 사용법

기본적으로 모든 API에는 headers에 아래의 값을 넣어야 합니다.

```
'x-username': '다른 사람과 겹치지 않는 고유한 이름'
```

header에 해당 값이 누락이 되면 API 호출에 실패합니다.

## 구현 리스트

- [x] api.js 작성
  - [x] Root Document 가져오기
  - [x] Document id 로 해당 Document content, 하위 Document 목록 가져오기
  - [x] Document 생성하기
  - [x] 특정 Document 수정하기
  - [x] 특정 Document 삭제하기
- [x] route.js 작성
  - [x] rootPage
  - [x] documentPage
- [ ] Component 작성

  - [ ] App
    - [ ] ListPage
      - (Favorites)
      - [ ] Documents
    - [ ] ContentPage
      - [x] Editor
        - [x] Title
        - [x] Content
      - [ ] 하위 Documents

- 기능 구현

  - [x] Document List에서 Document 클릭시 Content 렌더링
  - [ ] 선택한 Document 하위 Document 있을경우 트리 형태로 아래 목록 렌더링
    - [x] 모든 하위 Document 렌더링
    - [x] 선택했을때만 Document 렌더링
  - [x] Document 생성하고 편집화면으로 넘김
  - [x] 기록할때마다 자동 저장
  - [x] 제목 수정시 ListPage도 state변경, 반영
  - [ ] div , contentEditable을 통해 다양한 기능의 에디터 만들기
  - [x] 편집기 내에서 하위 Document 링크 렌더링
  - [ ] 편집기 내에서 다른 Document name을 적을 시 자동으로 해당 Document의 편집 페이지로 이동하는 링크 기능 추가
  - [x] document 삭제기능
  - [ ] XSS 공격 방지
  - [ ] 하위 Document 옮기기 기능
  - [x] Favorite Documents

- 다음에 할일
  - [x] Document를 클릭했을때, DocumentsList가 새로 렌더링되며 토글 된 Tree가 사라지는 현상. - 토글을 시켰을때, 토글된 id를 state에서 기억한다. - tree 렌더링을 실행하고, 토글된 id에 한해서 내부 Tree를 렌더링한다.
  - [x] 상위 Document를 삭제했을때, 하위 Document가 삭제 되지 않고 root Document로 이동되는 문제
    - [x] 삭제 진행시, 해당하위 document들을 순회하며 삭제요청
  - [x] 새로고침시, 선택된 Document 표시 안되는 문제
  - [ ] 커서 올릴때, 하위 문서의 버튼도 보이게 되는 문제 (CSS)
  - [x] State관리를 모두 App.js의 state에서 모아 관리하는 방식으로 변경
  - [ ] Toggled된 Documents 삭제시 LocalStorage에 dummy-data 쌓이는 문제
  - [x] Favorite 된 Documents 삭제시 localStorage에 dummy-data 쌓이는 문제
