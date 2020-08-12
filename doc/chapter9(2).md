# DRF-React Study

## Chapter 9. 리액트 기초 익히기

### 순수 함수와 커링 기법

- 리액트는 함수형 프로그래밍을 적극 활용
  - 컴포넌트의 많은 루틴을 순수 함수로서 작성하기를 요구
    - 상탯값/속성값이 같으면, 항상 같은 값을 반환해야함
    - 다른 side effects를 발생시키지 않아야함(HTTP 요청, 데이터 저장, 쿠키 조작 등)
  - 컴포넌트의 상탯값은 불변객체로 관리해야함
    - 수정할때는 기존값을 변경하는게 아닌 같은이름의 새로운 객체를 생성해야함
- 순수함수
  - 하나 이상의 인자를 받고, 인자를 변경하지 않고, 참조하여 새로운 값을 반환
  - Side Effects가 없도록 구성
- 순수함수를 활용한 데이터 변환
  - reduce, filter, map, join 등
- 커링
  - 일부의 인자를 고정한 새로운 함수를 반환하는 함수를 만드는 기법
  - 파이썬에는 장식자에 사용되는 기법



### babel과 webpack 그리고 create-react-app

- 다양한 babel preset
  - babel-preset-env
    - 디폴트 동작으로 ES6 이상의 preset을 적용하며, ES5로 transpiling
- webpack (module bundler)
  - js, jsx, css, sass, less, es6, 이미지, html, 폰트 등 거의 모든 것이 모듈이 될 수 있으며, 하나의 파일로 묶을수 있다
  - 모듈성과 네트워크 성능 향상
  - 기능
    - 코드를 필요할때 로딩 가능
    - Minifying : 불필요한 코드, 공백/줄바꿈, 긴 이름 등을 줄여, 파일 크기 줄이기
    - HMR : 개발모드에서 원본 소스코드 변경을 감지하며, 변경된 모듈만 즉시 갱신
  - 지원 Loaders
    - babel-loader : ES6나 리액트 코드를 transpiling
    - css-loader
- create-react-app
  - webpack, babel, eslint 등의 기본 설정이 된 리액트 프로젝트 생성
  - 설치 : `yarn global add create-react-app`
  - 프로젝트 생성 : `create-react-app <프로젝트 디렉터리>`

- 상대 경로 import를 절대 경로로 지정하기

  - jsconfig.json 작성

  - ```json
    {
        "compilerOptions": {
            "baseUrl": "src"
        },
        "include": [
            "src"
        ]
    }
    ```



### CRA 프로젝트에 Ant Design 적용하기

- Ant Design
  - UI 프레임워크
  - https://ant.design/
- 설치
  - `yarn add antd`



### 리액트 엘리먼트

- 리액트
  - UI 라이브러리 (웹 프론트엔드 및 앱 Native, VR 등에서 활용)
  - UI데이터를 관리하는 방법을 제공
    - 부모 컴포넌트로부터 내려받는 속성값 : props
    - 컴포넌트 내부에서 생성/관리되는 상탯값 : state
  - UI데이터(props, state)가 변경되면, 해당 컴포넌트의 render()함수가 호출이 되어 화면을 자동 갱신
    - 클래스형 컴포넌트에서는 render() 함수가 호출
    - 함수형 컴포넌트에서는 그 함수가 매번 호출. 컴포넌트에서 유지해야할 값들은 Hook을 통해 관리
- 리액트의 핵심 - 선언적 UI
  - UI에 변화를 가할 때마다 일일이 코드를 수행하는 것이 아님
    - 데이터에 맞춰 보여질 UI를 미리 선언해두면
    - 데이터 변경시 데이터에 맞춰 UI가 그려짐
- React Element
  - 화면을 담당하며, React 앱의 가장 작은 단위
  - jsx 문법사용
    - `const reactElement = <h1> hello world </h1>;`
  - 일반 객체
  - React DOM은 React Element와 일치하도록 DOM을 업데이트
  - Element는 Component에서 화면을 담당
    - 주요 구성요소 : props, state, element, 로직
- React Component
  - UI를 재사용 가능한 개별적인 여러 조각으로 나눔
    - 개념적으로 JS 함수와 유사
    - 속성값을 전달받아 Element를 반환
  - 클래스로 구현하는 컴포넌트가 먼저 지원되었으며, 최근 함수로 구현하는 컴포넌트 지원
    - 함수라도 네이밍을 정할때 맨앞 알파벳을 대문자로 명명함
- JSX
  - JS + HTML과 비슷한 문법 : JS코드로 변환
  - 어떤 브라우저도 지원하지 않음 : babel을 통한 변환이 필요
  - class가 예약어 이므로, HTML Tag속성의 class대신에 className을 사용
  - {} 안에는 자바스크립트 식을 지정(함수 등)