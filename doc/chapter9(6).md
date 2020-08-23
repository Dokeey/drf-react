# DRF-React Study

## Chapter 9. 리액트 기초 익히기

### 클래스 컴포넌트, 생명주기

- static getDerivedStateFromError(error)
  - 오류정보를 화면에 보여주기 위한 state를 생성할 목적
  - children 컴포넌트의 생명주기 함수에서 오류가 발생했을때에만 호출
  - 개발서버는 별도 오류화면이 보여지기에
    - 커스텀 화면을 보기위해서는 프로덕션 빌드가 필요
- componentDidCatch(error, info)
  - 에러정보를 서버로 전송
  - 생명주기 함수에서 오류가 발생헀을 떄에만 호출
  - errorinfo 정보가 추가로 전달

### axios 라이브러리를 활용한 HTTP 요청

- axios 라이브러리
  - 설치 : `yarn add axios`
  - django 서버로 ajax요청을 할 경우
    - 장고가 서비스되는 호스트명과 리액트가 서비스되는 호스트명이 다르면, cors headers 설정이 필요
  - async/await은 ECMAScript2017 문법
    - ES8
- axios API
  - 요청 메소드 aliases
    - request, get, delete, head, options
    - post, put, patch
  - concurrency
    - axios.all로 요청하고 axios,spread로 응답 받아서 처리



### 함수형 컴포넌트와 필수 Hook

- 클래스형 컴포넌트의 한계

  - class가 코드 재사용성과 코드 구성을 더 어렵게 만든다
  - 자바스크립트의 this는 다른 언어와 다르게 작동하며, 개발자는 이벤트 핸들러가 등록되는 방법을 기억해야만 함
  - 부수적으로 작성해야하는 코드가 많다
  - 서로 연관성이 없는 다수 로직을 하나의 생명주기 메서드에서 구현하는 경우가 많다
  - 코드 압축이 잘 안됨
  - 컴파일 단계에서 코드 최적화를 어렵게 만듬
  - componentDidMount에 등록하고 componentWillUnmount에서 해제를 깜빡할 수 있다
  - 등등

- 함수형 컴포넌트

  - 클래서형 컴포넌트에 적용했던 것들을 대부분 적용가능(Hook 활용)
  - 현재 리액트 팀에서도 함수형 컴포넌트와 Hook개발에 집중
  - 새로이 작성하는 컴포넌트는 함수형 쓰기를 권장
  - 클래스 컴포넌트에 대한 호환성 보장

- 재현할 수 없는 메서드

  - getSnapshotBeforeUpdate
  - getDerivedStateFromError
    - 함수형 스타일로 구현할수는 있음
  - componentDidCatch
    - 함수형 스타일로 구현할수는 있음

- "관심사의 분리"로 컨테이너 설계하기

  - 비슷한 기능을 하는 코드끼리 모아서 별도로 관리하는 것
  - 비지니스 로직과 상탯값의 유무로 컨테이너 분리(역할 차이)
    - 프레이젠테이션 컴포넌트
    - 컨테이너 컴포넌트
      - 상탯값들을 직접 제어, Redux로부터 데이터를 받고 액션

- Hook

  - 리액트 버전 16.8에 추가
  - 훅을 통해 여러 React 기능을 활용가능

- 필수 Hooks - useState

  - ```javascript
    function App2() {
      const [value1, setvalue1] = useState(0);
      const [value2, setvalue2] = useState(0);
      const [value, setvalue] = useState({ value1: 0, value2: 0 });
    
      const onClick = () => {
        setvalue((prevState) => ({ ...prevState, value1: 10 }));
      };
    
      return (
        <div>
          Hello
          <hr />
          {JSON.stringify(value)}
          <button onClick={onClick}>click!</button>
        </div>
      );
    }
    ```

  - useState 훅은 이전 상태값을 항상 지움

  - setter 함수에서 매번 전체값을 지정해줘야 함

  - immer 라이브러리를 쓰면, 코드가 직관적일 수 있음

- 필수 Hook - useEffect

  - 생명주기의 componentDidMount/componentDidUpdate에 대응

  - 특정 속성값/상태값이 변경될시, mount 될시 동작하고 싶을때

  - ```javascript
    function PostDetail({ postId }) {
      // const [loading, setLoading] = useState(false);
      const [post, setPost] = useState();
      useEffect(() => {
        setPost({ title: '새 포스팅 제목', content: `포스팅 내용...: ${postId}` });
        setInterval(() => {}, 1000);
        return () => {
            // unmount 시에 호출
            // clearInterval(...);
        }
      }, [postId]);
      return (
        <div>
          <h1>Post #{postId}</h1>
          {!post && '로딩중..'}
          {post && <PostDetailComponent post={post} />}
        </div>
      );
    }
    ```

  - 2번째 인자가 빈 Array를 지정하면 마운트될떄에만 호출

