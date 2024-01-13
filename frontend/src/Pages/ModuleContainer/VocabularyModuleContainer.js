import React, { useEffect, useState } from "react";
import { Layout, theme, Tabs, Grid } from "antd";
import Vocabulary from "../Modules/Vocabulary";
import InfomationVoc from "../ISNVocabulary/InfomationVoc";
import SuggestionVoc from "../ISNVocabulary/SuggestionVoc";
import NotesVoc from "../ISNVocabulary/NotesVoc";
import { useDispatch, useSelector } from "react-redux";
import { getVocabularyList } from "../../redux/slices/getVocList";
import { ReactComponent as LoadingComponent } from "../../Assets/SVG/IconLoadingBlock.svg";
const { Content } = Layout;
const { useBreakpoint } = Grid;

export default function VocabularyModuleContainer() {
  const { lg } = useBreakpoint(); // lg is one of the elements returned if screenwidth exceeds 991
  const myFontSize = lg ? "130px" : "15px";
  const dispatch = useDispatch();
  const [busy, isBusy] = useState(true);
  const { listVocabulary } = useSelector((state) => state.bookmark);  
  const { statVocabulary } = useSelector((state) => state.statistic);
  
  useEffect(() => {
    dispatch(getVocabularyList(listVocabulary,statVocabulary));
    isBusy(false);
  }, []);


  const items = [
    {
      key: 1,
      label: <span className="sm:text-[15px] md:text-[40px]">Vocabulary</span>,
      children: <Vocabulary></Vocabulary>,
    },
    // {
    //   key: 2,
    //   label: <span className="sm:text-[15px] md:text-[30px]">Information</span>,
    //   children: <InfomationVoc></InfomationVoc>,
    // },
    {
      key: 3,
      label: <span className="sm:text-[15px] md:text-[30px]">Suggestion</span>,
      children: <SuggestionVoc></SuggestionVoc>,
    },
    {
      key: 4,
      label: <span className="sm:text-[15px] md:text-[30px]">Notes</span>,
      children: <NotesVoc></NotesVoc>,
    },
  ];

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
        ></Tabs>
      </Content>
    </Layout>
      }
    </div>
    
  );
}
