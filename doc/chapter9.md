# DRF-React Study

## Chapter 9. 리액트 기초 익히기

### 개발환경 세팅

- node.js 설치

  - 12.16.1 버전 설치

  - 본인은 docker 이미지 사용

    ```bash
    docker run -it --rm -d node:12.16.1
    ```

  - yarn 설치

    ```bash
    npm install yarn
    ```

  - react 프로젝트 설치

    ```bash
    yarn create react-app [프로젝트명]
    ```

### 꼭 알아야할 ES6+ 문법

- 변수/상수 선언

  - var는 더 이상 쓰지 않는다.

  - 변수 선언은 let

    - Lexical Variable Scoping을 지원하는 변수 선언 문법

  - 상수 선언은 const

    - 재할당 불가. 내부 속성값은 수정 가능.

    - ```javascript
      const tom = {lang='python'}
      tom.lang = 'JavaScript'
      ```

- 객체 복사

  - JS는 Object/Array에 대해서 대입 시 얕은 복사

  - ```javascript
    const obj1 = { value1: 10};
    const obj2 = obj1;
    const obj3 = JSON.parse(JSON.stringify(obj1))
    
    obj1.value1 += 1;
    
    > node test.js
    obj1: {value1: 11}
    obj2: {value1: 11}
    obj3: {value1: 10}
    ```

- 배열 비구조화

  - ```javascript
    let [name] = ["Tom", 10, "Seoul"];
    let [, age,] = ["Tom", 10, "Seoul"];
    
    let [name, age, region, height] = ["Tom", 10, "Seoul"];
    // height 무시
    let [name, age, region, height=150] = ["Tom", 10, "Seoul"];
    // height 디폴트값 150
    
    function get_default_height(){
      console.log("get_default_height 호출")
      return 150
    }
    let [name, age, region, height=get_default_height()] = ["Tom", 10, "Seoul"];
    // 실제 디폴트값 할당이 필요할 때 호출됨
    ```

- 객체 비구조화

  - ```javascript
    const tom = {
      name: "Tom",
      age: 10,
      region: "Seoul",
    };
    const {age, name, height} =  tom;
    // 객체에서 필요한 값들만 뽑아냄.
    // height는 undefined
    // tom 객체의 region은 무시가됨
    ```

- 전개 연산자

  - ```javascript
    let [name, ...rest] = ["Tom", 10, "Seoul"];
    
    let names = ["Steve", "John"];
    let students = ["Tom", ...names, ...names];
    
    let printArgs = (...args) => {
      console.log(args);
    }
    
    let tom = {
      name: "Tom",
      age: 10,
      region: "Seoul",
    };
    let steve = {
      ...tom,
      name: "Steve",
    };
    // 속성명이 중복될 경우 마지막 값이 남음
    ```

  - 전개 연산자를 많이 쓰며, 구조가 복잡할 경우 immer 라이브러리를 쓰는게 가독성에 좋음

- 함수 / Default Parameters

  - 모든 타입의 값들을 디폴트 파라미터로 지정할 수 있음
    - 파이썬에서는 Immutable 값들만 디폴트 파라미터로 지정 가능
  - node의 디폴트 값에 함수를 적용하면 필요할때마다 접근함
    - python은 함수가 만들어질때 한번만 접근

- 함수 / Arrow Function

  - return을 사용하지 않아도, 계산된 값을 반환

  - 인자가 1개일 경우, 소괄호 생략 가능

  - ```javascript
    var fn1 = function(name, age) {
      return '${name}. ${age}입니다';
    }
    
    let fn2 = (name, age) => '${name}. ${age}입니다';
    
    let fn3 = (name, age) => {
      return '${name}. ${age}입니다';
    }
    
    let fn4 = x => x + 10;
    ```

  - 함수를 중괄호로 감싸지 않으면, return 문을 사용하지않아도 반환을 함

  - this / arguments를 바인딩하지 않음

- 콜백

  - ```javascript
    const fs = require('fs');
    
    fs.readdir('.', function(err, files){
      if (err) {
        console.log('error : ' + err)
      }
      else {
        console.log(files);
      }
    });
    ```

- Promise

  - ```javascript
    const fs = require('fs');
    const fsPromises = fs.promises;
    
    fsPromises.readdir('.')
    	.then(files=> {
      console.log(files);
    	})
    	.catch(err => console.error(err));
    ```

- async/await

  - ```javascript
    const fs = require('fs');
    const fsPromises = fs.promises;
    
    async function fn() {
      try{
        let files = await fsPromises.readdir('.');
        console.log(files);
      }
      catch(err) {
        console.error(err);
      }
    }
    
    fn();
    ```

- 고차함수