import React, { useState } from "react";
import { Layout, theme, Tabs, Grid } from "antd";
import { Input } from "antd";
import ContainerPageRC from "../ModuleReading/ContainerPageRC";
import ContainerPageRCS from "../ModuleReading/ContainerPageRCS";
import ContainerPageRCP from "../ModuleReading/ContainerPageRCP";
import ContainerPageRHA from "../ModuleReading/ContainerPageRHA";
import ContainerPageRCI from "../ModuleReading/ContainerPageRCI";
import ContainerPageRGP from "../ModuleReading/ContainerPageRGP";
import ContainerPageInteractiveReading from "../ModuleReading/ContainerPageInteractiveReading";

const { Search } = Input;

const { Header, Sider, Content } = Layout;
const { TabPane } = Tabs;
const { useBreakpoint } = Grid;
export default function Reading() {
  const { lg } = useBreakpoint(); // lg is one of the elements returned if screenwidth exceeds 991
  const myFontSize = lg ? "50px" : "15px";

  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
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
          tab="Read and Complete"
          key="1"
          style={{ width: "100%", fontSize: "25px" }}
        >
          <ContainerPageRC></ContainerPageRC>
        </TabPane>
        <TabPane
          tab="Interactive Reading"
          key="11"
          style={{ width: "100%", fontSize: "25px" }}
        >
          <ContainerPageInteractiveReading></ContainerPageInteractiveReading>
        </TabPane>
        {/* <TabPane
          tab="Complete the Sentence"
          key="2"
          style={{ width: "100%", fontSize: "25px" }}
        >
          <ContainerPageRCS></ContainerPageRCS>
        </TabPane>
        <TabPane
          tab="Complete the Passage"
          key="3"
          style={{ width: "100%", fontSize: "25px" }}
        >
          <ContainerPageRCP></ContainerPageRCP>
        </TabPane>
        <TabPane
          tab="HighLight Answer"
          key="4"
          style={{ width: "100%", fontSize: "25px" }}
        >
          <ContainerPageRHA></ContainerPageRHA>
        </TabPane>
        <TabPane
          tab="Select the Idea"
          key="5"
          style={{ width: "100%", fontSize: "25px" }}
        >
          <ContainerPageRCI></ContainerPageRCI>
        </TabPane>
        <TabPane
          tab="Give title of the Passage"
          key="6"
          style={{ width: "100%", fontSize: "25px" }}
        >
          <ContainerPageRGP></ContainerPageRGP>
        </TabPane> */}
      </Tabs>
    </div>
  );
}
