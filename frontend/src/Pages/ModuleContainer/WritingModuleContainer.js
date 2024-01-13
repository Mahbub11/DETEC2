import React, { useEffect, useState } from "react";
import { Layout,theme, Tabs, Grid } from "antd";
import Writing from "../Modules/Writing";
import InfomationWriting from "../ISNWriting/InfomationWriting";
import SuggestionWriting from "../ISNWriting/SuggestionWriting";
import { useDispatch, useSelector } from "react-redux";
import { getListOfWriting } from "../../redux/slices/getWritingList";
import { ReactComponent as LoadingComponent } from "../../../src/Assets/SVG/IconLoadingBlock.svg";
import GuideLineWriting from "../ISNWriting/GuideLineWriting";
const {  Content } = Layout;
const { useBreakpoint } = Grid;


export default function WritingModuleContainer() {
  const { lg } = useBreakpoint(); // lg is one of the elements returned if screenwidth exceeds 991
  const myFontSize = lg ? "130px" : "15px";
  const dispatch = useDispatch();
  const [busy, isBusy] = useState(true);
  const { listWriting } = useSelector((state) => state.bookmark); 
  const { statWriting } = useSelector((state) => state.statistic);


  useEffect(() => {
    dispatch(getListOfWriting(listWriting,statWriting));
    isBusy(false);
  }, []);
 

  const items = [
    {
      key: 1,
      label: <span className="sm:text-[15px] md:text-[40px]">Writing</span>,
      children: <Writing></Writing>,
    },
    // {
    //   key: 2,
    //   label: <span className="sm:text-[15px] md:text-[30px]">Information</span>,
    //   children: <InfomationWriting></InfomationWriting>
    // },
    {
      key: 3,
      label: <span className="sm:text-[15px] md:text-[30px]">Suggestion & Notes</span>,
      children: <GuideLineWriting></GuideLineWriting>
    },
    // {
    //   key: 4,
    //   label: <span className="sm:text-[15px] md:text-[30px]">Notes</span>,
    //   children: "Content of Tab Pane 1",
    // },
  ];

  return (
    <div>
      {
        busy ? <LoadingComponent></LoadingComponent>:
        <Layout className="h-screen ">
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
        ></Tabs>
      </Content>
    </Layout>
      }
    </div>
  );
}
