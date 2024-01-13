import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import LayoutAnimation from "../../Assets/SVG/LayoutAnimation";
import Footer from "../../Components/Home/Footer";
import Header from "../../Components/Home/Header";

export default function ContentLayout() {
  let [visible, setVisiable] = useState(1);
  let location = useLocation();
  const { common } = useSelector((state) => state.app);

  useEffect(() => {
    setVisiable(++visible);
  }, [location]);

  return (
    <div className="w-full h-auto bg-[#FFFF] sm:h-screen">
      <div className="">
        <Header></Header>

        <div className={`${common.blury ? "blur-sm" : ""} mt-10`}>
          <Outlet></Outlet>
        </div>

        <Footer></Footer>
      </div>
    </div>
  );
}
