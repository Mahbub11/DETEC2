import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Tabs, Grid } from "antd";
import Reading from "../Modules/Reading";
import { useDispatch, useSelector } from "react-redux";
import { getListOfReading } from "../../redux/slices/getReadingList";
import { ReactComponent as LoadingComponent } from "../../../src/Assets/SVG/IconLoadingBlock.svg";
import GuideLineReading from "../ISNReading/GuideLineReading";
const { Header, Sider, Content } = Layout;
const { TabPane } = Tabs;
const { useBreakpoint } = Grid;

export default function ReadingModuleContainer() {
  const { lg } = useBreakpoint(); // lg is one of the elements returned if screenwidth exceeds 991
  const myFontSize = lg ? "130px" : "15px";
  const dispatch = useDispatch();
  const [busy, isBusy] = useState(false);
  const { listReading } = useSelector((state) => state.bookmark); 
  const { statReading } = useSelector((state) => state.statistic);

  useEffect(() => {
    dispatch(getListOfReading(listReading,statReading));
    isBusy(false);
  }, []);



  const items = [
    {
      key: 1,
      label: (
        <span className="sm:text-[15px] md:text-[40px] font-robotomono">
          Reading
        </span>
      ),
      children: <Reading></Reading>,
    },
    // {
    //   key: 2,
    //   label: <span className="sm:text-[15px] md:text-[30px] ">Information</span>,
    //   children: <InfomationReading></InfomationReading>
    // },
    {
      key: 3,
      label: <span className="sm:text-[15px] md:text-[30px]">Suggestion & Notes</span>,
      children: <GuideLineReading></GuideLineReading>,
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
              background:"#f8f9fa"
            }}
          >
            <Tabs
              centered
              tabBarGutter={myFontSize}
              defaultActiveKey="1"
              className="bg-header md:h-[5.4rem] sm:h-[3rem]"
              items={items}
            ></Tabs>
          </Content>
        </Layout>
      )}
    </div>
  );
}
