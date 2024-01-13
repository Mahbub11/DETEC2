import React, { useEffect, useState } from "react";
import { Layout, Menu, Button, theme, Tabs, Grid } from "antd";
import { notification } from "antd";
import { Input } from "antd";
import ContainerPageSAL from "../ModuleSpeaking/ContainerPageSAL";
import ContainerPageSAP from "../ModuleSpeaking/ContainerPageSAP";
import ContainerPageSRS from "../ModuleSpeaking/ContainerPageSRS";
import ContainerPageSLS from "../ModuleSpeaking/ContainerPageSLS";
import { useSelector } from "react-redux";
import ContainerPageSS from "../ModuleSpeaking/ContainerPageSS";

const { TabPane } = Tabs;
const { useBreakpoint } = Grid;
export default function Speaking() {
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
          tab="Read Aloud"
          key="1"
          style={{ width: "100%", fontSize: "25px" }}
          >
          <ContainerPageSAL></ContainerPageSAL>
        </TabPane>
        <TabPane
          tab="Speak about the Photo"
          key="2"
          style={{ width: "100%", fontSize: "25px" }}
          >
         <ContainerPageSAP></ContainerPageSAP>
        </TabPane>
        <TabPane
          tab="Read then Speak"
          key="3"
          style={{ width: "100%", fontSize: "25px" }}
          >
        <ContainerPageSRS></ContainerPageSRS>
       
        </TabPane>
        <TabPane
          tab="Listen then Speak"
          key="4"
          style={{ width: "100%", fontSize: "25px" }}
          >
       <ContainerPageSLS></ContainerPageSLS>
        </TabPane>
        <TabPane
          tab="Speaking Sample"
          key="5"
          style={{ width: "100%", fontSize: "25px" }}
          >
       <ContainerPageSS></ContainerPageSS>
        </TabPane>
       
      </Tabs>
    </div>
  );
}