- 필수 Hook - useCallback

  - 컴포넌트가 렌더링될 때마다, 함수를 생성해서 속성값으로 지정하면, 성능 저하

    - 함수를 재활용하여, 불필요한 컴포넌트 재렌더링을 제거하기

  - ```javascript
      const onClick = useCallback(() => {
        setvalue({ ...value, value1: 10 });
        // setvalue((prevState) => ({ ...prevState, value1: 10 }));
      }, [value]);
    ```

- Hook, 유의사항

  - 하나의 컴포넌트에서 훅을 호출하는 순서는 일정해야함
    - 내부적으로 각 훅은 Array에 담겨져 처리됨
  - 함수형 컴포넌트 또는 커스텀 훅 안에서만 호출되어야만 함
    - 클래스형이나 일반 함수에서 사용할 수 없음
  - 최상위 수준에서 훅을 호출해야만 함
    - 반복문이나 조건문식, 중첩된 함수에서 호출하면 안됨

- 렌더링 퍼포먼스 최적화

  - 오용하지 않기에 집중
    - 자동으로 처리되는 것들이 많음
  - 제대로 이해하고 사용하기



### Custom Hook 만들기

- useCurruntTime : 현재 시간

  - 기본 제공되는 훅을 활용해서, 커스텀 훅을 만들 수 있다

  - 훅 이름은 use로 시작하는 것을 추천

  - ```javascript
    const useCurrentTime = () => {
      const [currentTime, setCurrentTime] = useState();
    
      useEffect(() => {
        const handler = setInterval(() => {
          const currentTime = new Date().toISOString().slice(11, 19);
          setCurrentTime(currentTime);
        }, 1000);
        return () => clearInterval(handler);
      }, []);
    
      return currentTime;
    };
    ```

    

- 브라우저 윈도우 가로크기

  - ```javascript
    const useWindowWidth = () => {
      const [width, setWidth] = useState(window.innerWidth);
    
      useEffect(() => {
        const onResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
      }, []);
    
      return width;
    };
    
    ```



### 리듀서와 useReducer 훅

- 리액트에서 상탯값을 변경하는 2가지 방법

  - setter 함수를 직접 제공
    - setter로직이 다수 혼재
  - setter 함수를 제공하지 않고, dispatch 함수를 제공
    - redux에서의 방식

  ```javascript
  import React, { useReducer } from 'react';
  
  const SET_NAME = "SET_NAME"
  const SET_AGE = "SET_AGE"
  
  const reducer = (prevState, action) => {
    const { type, value } = action;
    if (type === SET_NAME) {
      return { ...prevState, myname: value };
    } else if (type === SET_AGE) {
      return { ...prevState, age: value };
    }
    return prevState;
  };
  
  const App = () => {
    const [state, dispatch] = useReducer(reducer, { myname: '', age: '' });
    const { myname, age } = state;
    const onChange = (e) => {
      const { name: type, value } = e.target;
      dispatch({ type, value });
    };
    return (
      <div>
        myname: {myname}, age: {age}
        <input
          type="text"
          name="SET_NAME"
          placeholder="name"
          onChange={onChange}
        />
        <input type="text" name="SET_AGE" placeholder="age" onChange={onChange} />
      </div>
    );
  };
  
  export default App;
  ```



### Context API

- Context API의 필요성

  - 여러 단계에 걸쳐, 하위 컴포넌트로 속성값을 전달할 때에는, 

  - 각 단계별로 속성값을 전달하는 코드를 기계적으로 작성해야하는 번거로움

  - ```javascript
    import React, { createContext } from 'react';
    
    const MessageContext = createContext();
    
    const App = () => {
      return (
        <MessageContext.Provider value="Context API in React">
          <App2 />
        </MessageContext.Provider>
      );
    };
    
    const App2 = () => {
      return <App3 />;
    };
    
    const App3 = () => {
      return (
        <MessageContext.Consumer>
          {(message) => `Level 3: ${message}`}
        </MessageContext.Consumer>
      );
    };
    
    export default App;
    
    ```

- 다른 컴포넌트 메서드에서 다수의 Context 접근하기

  - 고차 컴포넌트를 활용

  - 속성값으로 전달하도록 구성 가능

  - ```javascript
    import React, { useState, createContext, useContext } from 'react';
    
    const CounterContext = createContext();
    
    const App = () => {
      const [value, setValue] = useState(0);
      const onIncrement = () => {
        setValue((prevValue) => prevValue + 1);
      };
    
      return (
        <div>
          <button onClick={onIncrement}>App : {value}</button>
          <CounterContext.Provider value={{ value, onIncrement }}>
            <Level3 />
          </CounterContext.Provider>
        </div>
      );
    };
    
    const Level3 = () => {
      const { value, onIncrement } = useContext(CounterContext);
      return <div onClick={onIncrement}>Level3 : {value}</div>;
    };
    
    export default App;
    ```



