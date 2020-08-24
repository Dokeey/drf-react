import React from "react";
import { Card } from "antd";
import "./StoryList.scss";

export default function StoryList({ style }) {
  return (
    <div style={style}>
      <Card title="Stories" size="small">
        스토리 카드
      </Card>
    </div>
  );
}
