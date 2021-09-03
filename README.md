# 노션 클로닝 프로젝트
![](https://images.velog.io/images/rlacksals96/post/6eb36d2b-4c71-4a14-afc2-13e239900ebf/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-09-03%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%207.11.42.png)
좌측의 네이게이션 바를 통해 본인이 원하는 페이지를 제작할 수 있으며, `raw`에서 Markdown 문법을 활용하여 문서를 작성하면 `preview`에서 랜더링된 결과를 확인할 수 있다

![](https://images.velog.io/images/rlacksals96/post/12fe832e-a045-4dd8-81a4-3a876a682f8c/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-09-03%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%207.11.29.png)
`help`버튼을 통해 지원하는 Markdown 문법을 확인할 수 있고, 해당 안내를 참고하여 페이지를 작성하면 된다.(+ 이미지의 경우 `(w: 너비 h: 높이)`를 입력하여 크기를 지정할 수 있으며, 별도로 지정하지 않는 경우 200*100 크기로 기본 랜더링 된다)

![](https://images.velog.io/images/rlacksals96/post/94ac6369-d47d-45ea-a047-be33fd9175f3/image.png)

도큐먼트를 트리 구조로 구현하였다. `carot`을 클릭하면 하위 페이지 리스트가 나타나고, `제목`을 클릭하면 해당 도큐먼트가 랜더링 된다. 마우스를 도큐먼트 리스트에 올리면 `도큐먼트 삭제 버튼`과 `하위 페이지 추가 버튼`이 나타난다. 



![](https://images.velog.io/images/rlacksals96/post/e44b343f-af84-4905-a75f-183665892b03/image.png)
별도의 저장 버튼은 존재하지 않으며, 2초동안 도큐먼트를 작성하지 않는 경우, 자동으로 서버에 내용이 저장되며 피드백으로 안내 메시지가 나타난다

![](https://images.velog.io/images/rlacksals96/post/e476c0d9-1410-413c-a692-e21de717f072/image.png)
`editor`하단에는 하위 페이지 목록이 존재하며 원하는 페이지를 클릭하면 자동으로 해당 페이지로 이동한다.

![](https://images.velog.io/images/rlacksals96/post/39bacd9e-ef85-45d9-bf36-c29045047234/image.png)
새 페이지를 생성은 해당 버튼을 클릭하면 되며, input창에 제목을 입력후 `Enter`를 입력하면 페이지가 생성된다.

![](https://images.velog.io/images/rlacksals96/post/91995b33-cc3d-4f4b-af9f-7dca45c22924/image.png)
하위 페이지 생성은 상위 페이지 옆에 있는 `+`버튼을 누른후, 제목을 입력하면 된다.
## 👩‍💻 요구 사항과 구현 내용 <!-- 기능을 Commit 별로 잘개 쪼개고, Commit 별로 설명해주세요 -->

### 기본 요구사항
|번호|요구내용|구현여부|
|--|------|------|
|1|화면 좌측에 Root Documents를 불러오는 API를 통해 루트 Documents를 렌더링합니다.|O|
|2|Root Document를 클릭하면 오른쪽 편집기 영역에 해당 Document의 Content를 렌더링합니다.|O|
|3|해당 Root Document에 하위 Document가 있는 경우, 해당 Document 아래에 트리 형태로 렌더링 합니다.|O|
|4|Document Tree에서 각 Document 우측에는 + 버튼이 있습니다. 해당 버튼을 클릭하면, 클릭한 Document의 하위 Document로 새 Document를 생성하고 편집화면으로 넘깁니다. |O|
|5|편집기에는 기본적으로 저장 버튼이 없습니다. Document Save API를 이용해 지속적으로 서버에 저장되도록 합니다.|O|
|6|History API를 이용해 SPA 형태로 만듭니다.|O|
|7|루트 URL 접속 시엔 별다른 편집기 선택이 안 된 상태입니다.|O|
|8|/documents/{documentId} 로 접속시, 해당 Document 의 content를 불러와 편집기에 로딩합니다.|O|



### 보너스 요구사항

|번호|요구내용|구현여부|
|--|------|------|
|1|기본적으로 편집기는 textarea 기반으로 단순한 텍스트 편집기로 시작하되, 여력이 되면 div와 contentEditable을 조합해서 좀 더 Rich한 에디터를 만들어봅니다.|▲|
|2|편집기 최하단에는 현재 편집 중인 Document의 하위 Document 링크를 렌더링하도록 추가합니다.|O|
|3|편집기 내에서 다른 Document name을 적은 경우, 자동으로 해당 Document의 편집 페이지로 이동하는 링크를 거는 기능을 추가합니다.|X|
|4|그외 개선하거나 구현했으면 좋겠다는 부분이 있으면 적극적으로 구현해봅니다! |O|

### 개별 추가 구현


|번호|요구내용|구현여부|
|--|------|------|
|1|제목의 경우, 별도의 HTML tag를 사용하지 않았기에 ContentEditable을 사용하여 제목을 구현하였으나, content의 경우 여러가지 HTML tag들로 인해 textarea 기반으로 구현|O|
|2|textarea에 작성된 markdown language 일부를 HTML로 번역하여 랜더링 해주는 기능 구현|O|
|3|마크다운 문법중 이미지의 경우 별도로 크기를 명시하면 해당 크기로 랜더링 된다(사용법은 `help`버튼을 클릭하여 확인할 수 있다)|O|
|4|서버에 저장시 안내 페이지 자동으로 표시|O|
|5|help버튼에 hover시 지원되는 markdown 안내 페이지 표시됨 |O|
|6|하위 페이지 추가 버튼(`+`), 페이지 삭제 버튼(`X`)의 경우, 추가하고자 하는 상위 페이지 위에 마우스를 올려야 보인다|O|
|7|페이지 추가시 제목을 별도로 입력 받으며, `Enter`키를 누르면 자동으로 페이지가 생성되고, `ESCAPE`를 누르면 취소된다|O|

## ✅ PR 포인트 & 궁금한 점 <!-- 리뷰어 분들이 집중적으로 보셨으면 하는 내용을 적어주세요 -->

### App.js
* `App.js`에서 `Navigation, Editpage, SubDocsPage document`에 대한 `controller(콜백함수)`를 모두 구현하였고, 상태변화가 있을때 `App.setState()`를 통해 `state`를 관리한다

### Navigation.js
* 페이지를 생성하면 자동으로 도큐먼트 트리에 맞게 다시 랜더링 되도록 구현
* 각 도큐먼트 리스트 별로 carot, 제목, +, - 버튼이 존재하며, 각 요소별로 어떤 것을 클릭했는지 인식은 `Boubling` 기법을 사용하여 구현
  * `carot`: 클릭시 하위 도큐먼트 트리 랜더링
  * `제목`: 해당 도큐먼트가 `editpage`에 랜더링
  * `+`: 해당 도큐먼트의 하위 페이지를 추가한다
  * `-`: 해당 도큐먼트가 삭제(현재 보고있는 도큐먼트인 경우, editpage가 빈 페이지로 변한다)

### Editpage.js
* `localStorage`에 저장후 서버에 저장하여 코드의 누락 가능성을 최소화하였고, 서버에 전송 완료되는 즉시 우상단에 서버 저장 안내 메시지가 전달
* `debounce기법`을 사용하여 2초마다 입력 여부를 확인후 2초 동안 입력된 문자열이 없는 경우 자동 저장되도록 기능을 구현

### SubDocsPage.js
* `Navigation component`의 `controller 함수`인 `OnClickTitle()` 실행시, `server`로 부터 받은 도큐먼트의 정보를 바탕으로 `Editpage component`와 `SubDocsPage component`가 동시에 랜더링 된다.

## API 사용법

기본적으로 모든 API에는 headers에 아래의 값을 넣어야 합니다.

```
'x-username': '다른 사람과 겹치지 않는 고유한 이름'
```

header에 해당 값이 누락이 되면 API 호출에 실패합니다.

### Root Documents 가져오기

전체 Document의 구조를 트리 형태로 가져옵니다.

> https://kdt.roto.codes/documents - GET

Response의 형태는 아래와 같습니다.
```
[
  {
    "id": 1, // Document id
    "title": "노션을 만들자", // Document title
    "documents": [
      {
        "id": 2,
        "title": "블라블라",
        "documents": [
          {
            "id": 3,
            "title": "함냐함냐",
            "documents": []
          }
        ]
      }
    ]
  },
  {
    "id": 4,
    "title": "hello!",
    "documents": []
  }
]
```

### 특정 Document의 content 조회하기

> https://kdt.roto.codes/documents/{documentId} - GET

Response의 형태는 아래와 같습니다.

```
{
  "id": 1,
  "title": "노션을 만들자",
  "content": "즐거운 자바스크립트의 세계!",
  "documents": [
    {
      "id": 2,
      "title": "",
      "createdAt": "",
      "updatedAt": ""
    }
  ],
  "createdAt": "",
  "updatedAt": ""
}
```

### Document 생성하기

> https://kdt.roto.codes/documents - POST

request body에 JSON 형태로 아래처럼 값을 넣어야 합니다.

```json
{
  "title": "문서 제목",
  // parent가 null이면 루트 Document가 됩니다.
  // 특정 Document에 속하게 하려면 parent에
  // 해당 Document id를 넣으세요.
  "parent": null
}
```

생성에 성공하면 reponse에 아래처럼 생성된 결과를 내려줍니다.

```json
{
  "id": 6,
  "title": "문서 제목",
  "createdAt": "생성된 날짜",
  "updatedAt": "수정된 날짜"
}
```

### 특정 Document 수정하기

> https://kdt.roto.codes/documents/{documentId} - PUT

request body에 수정할 내용을 JSON 형태로 넣으면 됩니다.
```json
{
  "title": "제목 수정",
  "content": "내용 수정"
}
```

### 특정 Document 삭제하기

> https://kdt.roto.codes/documents/{documentId} - DELETE

documentId에 해당하는 Document를 삭제합니다.

만약 하위 documents가 있는 document를 삭제한 경우, 하위 documents 등은 상위 document가 없어지므로 root document로 인식됩니다.
