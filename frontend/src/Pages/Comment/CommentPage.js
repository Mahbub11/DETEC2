import React, { useState } from "react";
import { Avatar, List, Radio, Space, Tag } from "antd";
import { UserOutlined } from "@ant-design/icons";
const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
];
const positionOptions = ["top", "bottom", "both"];
const alignOptions = ["start", "center", "end"];

export default function CommentPage() {
  const [position, setPosition] = useState("bottom");
  const [align, setAlign] = useState("center");

  const handleWAP = () => {};
  return (
    <div className="h-auto">
      <List
        pagination={{
          position,
          align,
        }}
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item>
            <div className="flex flex-col">
              <div className="flex justify-start gap-5">
                  <Space wrap size={16}>
                  <Avatar size={40} icon={<UserOutlined />} />
                  </Space>
                   <h1 className="text-[20px] font-robotomono font-[500] mt-1">
                  MR X
                  </h1>
              </div>

              <div className="mt-5">
                <p>For letter type Avatar, when the letters are too long to display, the font size can be automatically adjusted according to the width of the Avatar. You can also use gap to set the unit distance between left and right sides.</p>
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
}
