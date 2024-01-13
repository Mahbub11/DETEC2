import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button,notification } from "antd";
import "./index.css";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CloseNotification } from "../../redux/actions";
const { Header, Sider, Content } = Layout;


export default function AdminSectionLayout() {

  const [collapsed, setCollapsed] = useState(true);
  const [api, contextHolder] = notification.useNotification(); 
  const {common}= useSelector((state)=> state.app)
  const dispatch= useDispatch()
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: common.severity,
      description:common.message,
      placement:'bottomLeft',
       
    });
  };
 
  useEffect(()=>{
   dispatch( CloseNotification())
   if(common.message){
    openNotificationWithIcon(common.severity)

  
   }
   
  },[common.message])
 

  return (
    <Layout className="">
      <div>
      {contextHolder}
    
      </div>
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
              label: "Home",
              path: "/",
              key: "home",
              icon: <HomeOutlined />,
            },
            {
              label: "Practice",
              key: "access-control",
              icon: <HomeOutlined />,
              children: [
                {
                  label: (
                    <a href="/admin/vocabulary" rel="noopener noreferrer">
                      Vocabulary
                    </a>
                  ),
                  path: "/admin/reading",
                  key: "user2",
                  permission: "user list",
                },
                {
                  label: (
                    <a href="/admin/reading" rel="noopener noreferrer">
                      Reading
                    </a>
                  ),
                  path: "/admin/reading",
                  key: "user",
                  permission: "user list",
                },
                {
                  label: (
                    <a href="/admin/writing" rel="noopener noreferrer">
                      Writing
                    </a>
                  ),
                  path: "/admin/writing",
                  key: "role1",
                },
                {
                  label: (
                    <a href="/admin/speaking" rel="noopener noreferrer">
                      Speaking
                    </a>
                  ),
                  path: "/admin/writing",
                  key: "role2",
                },
                {
                  label: (
                    <a href="/admin/listening" rel="noopener noreferrer">
                      Listening
                    </a>
                  ),
                  path: "/admin/writing",
                  key: "role3",
                },
              ],
            },
            {
              label: "Configuration",
              key: "configuration",
              icon: <HomeOutlined />,
              children: [
                {
                  label: "Inventory",
                  key: "inventory",
                  children: [
                    {
                      label: "Inventory 1",
                      path: "/configuration/inventory",
                      key: "inventory-1",
                      permission: "inventory list",
                    },
                    {
                      label: "Inventory 2",
                      path: "/configuration/inventory-2",
                      key: "inventory-2",
                      permission: "inventory list",
                    },
                  ],
                },
                {
                  label: "Customer",
                  path: "/configuration/customer",
                  key: "customer",
                },
              ],
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
          <h1 className="ml-[-2rem] bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text text-center text-[22px] font-montserrat font-[800]">
             ADMIN PANEL
          </h1>
          <div></div>
        </Header>
        <Content>
          <div className="md:w-[90%] m-auto">
            <Outlet></Outlet>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
