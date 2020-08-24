import React, { useEffect, useState } from 'react';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import queryString from 'query-string';

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

const AboutPage = ({ history, location, match }) => {
  return (
    <div>
      <h1>About</h1>
    </div>
  );
};

const AboutCompanyPage = ({ history, location, match }) => {
  return (
    <div>
      <h1>AboutCompany</h1>
    </div>
  );
};

const ProfilePage = ({ history, location, match }) => {
  const { token } = queryString.parse(location.search);

  return (
    <div>
      <h1>Profile</h1>
      token: {token}
    </div>
  );
};

const PostList = ({ history, location, match }) => {
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

export default App;
