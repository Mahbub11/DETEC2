import React, { useState } from "react";
import {  Tabs, Grid } from "antd";
import ContainerPageWAP from "../ModuleWriting/ContainerPageWAP";
import ContainerPageRTW from "../ModuleWriting/ContainerPageRTW";
import ContainerPageWS from "../ModuleWriting/ContainerPageWS";

const { TabPane } = Tabs;
const { useBreakpoint } = Grid;
export default function Writing() {
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
          tab="Write About the photo"
          key="1"
          style={{ width: "100%", fontSize: "25px" }}
          >
          <ContainerPageWAP></ContainerPageWAP>
        </TabPane>
        <TabPane
          tab="Read the Write"
          key="2"
          style={{ width: "100%", fontSize: "25px" }}
          >
           <ContainerPageRTW></ContainerPageRTW>
        </TabPane>
        <TabPane
          tab="Writing Sample"
          key="3"
          style={{ width: "100%", fontSize: "25px" }}
          >
           <ContainerPageWS></ContainerPageWS>
        </TabPane>

      </Tabs>
    </div>
  );
}
