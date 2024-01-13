import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Tabs, Grid } from "antd";
import { Select, Space } from "antd";
import { Input } from "antd";
import ListData from "../../Components/Module/writing/ListData";
import CommentPage from "../Comment/CommentPage";

const { Search } = Input;

const { Header, Sider, Content } = Layout;
const { TabPane } = Tabs;
const { useBreakpoint } = Grid;

export default function SectionAddition() {
  const { lg } = useBreakpoint(); // lg is one of the elements returned if screenwidth exceeds 991
  const myFontSize = lg ? "50px" : "15px";

  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <div
      data-te-perfect-scrollbar-init
      data-te-suppress-scroll-x="true"
     className="h-screen overflow-scroll bg-white mt-10 m-auto shadow-sm scroll-mr-10 ">
      <Tabs
        tabBarGutter={myFontSize}
        fontSize="31px"
        defaultActiveKey="1"
        className="font-robotomono  border-none w-[95%] m-auto"
        style={{
          display: "flex",
          border: "none",
          justifyContent: "space-between",
        }}
      >
        <TabPane
          tab="Comments"
          key="1"
          style={{ width: "100%", fontSize: "25px" }}
        >
          <div>
            <div className="flex justify-between">
              <div className="flex justify-between gap-2 flex-wrap">
                <Select
                  defaultValue="Latest"
                  style={{ width: 120 }}
                  options={[
                    { value: "latest", label: "Latest" },
                    { value: "top", label: "Top" },
                    { value: "critical", label: "Critical" },
                  ]}
                />
              </div>
            </div>

            <div className=" h-[20rem] w-full mt-10">
              <div className="h-[30%] w-full">
                <Space.Compact
                  style={{
                    width: "100%",
                    height:'60%'
                  }}
                >
                  <Input placeholder="Input Your Comment" />
                  <Button  className="bg-home m-auto h-[3.5rem] text-center" type="primary">
                   Comment
                  </Button>
                </Space.Compact>
              </div>
              <CommentPage></CommentPage>
            </div>
          </div>
        </TabPane>

        <TabPane tab="My Notes" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Suggestion" key="3">
          Content of Tab Pane 2
        </TabPane>
      </Tabs>
    </div>
  );
}
