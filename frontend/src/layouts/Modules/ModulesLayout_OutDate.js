import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Tabs, Grid } from "antd";
import "./index.css";
import Writing from "../../Pages/Modules/Writing";
import Reading from "../../Pages/Modules/Reading";
import Speaking from "../../Pages/Modules/Speaking";
import Listening from "../../Pages/Modules/Listening";
const { Header, Sider, Content } = Layout;
const { TabPane } = Tabs;
const { useBreakpoint } = Grid;

const ModulesLayout = () => {
  const { lg } = useBreakpoint(); // lg is one of the elements returned if screenwidth exceeds 991
  const myFontSize = lg ? "130px" : "15px";

  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className="h-screen">
      <Sider
        className={`${collapsed ? "hidden" : "block"}`}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "nav 1",
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "nav 2",
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "nav 3",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
        className="flex justify-between"
          style={{
            padding: 0,
            background: "#f7f7f7",
          }}
        >
        
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
            <h1 className="sm:ml-[-2rem] bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text text-center text-[22px] font-montserrat font-[800]">PracticeMania</h1>
            <div></div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Tabs
            centered
            tabBarGutter={myFontSize}
            fontSize="31px"
            defaultActiveKey="4"
            className="customTab"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <TabPane
              tab="Writing"
              key="1"
              style={{ width: "100%", fontSize: "25px" }}
            >
              <Writing></Writing>
            </TabPane>

            <TabPane tab="Reading" key="2">
              <Reading></Reading>
            </TabPane>
            <TabPane tab="Speaking" key="3">
              <Speaking></Speaking>
            </TabPane>
            <TabPane tab="Listening" key="4">
              <Listening></Listening>
            </TabPane>
          </Tabs>
        </Content>
      </Layout>
    </Layout>
  );
};
export default ModulesLayout;
