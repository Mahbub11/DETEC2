import React, { useEffect, useState } from "react";
import { Input } from "antd";
import {
  Tag,
  Button,
  notification,
  Grid,
  Skeleton,
  Collapse,
  Progress,
} from "antd";

import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import { Statistic } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  DisableVisibility,
  ToggleVisibility,
} from "../../redux/slices/fillgap";
import "../../Components/Reading/RadioBtn.css";
import { getWordDetails } from "../../redux/slices/disctionary";
import { useLocation, useParams } from "react-router-dom";
import IconsArrowLeft from "../../Assets/SVG/IconsArrowLeft";
import IconsArrowRight from "../../Assets/SVG/IconsArrowRight";
import { clearStatDataError, saveStatData } from "../../redux/slices/statistic";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { toggleBookmark } from "../../redux/slices/bookmark";
import { SaveRHAInput, SaveRHAResult } from "../../redux/slices/readingInput";
import RHAEvaluate from "../../Components/Reading/RHAEvaluate";
const { useBreakpoint } = Grid;

const { TextArea } = Input;
const { Countdown } = Statistic;
const deadline = Date.now() + 100000;

export default function PracticePageRHA({ data }) {
  const dispatch = useDispatch();

  // let [index, setIndex] = useState(id);
  const [api, contextHolder] = notification.useNotification();

  const [timeDanger, setTimeDanger] = useState(false);
  const [mobile, setMobile] = useState(window.innerWidth <= 500);
  const { listRHA } = useSelector((state) => state.getReadingList);
  const { visibility } = useSelector((state) => state.fillgap);
  const { error } = useSelector((state) => state.statistic);
  const { userInfo } = useSelector((state) => state.auth);
  const { inputRHA } = useSelector((state) => state.readingInput);
  const { resultRHA } = useSelector((state) => state.readingInput);
  const [selectVal, setSelectVal] = useState(inputRHA);
  const [bColor, setBcolor] = useState(true);
  const { rid } = useParams();
  let dataLength = listRHA.length;

  const handleWindowSizeChange = () => {
    setMobile(window.innerWidth <= 500);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const handleMobileInput = (e) => {
    console.log(e);

    setSelectVal(e.replace(/\.$/, ""));
    const answer = data.qa.a.toString();

    const statData = {
      result:
        e.replace(/\.$/, "").trim() ===
        answer.replace(/\.$/, "").trim()
          ? 100
          : 0,
    };

    dispatch(SaveRHAResult(statData));

    dispatch(SaveRHAInput(e.replace(/\.$/, "")));
  };

  const handleMouseUp = () => {
    let data1 = [];
    window
      .getSelection()
      .toString()
      .split(" ")
      .map((val) => {
        data1.push(val.replace(/\s+/g, " ").trim());
      });

    setSelectVal(data1.join(" ").replace(/\.$/, ""));
    const answer = data.qa.a.toString();
    const statData = {
      result:
        data1.join(" ").replace(/\.$/, "").trim() ===
        answer.replace(/\./g,' ').trim()
          ? 100
          : 0,
    };

   
    dispatch(SaveRHAResult(statData));

    dispatch(SaveRHAInput(data1.join(" ").replace(/\.$/, "")));
  };
  const handleMeaning = (val) => {
    dispatch(getWordDetails(val.target.textContent));
  };

  

  return (
    <div>
      {false ? (
        <Skeleton active></Skeleton>
      ) : (
        <div className="h-auto w-[99%] m-auto bg-[#fffffff7] md:px-5 md:py-5">
          {contextHolder}
          <div className="flex flex-col gap-5 sm:px-2">
            <h1 className="text-[22px] font-montserrat font-[500] underline self-center">
              Read then HighLight
            </h1>

            <div className="flex flex-col gap-3 justify-center rounded-md md:px-2">
              <div className="m-auto w-full md:px-2 md:py-2 ">
                <div className="sm:text-[18px] md:text-[28px] mx-auto">
                  <div className="md:w-full sm:w-full  m-auto mt-[1rem] ">
                    <div>
                      {data.title ? (
                        <h1 className="text-center sm:text-[15px] md:text-[20px] font-[500] font-poppins mt-[2rem] underline">
                          {data.title}
                        </h1>
                      ) : (
                        ""
                      )}
                      <div
                        className="md:flex md:flex-row sm:flex sm:flex-col 
                      justify-between md:gap-5 sm:gap-2 md:mt-2 md:w-full"
                      >
                        <div
                          className=" text-[20px] flex  gap-1 leading-1 md:w-[60%] sm:w-full msm:w-[100%]
                          m-auto mt-2"
                        >
                          <div className="  rounded-sm">
                            <p
                              onMouseUp={handleMouseUp}
                              className=" md:py-2 sm:text-[15px] md:text-[18px] sm:leading-5
                            md:leading-7 font-montserrat font-[400] text-justify"
                            >
                              <div className="sm:mt-10 md:mt-0">
                                {/* <h1 className="text-justify flex flex-wrap gap-1">{passageData}</h1> */}
                                <div>
                                  {visibility ? (
                                    <div
                                      className="w-full  flex flex-wrap font-[400] leading-1 m-auto gap-1
                                    md:px-5 md:py-4  sm:px-3 sm:py-2 text-justify font-poppins border-[1px] rounded-md shadow-sm"
                                    >
                                      <RHAEvaluate
                                        answer={data?.qa?.a.replace(/\./g, "")}
                                        passage={data.qa.passage.split(".")}
                                      ></RHAEvaluate>
                                    </div>
                                  ) : (
                                    <div
                                      className="w-full  flex flex-wrap font-[400] leading-1 m-auto gap-1
                                    md:px-5 md:py-4  sm:px-3 sm:py-2 text-justify font-poppins border-[1px] rounded-md shadow-sm"
                                    >
                                      {data.qa.passage
                                        .split(" ")
                                        .map((val, index) => {
                                          return (
                                            <div>
                                              <p
                                                className={`cursor-pointer md:hover:text-blue-500 text-justify`}
                                                onClick={handleMeaning}
                                              >
                                                <h1 className="text-justify">
                                                  {val}
                                                </h1>
                                              </p>
                                            </div>
                                          );
                                        })}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div
                                className={`${
                                  mobile ? "block" : "hidden"
                                } text-center text-[15px] font-poppins font-[400] mt-3`}
                              >
                                <h1>
                                  {" "}
                                  *Select Ans From Passage and Paste in TextArea
                                </h1>
                              </div>
                            </p>
                          </div>
                        </div>

                        <div className="sm:mt-10 md:mt-4 sm:w-[90%] md:w-[40%] m-auto ">
                          <h1
                            className={`${
                              mobile ? "hidden" : "block"
                            } text-[18px] font-poppins`}
                          >
                            Click and drag text to highlight the answer to the
                            question below
                          </h1>

                          <h1 className="px-2 sm:text-[15px] md:text-[18px] pb-4 font-montserrat font-[400] mt-10">
                            {data.qa.q}
                          </h1>

                          <div>
                            {mobile ? (
                              <div>
                                {" "}
                                <TextArea
                                  style={{ display: "flex" }}
                                  // disabled={visibility ? true : false}
                                  value={selectVal}
                                  onChange={(e) =>
                                    handleMobileInput(e.target.value)
                                  }
                                  className={`${
                                    visibility
                                      ? inputRHA.trim() ===
                                        data?.qa?.a.replace(/\./g, "").trim()
                                        ? "text-green-400 font-[500] text-[17px]"
                                        : "text-red-500"
                                      : "text-black"
                                  }  ${
                                    mobile ? "" : ""
                                  } w-full h-[35rem]  flex font-montserrat  font-[500] text-[17px]`}
                                  rows={7}
                                  placeholder="Select Sentence/Word From Passage"
                                />
                              </div>
                            ) : (
                              <div>
                                <TextArea
                                  style={{ display: "flex" }}
                                  // disabled={visibility ? true : false}
                                  value={selectVal}
                                  className={`${
                                    visibility
                                      ? inputRHA.trim() ===
                                        data?.qa?.a.replace(/\./g, "").trim()
                                        ? "text-green-500 font-[500] text-[17px]"
                                        : "text-red-500"
                                      : "text-black"
                                  }  ${
                                    mobile ? "" : ""
                                  } w-full h-[35rem]  flex font-montserrat  font-[500] text-[17px]`}
                                  rows={7}
                                  readOnly={mobile ? false : true}
                                  placeholder="Select Sentence/Word From Passage"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`${visibility ? "block" : "hidden"}`}>
              <div className="h-auto w-[95%] m-auto">
                <Collapse
                  accordion
                  items={[
                    {
                      key: "1",
                      label: "Model Answer",
                      children: (
                        <p className="flex gap-3 flex-wrap">
                          {data?.qa?.a.split(" ").map((val) => (
                            <p
                              className="cursor-pointer md:hover:text-tahiti"
                              onClick={handleMeaning}
                            >
                              {val + ""}
                            </p>
                          ))}
                        </p>
                      ),
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
