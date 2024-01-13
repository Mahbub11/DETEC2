import React, { useEffect, useState } from "react";
import { ReactComponent as MenuBar } from "../../Assets/SVG/menu.svg";
import { ReactComponent as Cross } from "../../Assets/SVG/Cross.svg";
import { SidebarData } from "../../utils/SideBarData";
import { ToggleBlury } from "../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import IconCommingSoon from "../../Assets/SVG/IconCommingSoon";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import IconFB from "../../Assets/SVG/IconFB";
import IconYoutube from "../../Assets/SVG/IconYoutube";
import IconTelegram from "../../Assets/SVG/IconTelegram";
import IconFeedback from "../../Assets/SVG/IconFeedback";

export default function Header() {
  const [sidebar, setSidebar] = useState(false);
  const dispatch = useDispatch();
  const [showDropDown, setShowDropDown] = useState(false);
  const [showDropDownC, setShowDropDownC] = useState(false);
  const [top, setTop] = useState(true);
  let location = useLocation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const scrollHandler = () => {
      window.scrollY > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  useEffect(() => {
    setSidebar(false);
  }, [location]);

  const showSidebar = () => {
    setSidebar(!sidebar);
    dispatch(ToggleBlury());
  };

  const handlePracticeBtn = () => {
    setShowDropDown(true);
  };

  return (
    <div className="w-full sticky top-0 z-50">
      <div
        className={`${!top ? "shadow-md" : ""} h-[80px] 
       z-auto bg-[#e0ebf8] md:px-7 sm:px-2  w-full rounded-sm  m-auto border-none outline-none`}
      >
        <div className="flex justify-between w-full m-auto px-1 py-1">
          <h1
            className="sm:text-[30px] md:text-[40px] md:mt-2 sm:mt-4  bg-gradient-to-r
         from-blue-600 via-green-600 to-indigo-500 inline-block text-transparent bg-clip-text
          text-center text-[22px] font-lobster font-[500] drop-shadow-sm lg:w-[20%]"
          >
            <Link to={"/"}>PracticeMania</Link>
          </h1>
          <div className="lg:hidden md:visible  self-end h-full w-full">
            <div className="self-end flex justify-end">
              <button onClick={showSidebar} className="">
                <span>
                  <MenuBar
                    className={`${
                      sidebar ? "hidden" : "block"
                    } h-[4rem] w-[3rem] mt-[.5rem]`}
                  ></MenuBar>
                  <Cross
                    className={`${
                      sidebar ? "block" : "hidden"
                    } h-[4rem] w-[3rem] mt-[.5rem]`}
                  ></Cross>
                </span>
              </button>
            </div>
          </div>

          <div>
            <nav
              className={
                sidebar
                  ? " mt-[3rem]  z-50 text-black absolute left-[59%] w-[40%] h-full rounded-b-md"
                  : "hidden"
              }
            >
              <div className="w-full h-auto flex:col  justify-end bg-home/50 shadow-md mt-[2rem]">
                <div className="flex justify-center m-auto px-2 py-5">
                  <ul className="mt-8 flex:col  justify-start ">
                    {SidebarData.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="transition
                       duration-350 ease-in-out font-montserrat font-[500]
                        text-black mt-2 w-auto ml-2 hover:bg-tahiti hover:text-white rounded px-3 py-2"
                        >
                          <Link to={item.path}>
                            <span className="font-montserrat font-[500] text-[20px]">
                              {item.title}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <button className="mt-10 w-[100%] h-[3rem] bg-home">
                  <span className="mr-5 text-[20px] px-1 font-montserrat h-[2rem] font-[600] text-red-400 ml-3">
                    Logout
                  </span>
                </button>
              </div>
            </nav>
          </div>

          <div
            className="w-[90%] lg:mr-[10rem] sm:hidden md:hidden lg:flex gap-5 justify-center
         mt-5 font-montserrat text-black font-[400] "
          >
            <Link to={"/"}>
              {" "}
              <h1 className="text-[25px] hover:underline cursor-pointer">
                Home
              </h1>
            </Link>
            <h1
              className="text-[25px] h-auto"
              onMouseLeave={(e) => setShowDropDown(false)}
              onMouseEnter={(e) => setShowDropDown(true)}
            >
              <button>Practice</button>
              <div
                className={`${
                  showDropDown ? "block" : "hidden"
                } bg-[#bbd3f1ca] w-auto h-auto rounded-md absolute left-[40%] top-15 shadow-sm
              `}
              >
                <div
                  className="flex flex-col justify-start gap-3 text-[20px] font-montserrat font-[400] 
                px-5 py-3 text-gray-800   duration-2000 transition-opacity ease-in opacity-100"
                >
                  <Link to={"duolingo/module/reading"}>
                    <h1 className="hover:underline">Duolingo</h1>
                  </Link>
                  <div className="flex gap-3">
                    <h1>IELTS</h1>
                    <span>
                      <IconCommingSoon
                        height="2rem"
                        width="[2rem]"
                      ></IconCommingSoon>
                    </span>
                  </div>
                </div>
              </div>
            </h1>

            <Link to={"/materials"}>
              <h1 className="text-[25px] hover:underline cursor-pointer">
                Materials
              </h1>
            </Link>
            <Link to={"/articals"}>
              <h1 className="text-[25px] hover:underline cursor-pointer">
                Articals
              </h1>
            </Link>
           
            <h1
              className="text-[25px] h-auto"
              onMouseLeave={(e) => setShowDropDownC(false)}
              onMouseEnter={(e) => setShowDropDownC(true)}
            >
              <button>Community</button>
              <div
                className={`${
                  showDropDownC ? "block" : "hidden"
                } bg-[#bbd3f1ca] w-auto h-auto rounded-md absolute left-[65%] top-15 shadow-sm z-50
              `}
              >
                <div
                  className="flex flex-col justify-start gap-3 text-[20px] font-montserrat font-[400] 
                      px-5 py-3 text-gray-800  duration-2000 transition-opacity ease-in opacity-100"
                >
                  <Link to={"duolingo/module/reading"}>
                   <div className="flex gap-1">
                    <span className="mt-1"><IconFB height='1.3rem' width='1.3rem'></IconFB></span>
                   <h1 className="hover:underline text-gray-700">Facebook </h1>
                   </div>
                  </Link>
                  <Link to={"duolingo/module/reading"}>
                  <div className="flex gap-1">
                    <span className="mt-1"><IconYoutube height='1.3rem' width='1.3rem'></IconYoutube></span>
                   <h1 className="hover:underline text-gray-700">Youtube </h1>
                   </div>
                  </Link>
                  <Link to={"duolingo/module/reading"}>
                  <div className="flex gap-1">
                    <span className="mt-1"><IconTelegram height='1.3rem' width='1.3rem'></IconTelegram></span>
                   <h1 className="hover:underline text-gray-700">Telegram </h1>
                   </div>
                  </Link>
                  <Link to={"community"}>
                  <div className="flex gap-1">
                    <span className="mt-1"><IconFeedback height='1.3rem' width='1.3rem'></IconFeedback></span>
                   <h1 className="hover:underline text-gray-700">Your Feedback </h1>
                   </div>
                  </Link>
                </div>
              </div>
            </h1>
          </div>

          <div className="mt-3 sm:hidden md:block ">
            <Link
              to={"/profile/dashboard"}
              className={`${userInfo ? "block" : "hidden"} cursor-pointer mt-1`}
            >
              <Avatar size="large" icon={<UserOutlined />} />
            </Link>
            <div className={`${userInfo ? "hidden" : "block"}`}>
              <Link
                to={"/auth/signin"}
                className="bg-[#3AB7BF] px-5 py-3 mt-1 flex justify-center items-center m-auto
             text-[15px] rounded-md text-white font-[700]"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
