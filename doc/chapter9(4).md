# DRF-React Study

## Chapter 9. 리액트 기초 익히기

### CSS를 적용하는 다양한 방법

- 리액트에서의 CSS

  - 전통적인 방법
    - CSS를 별도 파일에 저장
    - link태그를 통해 웹페이지에 포함
    - 이는 전역설정이 되며 컴포넌트 간에 예기치 않은 스타일이 적용될 수 있음
  - 컴포넌트 중심으로 생각하고 CSS도 컴포넌트 내부에서 관리/적용

- CSS파일을 직접 적용

  - 나중에 import한 css파일로 덮어씌워질 수있음

- css-module 활용

  - 모듈방식으로 접근하기에 클래스명 중복을 방지할 수 있음

- Sass 활용

  - 설치
    - `yarn add --dev node-sass`
  - 변수, 연산, 믹스인/인자, 중첩, 문자 보간, 임포트, 각종 함수 등을 지원
  - 나머지는 css module 방식과 동일

- css-in-js 라이브러리 중 styled-component 활용

  - CSS코드를 JS 코드로 관리할 수 있다는 장점

  - 설치

    - `yarn add --dev styled-component`

  - ```javascript
    import React from 'react';
    
    class Wrapper extends React.Component {
      render() {
        return (
          <section style={{ padding: '4em', background: 'papayawhip' }}>
            {this.props.children}
          </section>
        );
      }
    }
    
    class Title extends React.Component {
      render() {
        const fontSize = this.props.isBig ? '3em' : '1.5em';
        return (
          <h1 style={{ fontSize, textAlign: 'center', color: 'palevioletred' }}>
            {this.props.children}
          </h1>
        );
      }
    }
    
    function App2() {
      return (
        <Wrapper>
          <Title>Random Chatting</Title>
        </Wrapper>
      );
    }
    
    export default App2;
    
    ```

  

### Todo list 만들어보기

- ```javascript
  import React from 'react';
  import { Input, List } from 'antd';
  
  // class TodoItem extends React.Component {
  //   render() {
  //     const { todo } = this.props;
  //     return <li>{todo}</li>;
  //   }
  // }
  
  // const TodoItem = ({ todo }) => <li>{todo}</li>;
  
  class TodoList extends React.Component {
    state = {
      todoList: ['파이썬 익히기', '장고'],
      current: '',
      flag: [true, -1],
    };
    onChange = (e) => {
      const { value } = e.target;
      this.setState({
        current: value,
      });
      console.log(value);
    };
    onKeyDown = (e) => {
      if (e.keyCode === 13) {
        const { todoList, current, flag } = this.state;
        if (current.trim().length > 0) {
          if (flag[0] === true) {
            this.setState({
              current: '',
              todoList: [...todoList, current.trim()],
            });
          } else {
            todoList[flag[1]] = current.trim();
            this.setState({
              current: '',
              todoList: [...todoList],
              flag: [true, -1],
            });
          }
        }
      }
    };
    update = (index) => {
      const { todoList } = this.state;
      this.setState({
        current: todoList[index],
        flag: [false, index],
      });
    };
    delete = (index) => {
      const todo = this.state.todoList;
      todo.splice(index, 1);
      this.setState({
        todoList: [...todo],
      });
    };
    render() {
      return (
        <div style={{ width: '500px', margin: '30px auto' }}>
          <List
            header={'Todo List'}
            dataSource={this.state.todoList}
            bordered={true}
            renderItem={(todo, index) => (
              <List.Item actions={[<a onClick={() => this.delete(index)}>X</a>]}>
                <div onClick={() => this.update(index)}>{todo}</div>
              </List.Item>
            )}
            style={{
              marginBottom: '4px',
            }}
          />
          <Input
            type="text"
            value={this.state.current}
            placeholder="할일을 입력하세요"
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
          />
        </div>
      );
    }
  }
  
  export default TodoList;
  
  ```



