# w4-Project_Notion_VanillaJS

## 과제 진행 노트

작업 순서:

1. Set up
2. 문서 목록 보여주기
   1. components
      1. `DocumentsPage`
         1. role
            1. UI 컴포넌트의 상위 컴포넌트로서 UI 컴포넌트에 필요한 데이터를 제공한다
            2. 여기서 문서 목록 UI 컴포넌트는 문서 목록 데이터가 필요한데 해당 데이터는 API 요청을 통해 얻을 수 있으므로 페이지 컴포넌트가 내부적으로 API를 실행한다
         2. state
            1. 페이지 컴포넌트 내부적으로 데이터 관리를 할 수 있으므로 외부의 데이터가 필요 없다. 따라서 state, initialState, setState 메서드 모두 불필요하다.
         3. render
            1. 렌더할 때마다
               1. API 데이터를 갱신해서
               2. 하위 UI 컴포넌트에 전달한 후 (뷰가 변경된다)
               3. (뷰가 변경되었으므로) 상위 컴포넌트에 다시 append한다
      2. `DocumentList`
         1. role
            1. UI 컴포넌트로서 상위 컴포넌트로부터 데이터를 받아 렌더링을 한다
         2. state
            1. state: 상위 컴포넌트가 전달한 데이터(=문서 목록)
            2. setState: 다음 상태를 현재 상태로 반영하고, 상태가 변경되었으므로 렌더 함수를 실행한다
         3. render
            1. 상태 데이터를 보여준다
            2. 문서 목록이 있으면 보여주고, 없으면 없다는 메시지를 보여준다
   2. services
      1. `api.js`: 데이터 요청 API를 한곳에서 관리한다
3. 편집기 보여주기
   1. components
      1. `EditorPage`
         1. role
            1. UI 컴포넌트의 상위 컴포넌트로서 UI 컴포넌트에 필요한 데이터를 제공한다
            2. 문서 데이터는 문서 ID에 따라 달라지는데, URL에 따라 문서 ID가 달라지므로 외부에서 주입해주는 경우가 있다
         2. state
            1. initialState: 
               1. id
               2. title
               3. content
               4. documents ??
            2. setState: 아이디가 변경되면 나머지 state도 따라서 변경시켜서 UI 컴포넌트에 전달한다
         3. render
            1. 변경된 상태를 반영하기 위해 상위 컴포넌트에 다시 append한다
      2. `Editor`
         1. role
            1. UI 컴포넌트
         2. state
            1. state:
               1. id
               2. title
               3. content
               4. documents ??
            2. setState:
               1. 상태 업데이트 후 리렌더
         3. render
            1. 상태 데이터를 보여준다
         4. event
            1. keyup
               1. state 변수인 title과 content를 각각 업데이트 한다
         5. 유저 시나리오에 따른 기능 구현
            1. `임시 저장하기`
               1. key up 이벤트 => onEditing() => setItem()
            2. `임시 저장 불러오기`
               1. 새로고침 하면 임시 저장 데이터를 불러온다 => 새로고침이라는 것은 에디터를 최초 렌더링하는 상황 => 처음 그리는 순간인 new 연산할 때 initialState에 불러온 데이터를 전달한다 => `new Editor({ ..., initialState: tempDoc })` 
