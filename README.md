# 노션 클로닝 프로젝트

## 기본 요구사항

- [x] 글 단위를 Document라고 합니다. Document는 Document 여러개를 포함할 수 있습니다.

- [x] 화면 좌측에 Root Documents를 불러오는 API를 통해 루트 Documents를 렌더링합니다.

  - [x] Root Document를 클릭하면 오른쪽 편집기 영역에 해당 Document의 Content를 렌더링합니다.
  - [x] 해당 Root Document에 하위 Document가 있는 경우, 해당 Document 아래에 트리 형태로 렌더링 합니다.
  - [x] Document Tree에서 각 Document 우측에는 + 버튼이 있습니다. 해당 버튼을 클릭하면, 클릭한 Document의 하위 Document로 새 Document를 생성하고 편집화면으로 넘깁니다.

- [x] 편집기에는 기본적으로 저장 버튼이 없습니다. Document Save API를 이용해 지속적으로 서버에 저장되도록 합니다.

- [x] History API를 이용해 SPA 형태로 만듭니다.
  - [ ] 루트 URL 접속 시엔 별다른 편집기 선택이 안 된 상태입니다.
  - [x] `/documents/{documentId}` 로 접속시, 해당 Document 의 content를 불러와 편집기에 로딩합니다.

## 추가 기능 구현사항

- div - contentEditable을 활용한 에디터 구현
- Editor markdown 문법 자동 변환 기능 추가하기
  - [] `#, ##, ###` 헤더 기능 추가
  - [] `>` 인용문 기능 추가
  - [] `** **` 강조 효과 기능 추가
- [] 즐겨찾기 페이지 목록 추가하기 (favoriteDocumentList)
- [] 편집기 내에서 다른 Document name을 적은 경우, 자동으로 해당 Document의 편집 페이지로 이동하는 링크를 거는 기능을 추가합니다.
