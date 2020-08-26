import React from "react";
import { Button } from "antd";
import PostList from "components/PostList";
import AppLayout from "components/AppLayout";
import StoryList from "components/StoryList";
import SuggestionList from "components/SuggestionList";
import { useHistory } from "react-router-dom";

function Home() {
  const history = useHistory();
  const handleClick = () => {
    history.pushState("/posts/new");
  };
  const sidebar = (
    <>
      <Button
        block
        style={{ marginBottom: "1rem" }}
        type="primary"
        onClick={handleClick}
      >
        새 포스팅 쓰기
      </Button>
      <StoryList style={{ marginBottom: "1rem" }} />
      <SuggestionList />
    </>
  );
  return (
    <AppLayout sidebar={sidebar}>
      <PostList />
    </AppLayout>
  );
}

export default Home;
