import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import LayoutAnimation from "../../Assets/SVG/LayoutAnimation";
import Footer from "../../Components/Home/Footer";
import Header from "../../Components/Home/Header";

export default function HomeLayout() {
  let [visible, setVisiable] = useState(1);
  let location = useLocation();
  const { common } = useSelector((state) => state.app);

  useEffect(() => {
    setVisiable(++visible);
  }, [location]);



  return (
    <div className="w-full h-auto bg-[#eff2f69a] ">
      <span
        className={`${
          visible > 0 ? "absolute" : "hidden"
        } -z-10 md:top-0 sm:top-[-140px] overflow-hidden `}
      >
        <LayoutAnimation
          height="30rem"
          width="100%"
          fill="#c8ddf5"
        ></LayoutAnimation>
      </span>
      <Header></Header>
      <div className={`${common.blury ? 'blur-sm':''}`}>
        <Outlet></Outlet>

        <Footer></Footer>
      </div>
    </div>
  );
}
