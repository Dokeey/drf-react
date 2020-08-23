import React, { useState, useEffect, useCallback } from 'react';

class App1 extends React.Component {
  state = {
    value: 0,
    value2: 0,
  };
  onClick = () => {
    this.setState({ value1: 10 });
  };
  render() {
    const { value1 } = this.state;
    return (
      <div>
        Hello
        <hr />
        {this.state.value1}
        <button onClick={this.onClick}></button>
      </div>
    );
  }
}

function PostDetailComponent({ post }) {
  const { title, content } = post;
  return (
    <div>
      <h1>{title}</h1>
      {content}
    </div>
  );
}

function Clock() {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setDate(new Date()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return <div>현재 시각은 {date.toISOString().slice(11, 19)}입니다.</div>;
}

function PostDetail({ postId }) {
  // const [loading, setLoading] = useState(false);
  const [post, setPost] = useState();
  useEffect(() => {
    setPost({ title: '새 포스팅 제목', content: `포스팅 내용...: ${postId}` });
    // setInterval(() => {}, 1000);
    return () => {
      // unmount 시에 호출
      // clearInterval(...);
    };
  }, [postId]);
  return (
    <div>
      <h1>Post #{postId}</h1>
      {!post && '로딩중..'}
      {post && <PostDetailComponent post={post} />}
    </div>
  );
}

function App2() {
  const [value1, setvalue1] = useState(0);
  const [value2, setvalue2] = useState(0);
  const [value, setvalue] = useState({ value1: 0, value2: 0 });
  const [postId, setPostId] = useState(1);

  const onClick = useCallback(() => {
    setvalue({ ...value, value1: 10 });
    // setvalue((prevState) => ({ ...prevState, value1: 10 }));
  }, [value]);

  useEffect(() => {}); // render 시에 호출 (어차피 함수형 자체가 render시마다 호출함. 잘안씀)
  useEffect(() => {
    console.log('mount');
  }, []); // mount 시에만 호출
  useEffect(() => {
    console.log('change value:', value);
  }, [value]); // value가 변경될 시 호출

  return (
    <div>
      <Clock />
      Hello
      <hr />
      {JSON.stringify(value)}
      <button onClick={onClick}>click!</button>
      <hr />
      <button onClick={() => setPostId(100)}>100번글 보기</button>
      <PostDetail postId={postId} />
      {value1}
      {value.value1}
    </div>
  );
}

export default App2;
