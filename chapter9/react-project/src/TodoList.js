import React from 'react';
import { Input, List } from 'antd';
import { produce } from 'immer';

// class TodoItem extends React.Component {
//   render() {
//     const { todo } = this.props;
//     return <li>{todo}</li>;
//   }
// }

// const TodoItem = ({ todo }) => <li>{todo}</li>;

class TodoList extends React.Component {
  state = {
    todoList: ['파이썬 익히기', '장고맨'],
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
          placeholder="할일을 입력하삼"
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
        />
        {/* <ul>
          {this.state.todoList.map((todo, index) => (
            <TodoItem key={index} todo={todo} />
          ))}
        </ul>
        <input
          placeholder="할일을 입력하삼"
          type="text"
          value={this.state.current}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
        />
        <hr />
        {JSON.stringify(this.state)} */}
      </div>
    );
  }
}

export default TodoList;
