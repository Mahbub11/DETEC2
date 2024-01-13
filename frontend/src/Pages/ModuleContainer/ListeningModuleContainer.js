import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Tabs, Grid } from "antd";
import Writing from "../Modules/Writing";
import Reading from "../Modules/Reading";
import Speaking from "../Modules/Speaking";
import Listening from "../Modules/Listening";
import InfomationListening from "../ISNListening/InfomationListening";
import SuggestionListening from "../ISNListening/SuggestionListening";
import { useDispatch, useSelector } from "react-redux";
import { getListOfListening } from "../../redux/slices/getListeningList";
import { ReactComponent as LoadingComponent } from "../../../src/Assets/SVG/IconLoadingBlock.svg";
import GuideLineListening from "../ISNListening/GuideLineListening";
const { Header, Sider, Content } = Layout;
const { TabPane } = Tabs;
const { useBreakpoint } = Grid;

export default function ListeningModuleContainer() {
  const { lg } = useBreakpoint(); // lg is one of the elements returned if screenwidth exceeds 991
  const myFontSize = lg ? "130px" : "15px";
  const dispatch = useDispatch();
  const [busy, isBusy] = useState(true);
  const { listListening } = useSelector((state) => state.bookmark); 
  const { statListening } = useSelector((state) => state.statistic);


  useEffect(() => {
    dispatch(getListOfListening(listListening,statListening));
    isBusy(false);
  }, []);

  const items = [
    {
      key: 1,
      label: <span className="sm:text-[15px] md:text-[40px]">Listening</span>,
      children: <Listening></Listening>,
    },
    // {
    //     key:2,
    //     label: (
    //         <span className="sm:text-[15px] md:text-[30px]">
    //            Information
    //         </span>
    //       ),
    //     children:<InfomationListening></InfomationListening>
    // },
    {
      key: 3,
      label: (
        <span className="sm:text-[15px] md:text-[30px]">
          Suggestion & Notes
        </span>
      ),
      children: <GuideLineListening></GuideLineListening>,
    },
  ];

  return (
    <div>
      {busy ? (
        <LoadingComponent></LoadingComponent>
      ) : (
        <Layout className="h-screen">
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: "#f8f9fa",
            }}
          >
            <Tabs
              centered
              tabBarGutter={myFontSize}
              defaultActiveKey="1"
              className="bg-home md:h-[5.4rem] sm:h-[3rem]"
              items={items}
            ></Tabs>
          </Content>
        </Layout>
      )}
    </div>
  );
}
