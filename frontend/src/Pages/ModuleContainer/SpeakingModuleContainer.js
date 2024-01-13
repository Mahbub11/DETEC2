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
import InfomationSpeaking from "../ISNSpeaking/InfomationSpeaking";
import SuggestionSpeaking from "../ISNSpeaking/SuggestionSpeaking";
import { useDispatch, useSelector } from "react-redux";
import { getListOfSpeaking } from "../../redux/slices/getSpeakingList";
import { ReactComponent as LoadingComponent } from "../../Assets/SVG/IconLoadingBlock.svg";
import GuideLineSpeaking from "../ISNSpeaking/GuideLineSpeaking";
const { Header, Sider, Content } = Layout;
const { TabPane } = Tabs;
const { useBreakpoint } = Grid;

export default function SpeakingModuleContainer() {
    const { lg } = useBreakpoint(); // lg is one of the elements returned if screenwidth exceeds 991
  const myFontSize = lg ? "130px" : "15px";
  const dispatch = useDispatch();
  const [busy, isBusy] = useState(true);
  const { listSpeaking } = useSelector((state) => state.bookmark); 
  const { statSpeaking } = useSelector((state) => state.statistic);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  
  useEffect(() => {
    dispatch(getListOfSpeaking(listSpeaking,statSpeaking));
    isBusy(false);
  }, []);

const items=[
    {
        key:1,
        label: (
            <span className="sm:text-[15px] md:text-[40px]">
              Speaking
            </span>
          ),
        children: <Speaking></Speaking>
        
    },
    // {
    //     key:2,
    //     label: (
    //         <span className="sm:text-[15px] md:text-[30px]">
    //            Information
    //         </span>
    //       ),
    //     children:<InfomationSpeaking></InfomationSpeaking>
    // },
    {
        key:3,
        label: (
            <span className="sm:text-[15px] md:text-[30px]">
              Suggestion & Notes
            </span>
          ),
        children:<GuideLineSpeaking></GuideLineSpeaking>
    },
    // {
    //     key:4,
    //     label: (
    //         <span className="sm:text-[15px] md:text-[30px]">
    //           Notes
    //         </span>
    //       ),
    //     children:'Content of Tab Pane 1'
    // }
]





  return (

    <div>
      {
        busy ? <LoadingComponent></LoadingComponent>:
        <Layout className="h-screen">
      
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background:"#f8f9fa"
          }}
        >
             <Tabs
            centered
            tabBarGutter={myFontSize}
            defaultActiveKey="1"
            className="bg-home md:h-[5.4rem] sm:h-[3rem]"
            items={items}
        
          >
           
          </Tabs>
      
        </Content>
      </Layout>
      }
    </div>
    
  
  );
};

