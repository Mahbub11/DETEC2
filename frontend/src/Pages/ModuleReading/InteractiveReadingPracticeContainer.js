import { Skeleton, Statistic, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PracticePageRCI from "../PracticeReading/PracticePageRCI";
import PracticePageRCP from "../PracticeReading/PracticePageRCP";
import PracticePageRCS from "../PracticeReading/PracticePageRCS";
import PracticePageRGP from "../PracticeReading/PracticePageRGP";
import PracticePageRHA from "../PracticeReading/PracticePageRHA";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { toggleBookmark } from "../../redux/slices/bookmark";
import {
  DisableVisibility,
  ToggleVisibility,
} from "../../redux/slices/fillgap";
import { cleanUserReadingInput, cleanUserReadingResult, SaveRCSResult } from "../../redux/slices/readingInput";
import { saveStatData } from "../../redux/slices/statistic";
import IconCross from "../../Assets/SVG/IconCross";
import PracticePageRHA2 from "../PracticeReading/PracticePageRHA2";
const { Countdown } = Statistic;

export default function InteractiveReadingPracticeContainer({ data, show,handleCloseModal }) {
  const [busy, isBusy] = useState(true);
  const [api, contextHolder] = notification.useNotification();
  const { resultRCS, resultRCP, resultRHA,resultRHA2, resultRGP, resultRCI } = useSelector(
    (state) => state.readingInput
  );
  const { userInfo } = useSelector((state) => state.auth);
  const [bootCounter,setbootCounter]= useState(false);
  
  let [index, setIndex] = useState(0);
  const [listRCS, setRCS] = useState();
  const [listRCP, setRCP] = useState();
  const [listRHA, setRHA] = useState();
  const [listRHA2, setRHA2] = useState();
  const [listRCI, setRCI] = useState();
  const [listRGPT, setRGPT] = useState();
  const [showPreviousBtn, setShowPreviousBtn] = useState(false);
  const [showEvaluateBtn, setShowEvaluateBtn] = useState(false);
  const [bColor, setBcolor] = useState(true);
  const [showNextbtn, setShowNxtBtn] = useState(true);
  const [counter, setCounter] = useState(true);
  const [timeDanger, setTimeDanger] = useState(false);
  const [deadline, setDeadline] = useState(2);
  const [idata, setIData] = useState(data[0]);
  const dispatch = useDispatch();
  const { userInput } = useSelector((state) => state.fillgap);


  useEffect(() => {
    setShowPreviousBtn(false);
    setShowEvaluateBtn(false);
    setShowNxtBtn(true);
    setCounter(true);
    setIndex(0);
    dispatch(DisableVisibility());
  }, [show]);

  
  useEffect(() => {
    setDeadline(Date.now() + data[0]?.time * 60000);
    setBcolor(data[0].bookmark);
    data[0].interactivereadings.map((val) => {
      if (val.inner_type === 321) {
        setRCS(val);
      }
      if (val.inner_type === 322) {
        setRCP(val);
      }
      if (val.inner_type === 323) {
        setRCI(val);
      }
      if (val.inner_type === 324) {
        setRHA(val);
      }
      if (val.inner_type === 325) {
        setRGPT(val);
      }if (val.inner_type === 326) {
        setRHA2(val);
      }
    });

    isBusy(false);
  }, [data, busy]);
  

  const list = [
    <PracticePageRCS  data={listRCS}></PracticePageRCS>,
    <PracticePageRCP index={index} data={listRCP}></PracticePageRCP>,
    <PracticePageRHA index={index} data={listRHA}></PracticePageRHA>,
    <PracticePageRCI data={listRCI}></PracticePageRCI>,
    <PracticePageRGP data={listRGPT}></PracticePageRGP>,
    <PracticePageRHA2 index={index} data={listRHA2}></PracticePageRHA2>,
  ];

  useEffect(() => {
    if (index > 0 && showEvaluateBtn) {
      setShowPreviousBtn(true);
    } else if (index === 0) {
      setShowPreviousBtn(false);
    }

    if (index <= 5) {
      setShowNxtBtn(true);
    } else if (index === 5) {
      setShowNxtBtn(false);
      setShowPreviousBtn(true);
    }
    if (index === 5) {
      setShowNxtBtn(false);
      setShowPreviousBtn(false);
      if (!showEvaluateBtn && counter) {
        setShowEvaluateBtn(true);
        setShowNxtBtn(false);
      }
    }
  }, [index]);

  const openNotification = () => {
    // handleEvaluate()
    notification.open({
      message: `Times Up`,
      placement: "top",
      type: "warning",
      style: {
        border: "2px solid red",
      },
    });
  };
  const handleBookmark = (id, type, inner_type) => {
    setBcolor(!bColor);
    const data = {
      id,
      type,
      inner_type,
    };
    dispatch(toggleBookmark(data));
  };

  const handleEvaluate = () => {
    dispatch(ToggleVisibility());
    setShowEvaluateBtn(false);
    setShowNxtBtn(false);
    setShowPreviousBtn(true);
    setCounter(false);
    const readingResult=(parseInt(resultRCS?.result)+parseInt(resultRCP?.result)+ parseInt(resultRHA?.result)
    +parseInt(resultRHA2?.result)+parseInt(resultRGP?.result)
    +parseInt(resultRCI?.result))

    console.log((resultRCS?.result))
    console.log((resultRCP?.result))
    console.log((resultRHA?.result))
    console.log((resultRHA2?.result))
    console.log((resultRGP?.result))
    console.log((resultRCI?.result))

    const statData = {
      user: userInfo.id,
      qn: idata.id,
      level: idata.level,
      type: idata.type,
      inner_type: idata.inner_type,
      time: idata.time,
      result: readingResult/6
    };
    dispatch(saveStatData(statData))
  };

  const handlePrevious = () => {
    if (index === 0) {
    } else {
      setIndex(--index);
    }
  };

  const handleNext = () => {
    setIndex(++index);
    let correct = 0;
    listRCS.qa.a.map((val, i) => (userInput[i] === val ? ++correct : ""));
    const ansLength = listRCS.qa.a.length;
    const statData = {
      result: ((correct / ansLength) * 100).toFixed(2),
    };
    dispatch(SaveRCSResult(statData));
  };
  const closeModalWindow = () => {
    setbootCounter(false)
    setDeadline(null);
    dispatch(cleanUserReadingInput())
    dispatch(cleanUserReadingResult())
    handleCloseModal();

  };
  return (
    <div>
      {busy ? (
        <Skeleton></Skeleton>
      ) : (
        <div className="h-auto w-full flex justify-between flex-col bg-transparent">
         <div
              onClick={closeModalWindow}
              className="absolute right-0 mr-3 md:mt-[-1rem] cursor-pointer py-2 px-1"
            >
             <span><IconCross height='1rem' width='1rem'></IconCross></span>
            </div>
          <div
            className="ml-1 font-[500] text-[22px] bg-[#DDE9F8] w-min px-2 py-2 rounded-md
          sm:fixed z-50 fixed right-0 top-20"
          >
            <Countdown
              onChange={(e) => (e <= 60000 ? setTimeDanger(true) : "")}
              valueStyle={timeDanger ? { color: "red" } : { color: "blue" }}
              onFinish={openNotification}
              value={deadline}
              format="mm:ss"
            />
          </div>
          <div className="flex justify-between m-auto mt-10 absolute">
            <div className="self-start ">
              <div className="flex justify-start gap-4  font-[400] sm:ml-3 md:ml-0">
                <p className="bg-[#EFECEC] px-2 py-2 rounded-md">
                  {idata.level === 1
                    ? "Easy"
                    : idata.level === 2
                    ? "Medium "
                    : "Hard"}
                </p>
                <p className="bg-[#EFECEC] px-2 py-2 rounded-md">
                  Practice: {idata.practice}
                </p>
                <p className="bg-[#EFECEC] px-2 py-2 rounded-md">
                  Total Attempt: {idata.total_tested}
                </p>
              </div>
            </div>
            <div
              className="cursor-pointer px-2 py-2"
              onClick={() =>
                handleBookmark(idata.id, idata.type, idata.inner_type)
              }
            >
              {bColor ? (
                <StarFilled
                  style={{ fontSize: "20px", color: "#08c" }}
                ></StarFilled>
              ) : (
                <StarOutlined
                  style={{ fontSize: "20px", color: "#08c" }}
                ></StarOutlined>
              )}
            </div>
          </div>

          <div className="">{list[index]}</div>

          <div className=" w-full flex sm:mt-5 md:mt-2">
            <div className="flex md:justify-end sm:justify-start sm:ml-2 md:ml-0   w-full">
              <h1 className="border-[2px] h-min  text-[20px] font-[600] border-[#3AB7BF] px-1 py-1 rounded-md">
                {data[0].index}
              </h1>
            </div>
            <div className="flex md:gap-10 sm:gap-2 md:justify-end sm:justify-center w-full">
              <div className="mt-2 font-poppins md:text-[18px] sm:text-[14px] font-[500] sm:mr-[5rem] md:mr-0">{`Question ${
                1 + index
              } of 6`}</div>
              <div className="">
                {showPreviousBtn ? (
                  <button
                    className="px-2 py-2 bg-home rounded-md font-[500]"
                    onClick={handlePrevious}
                  >
                    previous
                  </button>
                ) : (
                  ""
                )}
              </div>
              <div>
                {showEvaluateBtn ? (
                  <button
                    className="px-2 py-2 bg-home rounded-md font-[500]"
                    onClick={handleEvaluate}
                  >
                    Evaluate
                  </button>
                ) : (
                  ""
                )}
              </div>
              <div>
                {showNextbtn ? (
                  <button
                    className="px-2 py-2 bg-home rounded-md font-[500]"
                    onClick={handleNext}
                  >
                    Next
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