### Context API와 Reducer 패턴

- useContext 훅
  - Context API의 consumer 컴포넌트와 유사한 활용
- useReducer 훅
  - 컴포넌트의 상태값을 리덕스



### 라우터로 SPA 만들기

- 2가지 라우팅 방식

  - 브라우저에 의한 라우팅
    - 웹에서 사용되던 전통적 방법
    - a 태그 활용, 페이지 이동 등
  - JavaScript 단에서 라우팅을 흉내내기
    - SPA에서 사용하는 방법
    - 리액트는 SPA 방식으로 개발하는 것이 보다 적합
    - 브라우저 히스토리 API 활용
      - react-router-dom 라이브러리를 통한 보다 손쉬운 처리

- react-router-dom

  - 설치 : `yarn add react-router-dom`
  - 현재 Route에 매칭되는 Route의 Component가 모두 렌더링됨
  - 단일 Route만 선택되게 할려면, Switch를 사용

- LavLink

  - Link와 유사

  - activeStyle과 activeClassName 속성을 지원

  - ```javascript
    import React, { useEffect, useState } from 'react';
    import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
    import queryString from "query-string"
    
    const App = () => {
      return (
        <div>
          <BrowserRouter>
            <h1>App10</h1>
    
            <ul>
              <li>
                <NavLink exact to="/about/" activeStyle={navActiveStyle}>
                  about
                </NavLink>
              </li>
              <li>
                <NavLink exact to="/about/company/" activeStyle={navActiveStyle}>
                  about company
                </NavLink>
              </li>
              <li>
                <NavLink to="/profile/" activeStyle={navActiveStyle}>
                  profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/blog/" activeStyle={navActiveStyle}>
                  blog
                </NavLink>
              </li>
            </ul>
            <Switch>
              <Route exact path="/about/" component={AboutPage} />
              <Route exact path="/about/company/" component={AboutCompanyPage} />
              <Route exact path="/profile/" component={ProfilePage} />
              <Route path="/blog/:post_id" component={PostDetail} />
              <Route path="/blog/" component={PostList} />
              <Route component={RouteNoMatch} />
            </Switch>
          </BrowserRouter>
        </div>
      );
    };
    
    const navActiveStyle = {
      fontWeight: 'bold',
      backgroundColor: 'yellow',
    };
    ```

    

- Router로 설정된 컴포넌트가 받는 3가지 props

  - history : 히스토리 조작

    - .location, push(), replace(), goBack(), goForward() 등

  - location : 현재 경로 정보

    - .hash, pathname, search, state 속성

  - match : Router 매칭 정보

    - isExact, url, path, params 속성

  - ```javascript
    const PostDetail = ({ match }) => {
      const {
        params: { post_id },
      } = match;
    
      const [post, setPost] = useState();
      useEffect(() => {
        setPost({ title: `포스팅 ${post_id}`, content: `포스팅 ${post_id} 내용` });
      }, [post_id]);
      return (
        <div>
          <h2>PostDetail #{post_id}</h2>
          {JSON.stringify(post)}
        </div>
      );
    };
    
    const RouteNoMatch = ({ location }) => {
      return <div>삐빅 - 잘못된 경로 {location.pathname}</div>;
    };
    ```

- Switch와 No Match 처리

  - ```javascript
    const App = () => {
      return (
        ...
            <Switch>
              <Route exact path="/about/" component={AboutPage} />
              <Route exact path="/about/company/" component={AboutCompanyPage} />
              <Route exact path="/profile/" component={ProfilePage} />
              <Route path="/blog/:post_id" component={PostDetail} />
              <Route path="/blog/" component={PostList} />
              <Route component={RouteNoMatch} />
            </Switch>
    		...
    	);
    };
    
    const RouteNoMatch = ({ location }) => {
      return <div>삐빅 - 잘못된 경로 {location.pathname}</div>;
    };
    ```

- match -> url params 속성

  - ```javascript
    const PostList = ({ match }) => {
      return (
        <div>
          <h1>PostList</h1>
          <ul>
            <li>
              <NavLink to={`${match.url}100/`}>100번 포스팅</NavLink>
            </li>
          </ul>
        </div>
      );
    };
    ```

- QueryString 처리

  - query-string 라이브러리를 통해 객체로 변환 가능

  - ```javascript
    const ProfilePage = ({ history, location, match }) => {
        const {token} = queryString.parse(location.search)
    
      return (
        <div>
          <h1>Profile</h1>
          token: {token}
        </div>
      );
    };
    ```

  