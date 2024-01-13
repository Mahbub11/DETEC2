import React, { useState } from "react";
import { Breadcrumb, Layout, Menu, theme, notification, Button } from "antd";
import { RollbackOutlined } from "@ant-design/icons";
import PracticePage from "../../Pages/PracticeWriting/PracticePageWAP";
import { Outlet } from "react-router-dom";
import { Col, Row, Statistic } from "antd";
import { BorderTopOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import WordDetailsModel from "../../Components/Helper/WordDetailsModel";
import ScoringLayout from "../ScoringLayout/ScoringLayout";
import SectionAddition from "../../Pages/SectionAddition/SectionAddition";
import IconsArrowLeft from "../../Assets/SVG/IconsArrowLeft";
import { useNavigate } from 'react-router-dom';
const { Header, Content, Footer } = Layout;

const PracticeLayout = () => {
 
  const { showAssesment } = useSelector((state) => state.getAssesment);
  const [closeModal,setCloseModal] = useState(false)
  const navigate = useNavigate();


  return (
    <Layout>
      <div className={`${showAssesment ? "block" : "hidden"}`}>
        <ScoringLayout></ScoringLayout>
      </div>
      <div
        className={`${
          showAssesment ? "blur-md" : "none"
        } h-auto  md:w-[70%] sm:w-[95%]
       m-auto mt-10 rounded-md  `}
      >
        <div onClick={() => navigate(-1)} className="absolute flex justify-end  px-2 py-2 md:w-[70%] cursor-pointer">
         <span className="px-3 py-2">
         <IconsArrowLeft height='1.5rem' width='1.5rem'></IconsArrowLeft>
         </span>
          {/* <RollbackOutlined
            label="Back"
            style={{ fontSize: "26px", color: "#08c" }}
            className="h-10 w-10"
          ></RollbackOutlined> */}
        </div>
        <div className=" flex flex-col justify-between gap-[5rem]">
          {/* {
           visibility ? <WordDetailsModel></WordDetailsModel>:''
         } */}
          <Outlet></Outlet>
        </div>
      </div>
    </Layout>
  );
};
export default PracticeLayout;
