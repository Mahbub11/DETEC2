import React, { useEffect, useRef, useState } from "react";
import { Input, Skeleton } from "antd";
import { Tag, Button, notification, Collapse, Grid } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import IconDummy2 from "../../Assets/pictures/awsome.JPG";
import { Statistic } from "antd";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getWordDetails } from "../../redux/slices/disctionary";
import {
  DisableVisibility,
  ToggleVisibility,
} from "../../redux/slices/fillgap";
import { showAssesmentModal } from "../../redux/slices/getAssesment";
import IconsArrowLeft from "../../Assets/SVG/IconsArrowLeft";
import IconsArrowRight from "../../Assets/SVG/IconsArrowRight";
import { clearStatDataError, saveStatData } from "../../redux/slices/statistic";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { toggleBookmark } from "../../redux/slices/bookmark";
import IconCross from "../../Assets/SVG/IconCross";
import AssmentContainer from "../../Components/Assesment/AssmentContainer";
import { ShowNotification } from "../../redux/actions";
import { clearAssesmentResult, getAssesmentResult } from "../../redux/slices/assesmentResult";

const { TextArea } = Input;
const { Countdown } = Statistic;
const { useBreakpoint } = Grid;

export default function PracticePageWS({ id, handleCloseModal }) {
  const dispatch = useDispatch();
  let [index, setIndex] = useState(id);
  const [api, contextHolder] = notification.useNotification();
  const [play, setPlay] = useState(true);
  const [timeDanger, setTimeDanger] = useState(false);
  const [busy, isBusy] = useState(true);
  const { rid } = useParams();
  const { state } = useLocation();
  let [data, setData] = useState({});
  const [bColor, setBcolor] = useState(true);
  const [deadline, setDeadline] = useState(0);
  const [xmTime, setxmTime] = useState(null);
  const [thinkTime, setThinkTime] = useState(Date.now() + 0.333333 * 60000);
  const [startExam, setStartExam] = useState(false);
  const [showThinkTime, setShowThinkTime] = useState(true);
  const [userAns, setUserAns] = useState();
  const [wordLength, setWordLength] = useState(0);
  const [inputAvailable, setInputAvailable] = useState(true);
  const [thinkTimeholders, setthinkTimeholders] = useState(true)
  const [isStartExam, setIsStartExam] =useState(false);
  const [bootCounter,setbootCounter]= useState(true);
  const [enableEvaluationBtn, setenableEvaluationBtn] = useState(true);
  const [showEvaluate, setShowEvaluate] = useState(false);
  let [openPanels, setOpenPanels] = useState([]);
  const [finalUserAns, setFinalUserAns] = useState();
  const modalRef = useRef();

  const { error } = useSelector((state) => state.statistic);
  const { listWS } = useSelector((state) => state.getWritingList);
  const { visibility } = useSelector((state) => state.fillgap);
  let dataLength = listWS.length;



  useEffect(() => {
    notification.destroy();
    if(!bootCounter){
      setbootCounter(true);
         setThinkTime(undefined);
    }
  }, [bootCounter]);

  useEffect(() => {
    setIndex(id);
  }, [id]);

  useEffect(() => {
    if (id) {
      const data = listWS.filter((val) => index === val.index);
      setData(data[0]);
      setBcolor(data[0].bookmark);
      setDeadline(data[0]?.time * 60000);
      setShowThinkTime(true);
    } else {
      const data = listWS.filter((val) => parseInt(rid) === val.id);
      setDeadline(data[0]?.time * 60000);
      setData(data[0]);
      setBcolor(data[0].bookmark);
      setShowThinkTime(true);
    }

    isBusy(false);

    dispatch(DisableVisibility());
  }, [data, index, busy]);


  useEffect(() => {
    if (data) {
      setThinkTime(Date.now() + 0.333333 * 60000);
    }
  }, [data]);
  const handleNext = () => {
    if (index <= --dataLength) {
      setIndex(++index);
      handleRetry();
      clearTimeout();
      setInputAvailable(true)
      setenableEvaluationBtn(true)
      setStartExam(false);
    }
  };
  const handlePrev = () => {
    if (index > 1) {
      setIndex(--index);
      handleRetry();
      setInputAvailable(true)
      setenableEvaluationBtn(true)
      setStartExam(false);
    }
  };
  const handleEvaluate = () => {
 
    if (userAns.length > 50) {
      setOpenPanels(["1"]);
      setInputAvailable(false);
      setShowEvaluate(true);
      dispatch(clearAssesmentResult());
      setFinalUserAns(userAns.replace(/\s*([,.!?:;]+)(?!\s*$)\s*/g, "$1 "))
      dispatch(
        getAssesmentResult(userAns.replace(/\s*([,.!?:;]+)(?!\s*$)\s*/g, "$1 "))
      );

      modalRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });

      setTimeout(() => {
        modalRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
      }, 1000);
    } else {
      dispatch(
        ShowNotification({
          severity: "info",
          message: "Please write more Information",
        })
      );
    }
  };

  const openNotification = (placement) => {
    setInputAvailable(true);
    notification.open({
      message: `Times Up`,
      placement: "top",
      type: "warning",
      style: {
        border: "2px solid red",
      },
    });
  };

  const handleMeaning = (val) => {
    dispatch(getWordDetails(val.target.textContent));
  };
  const handleRetry = () => {
    setShowThinkTime(true)
    dispatch(clearAssesmentResult())
    setThinkTime(Date.now() + 0.333333 * 60000);
    setenableEvaluationBtn(true)
    setthinkTimeholders(true)
    setStartExam(false);
    setxmTime(undefined);
    setUserAns("");
    setInputAvailable(true);
  
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

  const closeModalWindow = () => {
    setbootCounter(false);
    setShowThinkTime(true);
    dispatch(clearAssesmentResult());
    setShowEvaluate(false);
    setthinkTimeholders(true);
    setUserAns("");
    setInputAvailable(true);
    setxmTime(undefined);
    setStartExam(false);
    setThinkTime(undefined);
    setenableEvaluationBtn(true);

    handleCloseModal();
    
  };

  const handleUserAns = (val) => {
    setUserAns(val);
    setWordLength(val.split(" ").length);
  };

  
  const startWriting=()=>{
    setIsStartExam(true)
    setStartExam(false)
    setthinkTimeholders(false)
    setxmTime(Date.now() + deadline);
    setInputAvailable(false)
  }

  const handleXmTime = (e) => {
 
    if( e <= 60000){
      setTimeDanger(true)
    }
    if( e <= 300000){
      setenableEvaluationBtn(false)
    }
  }

  return (
    <div ref={modalRef}>
      {busy ? (
        <div>
          {" "}
          <Skeleton active></Skeleton>
        </div>
      ) : (
        <div className="h-auto w-[99%] m-auto bg-[#fffffff7] md:px-5 md:py-5">
          <div
            onClick={closeModalWindow}
            className="absolute right-0 mr-3 md:mt-[-1rem] cursor-pointer"
          >
            <span>
              <IconCross height="1rem" width="1rem"></IconCross>
            </span>
          </div>
          <div className="flex flex-col gap-5 sm:px-2">
            <h1 className="text-[22px] font-montserrat font-[500] underline self-center">
             Writing Sample
            </h1>
            <div className="flex justify-between m-auto w-full">
              <div className="self-start ">
                <div className="flex justify-start gap-4  font-[400] sm:ml-3 md:ml-0">
                  <p className="bg-[#EFECEC] px-2 py-2 rounded-md">
                    {data.level === 1
                      ? "Easy"
                      : data.level === 2
                      ? "Medium "
                      : "Hard"}
                  </p>
                  <p className="bg-[#EFECEC] px-2 py-2 rounded-md">
                    Practice: {data.practice}
                  </p>
                  <p className="bg-[#EFECEC] px-2 py-2 rounded-md">
                    Total Attempt: {data.total_tested}
                  </p>
                </div>
              </div>
              <div
                className="cursor-pointer"
                onClick={() =>
                  handleBookmark(data.id, data.type, data.inner_type)
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

            <div
              className="ml-1 font-[500] text-[22px] bg-[#DDE9F8] w-min px-2 py-2
           rounded-md fixed right-0 top-20"
            >
              <Countdown
               onChange={handleXmTime}
                valueStyle={timeDanger ? { color: "red" } : { color: "blue" }}
                onFinish={ openNotification}
                value={xmTime}
                format="mm:ss"
              />
            </div>

            <h1 className="sm:text-[17px] md:text-[22px] md:block self-center font-poppins">
            Write about the topic bellow for 5 minutes
            </h1>

            <div className="w-[95%] m-auto sm:mt-5 ">
              <div className="flex md:flex-row sm:flex-col justify-between h-full md:gap-10 sm:gap-4">
                <div className=" md:w-[40%] sm:w-[95%] sm:m-auto h-full flex flex-col justify-between">
                  <h1
                    className="text-justify md:text-[18px] sm:text-[15px]
                  font-poppins font-[500] "
                  >
                    {data.qa.q}
                  </h1>
                  <div className={`${thinkTimeholders ? 'flex': 'hidden'}  gap-2`}>
                    <div
                      className={`${showThinkTime ? "block" : "hidden"} mt-5`}
                    >
                      <Countdown
                        onFinish={!isStartExam ? startWriting :null}
                        onChange={(e) => (e <= 10000 ? setStartExam(true) : "")}
                        valueStyle={
                          timeDanger ? { color: "red" } : { color: "blue" }
                        }
                        value={thinkTime}
                        format="mm:ss"
                      />
                    </div>

                    <button
                      disabled={!startExam ? true : false}
                      onClick={startWriting}
                      className={`${
                        startExam ? "opacity-100" : "opacity-50"
                      } bg-[#3AB7BF] px-2 py-2 self-end rounded-md text-white font-[500]`}
                    >Start Writing</button>
                  </div>
                </div>
                <div className="md:w-[60%] sm:w-full sm:m-auto sm:mt-5">
                  <TextArea
                    spellCheck={false}
                    disabled={ inputAvailable ? true : false}
                    className="w-full disabled bg-transparent text-[18px] font-montserrat"
                    rows={10}
                    value={userAns}
                    onChange={(e) => handleUserAns(e.target.value)}
                    placeholder="Start Your Typing...."
                    maxLength={2000}
                  />
                   <div className="self-end flex justify-end px-1 py-2 font-[600]">
                    <h1>Word Count: {wordLength}</h1>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-5 justify-center mt-10 font-poppins font-[500] sm:text-[12px] md:text-[15px]">
              <button
             
                onClick={handleRetry}
                className="bg-[#DDE9F8]  px-6 py-3 rounded-md drop-shadow-sm"
              >
                Retray
              </button>
              <button
              // disabled={enableEvaluationBtn ? true : false}
                onClick={handleEvaluate}
                className={`${enableEvaluationBtn ? 'opacity-50' :'opacity-100'} bg-[#DDE9F8]  px-6 py-3 rounded-md  drop-shadow-sm`}
              >
                Evaluate
              </button>
            </div>

            <div className="mr-3">
              <div className="flex gap-2 justify-center m-auto w-min">
                <span
                  onClick={handlePrev}
                  className="m-auto w-min cursor-pointer"
                >
                  {" "}
                  <IconsArrowLeft width="1rem" height="1rem"></IconsArrowLeft>
                </span>
                <h1 className="border-[2px] text-[20px] font-[600] border-[#3AB7BF] px-2 py-2 rounded-md">
                  {index}
                </h1>
                <span
                  onClick={handleNext}
                  className="m-auto w-min cursor-pointer"
                >
                  {" "}
                  <IconsArrowRight width="1rem" height="1rem"></IconsArrowRight>
                </span>
              </div>
            </div>

            <div className="mt-5  flex justify-center">
              <div
                className={`${
                  showEvaluate ? "block" : "hidden"
                } "h-auto w-[95%] m-auto"`}
               >
                <Collapse
                  activeKey={openPanels}
                  onChange={setOpenPanels}
                  accordion
                  items={[
                    {
                      key: "1",
                      label: "Evaluation Result",
                      children: (
                        <div className="flex flex-col gap-2 justify-between">
                          <div className="md:w-full sm:w-full m-auto md:flex md:flex-row sm:flex-col justify-center ">
                            <AssmentContainer
                              finalUserAns={finalUserAns}
                              sampleAns={data?.qa?.a}
                            ></AssmentContainer>
                          </div>
                          <div>
                            <div className="h-auto w-[92%] m-auto">
                              <Collapse
                                accordion
                                items={[
                                  {
                                    key: "1",
                                    label: "Sample Answer",
                                    children: (
                                      <p className="flex gap-2 flex-wrap">
                                        {data?.qa.a.split(" ").map((val) => (
                                          <p
                                            className="cursor-pointer md:hover:text-tahiti"
                                            onClick={handleMeaning}
                                          >
                                            {val}
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
