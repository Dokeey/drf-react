import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import ThemedButton from 'ThemedButton';
import Counter, { TestCounter } from 'Counter';
import 'App.css';

const actions = {
  init(initialValue) {
    return { value: initialValue };
  },
  increment(prevState) {
    return { value: prevState.value + 1 };
  },
  decrement(prevState) {
    return { value: prevState.value - 1 };
  },
};

class Counter1 extends React.Component {
  state = actions.init(this.props.initialValue);

  onClick = () => {
    const { value } = this.state;
    if (value === 20) {
      this.setState({ value: 10 });
    } else {
      this.setState({ value: value + 1 });
    }
  };
  render() {
    const { value } = this.state;
    return (
      <div>
        Counter1: {value}
        {/* <Button onClick={this.onClick}> +1 </Button> */}
        <Button onClick={() => this.setState(actions.increment)}> +1 </Button>
        <Button onClick={() => this.setState(actions.decrement)}> -1 </Button>
      </div>
    ); // jsx문법
  }
}

class FruitComponent extends React.Component {
  state = {
    value: this.props.fruits,
  };
  myfn = (index) => {
    const { value } = this.state;
    const flag_str = ' (누른 과일)';
    const flag = value[index].indexOf(flag_str);
    if (flag === -1) {
      value[index] = value[index] + flag_str;
    } else {
      const last_index = value[index].length - flag_str.length;
      value[index] = value[index].substring(0, last_index);
    }
    this.setState({ value });
  };
  render() {
    const { value } = this.state;
    return (
      <div>
        <h1>좋아하는 과일</h1>
        <ul>
          {value.map((name, index) => (
            // <li onClick={this.myfn.bind(this, index)} key={index}> // bind를 이용한 구식 파라미터 전달 방식
            <li onClick={() => this.myfn(index)} key={index}>
              {name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

class PostDetail extends React.Component {
  static propTypes = {
    postId: PropTypes.number.isRequired,
  };
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
        <ThemedButton theme="primary" label="say hello" />
        <PostDetail postId={this.state.postId} />
        <Button onClick={() => this.setState({ postId: 20 })}>
          postId 변경
        </Button>
      </div>
    );
  }
}

class TestApp extends React.Component {
  state = {
    myquery: '',
    language: '',
  };
  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  render() {
    return (
      <div>
        <TestCounter onClick={() => console.log('clicked')} />
        <input name="myquery" onChange={this.onChange} />
        <input name="language" onChange={this.onChange} />
        {JSON.stringify(this.state)}
      </div>
    );
  }
}

class ClickCounter extends React.Component {
  render() {
    return (
      <div>
        <Counter />
        <Counter color={'blue'} />
        <Counter color={'green'} />
      </div>
    );
  }
}

function App() {
  const fruits = ['바나나', '딸기', '사과'];
  return (
    <div>
      <Counter1 initialValue={10} />
      <FruitComponent fruits={fruits} />
      <hr />
      <Post />
      <TestApp />
      <hr />
      <ClickCounter />
    </div>
  );
}

export default App;
