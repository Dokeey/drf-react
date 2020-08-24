import React from "react";
import { Button } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import "./Suggestion.scss";

export default function Suggestion() {
  return (
    <div className="suggestion">
      <div className="avatar">
        <UserAddOutlined />
      </div>
      <div className="username">Username</div>
      <div className="action">
        <Button size="small">Follow</Button>
      </div>
    </div>
  );
}
