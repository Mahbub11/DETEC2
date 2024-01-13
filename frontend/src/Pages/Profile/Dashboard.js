import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import { EyeOutlined, HomeOutlined } from "@ant-design/icons";
import Statistic from "./Statistic";
import MyWordList from "./MyWordList";
import Setting from "./Setting";
import { useNavigate } from "react-router-dom";
import Bookmark from "./Bookmark";
import { useDispatch } from "react-redux";
import { getBookmarkList } from "../../redux/slices/bookmark";
import { getStatDuolingo } from "../../redux/slices/statistic";
import { persistor } from "../../redux/store";
import { getVocabularyList } from "../../redux/slices/getVocList";
import { getListOfReading } from "../../redux/slices/getReadingList";
import { getListOfListening } from "../../redux/slices/getListeningList";
import { getListOfSpeaking } from "../../redux/slices/getSpeakingList";
import { getListOfWriting } from "../../redux/slices/getWritingList";

export default function Dashboard() {
  const [type, setType] = useState(2);
  const navigate = useNavigate();
  const dispatch= useDispatch()

  const handleMenuButtonClick = (id) => {
    setType(id);
  };
  useEffect(() => {
    dispatch(getVocabularyList([],[]))
    dispatch(getListOfReading([],[]))
    dispatch(getListOfListening([],[]))
    dispatch(getListOfSpeaking([],[]))
    dispatch(getListOfWriting([],[]))
    dispatch(getBookmarkList());
    dispatch(getStatDuolingo())
  },[]);

  const handleLogout = () => {
    persistor.purge()
    localStorage.removeItem("access");
    window.location.reload(true);
    navigate("/");
  };
  return (
    <div className="h-full md:w-[95%] sm:w-full md:ml-5 px-2  flex justify-center ">
      <div className="md:h-full sm:h-full w-full px-2  md:flex-row sm:flex sm:flex-col gap-3 justify-start">
        {/* <h1 className="text-[22px] font-poppins text-center underline mt-[2rem] md:hidden">
          DashBoard
        </h1> */}
        <div className="h-auto md:w-[15%] sm:w-full  flex justify-center items-center md:mt-10">
          <div
            className=" rounded-md  sm:bg-transparent md:w-[10rem] 
            sm:w-full h-full flex justify-center items-center m-auto md:px-2 md:py-1 "
          >
            <div
              className="md:h-[80%] sm:h-[60%] w-full  md:flex md:flex-col sm:flex sm:flex-row md:justify-center
            sm:justify-start gap-2
            sm:flex-wrap "
            >
              <div
                onClick={() => handleMenuButtonClick(1)}
                className={`${
                  type === 1 ? "bg-tahiti" : "bg-home"
                } md:h-[3rem] md:w-[95%] sm:w-[30%] 
                rounded-md`}
              >
                <div
                  className="flex justify-center gap-3 
                 px-2 py-1 items-center m-auto h-full cursor-pointer"
                >
                  <span>
                    <HomeOutlined></HomeOutlined>
                  </span>
                  <h1>Profile</h1>
                </div>
              </div>
              <div
                onClick={() => handleMenuButtonClick(2)}
                className={`${
                  type === 2 ? "bg-tahiti" : "bg-home"
                }  md:h-[3rem] md:w-[95%] sm:w-[30%] 
                rounded-md`}
              >
                <div
                  className="flex justify-center gap-3 
                 px-2 py-1 items-center m-auto h-full cursor-pointer"
                >
                  <span>
                    <HomeOutlined></HomeOutlined>
                  </span>
                  <h1>Statistic</h1>
                </div>
              </div>
              <div
                onClick={() => handleMenuButtonClick(3)}
                className={`${
                  type === 3 ? "bg-tahiti" : "bg-home"
                } md:h-[3rem] md:w-[95%] sm:w-[30%] 
                rounded-md`}
               >
                <div
                  className="flex justify-center gap-3 
                 px-2 py-1 items-center m-auto h-full cursor-pointer ml-2"
                >
                  <span>
                    <HomeOutlined></HomeOutlined>
                  </span>
                  <h1>WordList</h1>
                </div>
              </div>
              <div
                onClick={() => handleMenuButtonClick(5)}
                className={`${
                  type === 5 ? "bg-tahiti" : "bg-home"
                } md:h-[3rem] md:w-[95%] sm:w-[30%] 
                rounded-md`}
               >
                <div
                  className="flex justify-center gap-3 
                 px-2 py-1 items-center m-auto h-full cursor-pointer ml-4"
                >
                  <span>
                    <HomeOutlined></HomeOutlined>
                  </span>
                  <h1>Bookmark</h1>
                </div>
              </div>
              <div
                onClick={() => handleMenuButtonClick(4)}
                className={`${
                  type === 4 ? "bg-tahiti" : "bg-home"
                } md:h-[3rem] md:w-[95%] sm:w-[30%] 
                rounded-md`}
              >
                <div
                  className="flex justify-center gap-3 
                 px-2 py-1 items-center m-auto h-full cursor-pointer"
                >
                  <span>
                    <HomeOutlined></HomeOutlined>
                  </span>
                  <h1>Setting</h1>
                </div>
              </div>
              <div
                onClick={() => handleMenuButtonClick(1)}
                className=" md:h-[3rem] md:w-[95%] sm:w-[30%]  bg-home rounded-md "
              >
                <div
                  onClick={handleLogout}
                  className="flex justify-center gap-3 
                 px-2 py-1 items-center m-auto h-full cursor-pointer"
                >
                  <span>
                    <HomeOutlined></HomeOutlined>
                  </span>
                  <h1>Logout</h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:h-[35rem] xxxl:h-[43rem] w-full">
          {type === 1 ? (
            <div className="h-full md:w-[85%] sm:w-full sm:m-auto">
              <Profile></Profile>
            </div>
          ) : (
            ""
          )}
          {type === 2 ? (
            <div className="h-auto md:w-[85%] sm:w-full sm:m-auto md:mt-[2rem]">
              <Statistic></Statistic>
            </div>
          ) : (
            ""
          )}
          {type === 3 ? (
            <div className="h-full md:w-[85%] sm:w-full sm:m-auto">
              <MyWordList></MyWordList>
            </div>
          ) : (
            ""
          )}
          {type === 4 ? (
            <div className="h-full md:w-[85%] sm:w-full sm:m-auto">
              <Setting></Setting>
            </div>
          ) : (
            ""
          )}
           {type === 5 ? (
            <div className="h-full md:w-[85%] sm:w-full sm:m-auto">
              <Bookmark></Bookmark>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
