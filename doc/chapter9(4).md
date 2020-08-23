# DRF-React Study

## Chapter 9. 리액트 기초 익히기

### immer를 활용한 손쉬운 불변객체 다루기

- 불변성(immutable)

  - 리액트에서는 불변성을 유지하면서, 상탯값을 업데이트해야만 한다.
  - immer를 활용하면 그나마 편해짐

- immer 설치

  - `yarn add immer`

- test code

  - ```javascript
    const { produce } = require('immer');
    
    const fruits = ['오렌지', '사과', '바나나', '레몬'];
    
    const newF = produce(fruits, (draft) => {
      draft.splice(1, 2, '딸기');
    });
    
    console.log(newF);
    ```

- test code 2

  - ```javascript
    const baseState = [
      { todo: '배우자 ES6', done: true },
      { todo: '시도하자 immer', done: false },
    ];
    
    // immer를 안쓸경우
    const newState0 = [
      ...baseState.map((tweet, index) =>
        index === 1 ? { ...tweet, done: true } : tweet,
      ),
      { todo: 'Tweet about it' },
    ];
    
    // immer를 쓸경우
    const newState = produce(baseState, (draft) => {
      draft[1].done = true;
      draft.push({ todo: 'Tweet about it' });
    });
    
    console.log(newState0);
    console.log(newState);
    ```

### 클래스 컴포넌트, 생명주기

- constructor

  - 생성자
  - 초기 속성값으로부터 상탯값을 만들어낼 때 구현
  - 생성자 내에서의 setState 호출은 무시 ( mount 이후에만 유효 )

- getDerivedStateFromProps

  - 정적 메서드로서 this 객체 접근을 원천적으로 봉쇄
  - 속성값 변화에 따라 외부 API 호출이 필요하다면
    - componentDidUpdate에서 구현
  - 속성값을 계산하여 상탯값에 반영이 필요할때
    - 메모이제이션이 필요
    - render에서 lodash/momoize 패키치 활용 추천

- render

  - 화면에 보여질 내용을 반환
    - 반환 가능 타입 : 리액트 컴포넌트, 배열, 문자열/숫자, null/bool 등
    - 속성값과 상태값만으로 반환값 결정
    - 순수함수로 구현, setState호출하지 않기
    - No side effects
  - 컴포넌트를 다른 특정 DOM요소에 렌더링이 필요할때
    - ReactDOM.createPortal 사용
      - modal 처리시 유용

- componentDidMount

  - 이벤트 리스너 등록이 필요할 때
  - 직접적으로 setState가 필요하다면, Render 단계에서 수행

- 클래스형 컴포넌트 추천 작성 순서

  > 실전 리액트 프로그래밍, p166

  - propTypes 타입 정의
  - state 초기화
  - render를 제외한 생명주기 메서드
  - 생명주기 메서드를 제외한 나머지 메서드
  - render 메서드
  - 컴퍼넌트 외부에서 정의하는 변수와 함수

- 