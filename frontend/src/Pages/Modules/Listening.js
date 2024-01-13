import React, { useState } from "react";
import { Layout, theme, Tabs, Grid } from "antd";
import { Input } from "antd";
import ContainerPageLLT from "../ModuleListening/ContainerPageLLT";
import ContainerPageLLR from "../ModuleListening/ContainerPageLLR";

const { Search } = Input;

const { Header, Sider, Content } = Layout;
const { TabPane } = Tabs;
const { useBreakpoint } = Grid;

export default function Listening() {
  const { lg } = useBreakpoint(); // lg is one of the elements returned if screenwidth exceeds 991
  const myFontSize = lg ? "50px" : "15px";


  return (
    <div>
      <Tabs
        tabBarGutter={myFontSize}
        fontSize="31px"
        defaultActiveKey="1"
        className="font-robotomono  border-none"
        style={{
          display: "flex",
          border: "none",
          justifyContent: "space-between",
        }}
      >
        <TabPane
          tab="Listen and Type"
          key="1"
          style={{ width: "100%", fontSize: "25px" }}
          >
          <ContainerPageLLT></ContainerPageLLT>
        </TabPane>

        

        <TabPane
          tab="Listen and Respond"
          key="3"
          style={{ width: "100%", fontSize: "25px" }}
             >
          <ContainerPageLLR></ContainerPageLLR>
        </TabPane>
      </Tabs>
    </div>
  );
}
