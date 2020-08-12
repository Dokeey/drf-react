# DRF-React Study

## Chapter 9. 리액트 기초 익히기

### 상탯값

- 상탯값
  - UI(엘리먼트)로의 반영을 위해, 유지해야할 값들의 묶음
  - 상탯값은 어디에 저장/관리되는가
    - 각 컴포넌트 내에서만 사용되는 값들은 컴포넌트 안에서 생성/갱신
      - 리액트 기본으로 동작
    - 여러 컴포넌트에서 사용되는 값들은 별도 공간에서 생성/갱신
      - Redux, Context API, Mobx 등을 활용하면 편리
  - 컴포넌트에서 상탯값에 대한 getter/setter 함수를 제공
    - 상탯값을 직접 변경하진 말자
      - 성능 하락
- setState
  - 비동기로 동작
  - 변경할 특정 state값들이 담긴 object를 지정하거나
  - 함수를 지정 가능 -> 매개변수로 호출되기 직전 상탯값을 받는다 (선호하는 방식)
    - setter에 지정된 함수에서 상탯값을 직접 참조하고 있지 않아도, "직전 상탯값"을 인자로 전달받기 유용
    - immer 라이브러리와 엮어 쓰기도 좋음
  - 상탯값 로직을 컴포넌트에서 분리하는 패턴도 가능
  - setState를 통하지 않고 state값을 직접 변경하면 UI에 자동 반영X
    - UI에 강제반영하기 위해 this.forceUpdate(); 를 사용
  - 클래스형 컴포넌트 생성자에서는 setState 호출은 무시
    - setState 호출은 컴포넌트가 마운트된 이후에만 유효
    - 데이터를 가져오기 위해 API를 호출하고 그 응답을 state에 반영하고하 할 경우
      - componentDidMount 메서드 활용
      - 함수형 컴포넌트에서는 userEffect(() => {}, []) 훅을 활용
- 상탯값을 어디에 저장/관리하는지
  - 컴포넌트 내부
    - 컴포넌트 객체 단위로 상탯값을 유지, 하위 컴포넌트의 속성값으로 전달
    - this.setState 함수, userState 훅을 활용
    - 문제점 : 컴포넌트가 많아지면 복잡해질 수 있음
      - Context API로 쉬워짐
  - 컴포넌트 외부에서 '전역 상태 관리'
    - 외부에 별도의 상탯값 저장소를 둠
    - setter 함수를 제공하기보다, dispatch 함수를 제공
- State Reducer 패턴
  - reduce
    - 상탯값을 누적/적용해서 현재의 상태값을 이뤄낸다는 의미
  - Redux
    - setter 제공 X, dispatch를 제공
- Context API를 활용할 경우
  - 중간지점 컴포넌트를 거치지 않아도 해당 상태값을 한번에 접근할 수 있음
- 리액트 개발의 핵심
  - 어떻게 하면 상탯값을 효율적으로 관리하는가
  - 상탯값에 따라 화면이 불필요하게 업데이트되지 않도록 하자

### 속성값

- 속성값
  - 컴포넌트 생성 시에 넘겨지는 값의 목록
    - 읽기 전용으로 취급하고, 변경하지 않음
    - 자식 컴포넌트 입장에서는 데이터/함수를 전달받는 유일한 통로
      - Context API로 인해 새로운 통로가 생김
    - 부모 컴포넌트의 데이터/함수를 자식 컴포넌트에게 넘겨주게 됨
    - 컴포넌트는 HOC 기법을 통해 Redux의 값이나 함수를 넘겨 받기도 함
  - 값 지정 시에 중괄호를 통해 다양한 타입의 값 및 표현식 지정 가능

- 속성값이 변경될때 API 호출하기

  - getDerivedStateFromProps 도 사용할 수 있지만, 정적 메서드이기에 this 객체에 접근 불가

  - 그렇기에 componentDidUpdate(props)에서 처리

  - ```javascript
    class PostDetail extends React.Component {
      state = {
        postDetail: null,
      };
      componentDidMount() {
        const { postId } = this.props;
        this.requestPost(postId);
      }
      componentDidUpdate(prevProps) {
        const { postId } = this.props;
        if (postId !== prevProps.postId) {
          this.requestPost(postId);
        }
      }
      requestPost(postId) {
        console.log(postId);
        this.setState({
          postDetail: null,
        });
        setTimeout(() => {
          this.setState({
            postDetail: `로딩된 post #${postId}`,
          });
        }, 1000);
      }
      render() {
        const { postId } = this.props;
        const { postDetail } = this.state;
        return (
          <div>
            {postId} : {postDetail && postDetail}
            {!postDetail && '로딩중 .. '}
          </div>
        );
      }
    }
    
    class Post extends React.Component {
      state = {
        postId: 10,
      };
      render() {
        return (
          <div>
            <PostDetail postId={this.state.postId} />
            <Button onClick={() => this.setState({ postId: 20 })}>
              postId 변경
            </Button>
          </div>
        );
      }
    }
    ```



### 속성값 타입 및 디폴트값 정의하기

- 각 속성값에 대한 타입 명시 및 필수 여부 지정하기 

  - 생산성때문

  - TypeScript와 같은 정적 언어를 사용하거나

  - prop-types 팩키지를 통해 속성값에 타입을 지정할 수 있음

  - ```javascript
    static propTypes = {
      postId: PropTypes.number.isRequired,
    };
    // 클래스형일때
    
    ThemedButton.propTypes = {
      theme: PropTypes.string,
      label: PropTypes.string.isRequired,
    };
    // 함수형일때
    ```

    

- recompose의 고차 컴포넌트 활용



### 이벤트 처리하기

- 이벤트
  - 컴포넌트에는 여러 이벤트가 발생
    - 이벤트에 대한 처리를 커스텀
  - 웹브라우저의 HTML이벤트를 기본적으로 지원
    - 이벤트 핸들러 속성명은 camelCase로만 작성
      - HTML에서는 onclick, 리액트는 onClick
    - 이벤트 핸들러에는 필히 함수를 지정
      - HTML에서는 문자열로 코드를 지정
  - DOM 요소에만 이벤트가 지원
    - 커스텀 리액트 컴포넌트에서는 HTML 이벤트를 지원하지 않음
    - 하지만 내부 Element에 DOM요소를 담아, 핸들러를 지정할 수 있음



### 첫 리액트 컴포넌트 만들기(클릭 카운터)

- React.Component
  - HTML은 거의 만들지않고, JS 만으로 UI를 구성
    - jsx는 HTML이 아님
  - 리액트가 변경된 속성/상태값을 기반으로 UI를 자동 갱신
  - 가상 돔을 통한 빠른 UI갱신
    - DOM 계산 비용은 비쌈
    - 이전 UI상태를 메모리에 유지 + 변경될 UI의 최소 집합 계산
- React.Component 주요 구성요소
  - props
    - 읽기전용(불변객체)
    - 컴포넌트 생성시, 부모 컴포넌트로부터 전달받음
    - 부모가 props를 변경하면 (부모입장엔 state), 변경된 props값을 참조하는 UI가 자동으로 업데이트됨
  - state
    - 각 컴포넌트가 개별로 생성/유지하는 상태값들
      - 주로 컴포넌트 단위로 UI에 반영할 값들을 저장할 목적
    - 상태가 변경되면 변경된 state값을 참조하는 UI가 자동 업데이트
    - 불변객체로 처리해야만 함
      - immer 패키지를 통해 보다 편리한 처리도 가능
    - 제공되는 상태값 setter 함수를 통해 변경해야만 함
  - Element Tree
  - Component Tree

