import React, { useEffect, useState } from "react";
import { Input, Skeleton } from "antd";
import {notification} from "antd";

import { Statistic } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "../../Components/Reading/RadioBtn.css";
import { getWordDetails } from "../../redux/slices/disctionary";
import { useParams } from "react-router-dom";
import ConverSationContainer from "../../Components/Listening/ConverSationContainer";
import {
  EndEvaluateOption,
  startEvaluateOption,
} from "../../redux/slices/converSationHandler";
import IconConversationBot from "../../Assets/SVG/IconConversationBot";
import IconsArrowLeft from "../../Assets/SVG/IconsArrowLeft";
import IconsArrowRight from "../../Assets/SVG/IconsArrowRight";
import SingleConversation from "../../Components/Listening/SingleConversation";
import { clearStatDataError, saveStatData } from "../../redux/slices/statistic";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { toggleBookmark } from "../../redux/slices/bookmark";
import IconCross from "../../Assets/SVG/IconCross";

const { TextArea } = Input;
const { Countdown } = Statistic;


export default function PracticePageLLR({ id, handleCloseModal }) {
   const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();
  const [timeDanger, setTimeDanger] = useState(false);
  const [busy, isBusy] = useState(true);
  let [index, setIndex] = useState((id));
  const { rid } = useParams();
  const { listLLR } = useSelector((state) => state.getListeningList);
  let [data, setData] = useState({});
  const [deadline, setDeadline] = useState(0);
  const [xmTime, setxmTime] = useState(null);
  const [xmState, setxmState] = useState(false);
  let [isStart, setIsStart] = useState(false);
  const [bColor, setBcolor] = useState(true);
  let dataLength = listLLR.length;
  const [questionList, setQuestionList] = useState([]);
  const synth = window.speechSynthesis;
  const voices = synth.getVoices();
  const [voiceActor, setVoiceActor] = useState();
  let [qCounter, setQcounter] = useState(0);
  const { error } = useSelector((state) => state.statistic);
  const { evaluateResult } = useSelector((state) => state.converSationHandler);
  const [voiceList, setVoiceList] = useState([]);
  const [showSummaryInput,setShowSummaryInput]= useState(false)
  const [showConversationContainer,setShowConversationContainer]= useState(false)
  // speech

  useEffect(() => {
    setIndex(id);
    setxmState(false)
  }, [id]);
  useEffect(() => {
    openNotification("error", "Error !", error);
    dispatch(clearStatDataError());
  }, [error]);

  useEffect(() => {
    if(id){
      const data = listLLR.filter((val) => index === val.index);
      setData(data[0]);
      setBcolor(data[0].bookmark);
      setDeadline(Date.now() + 4 * 60000 );
      // setDeadline(Date.now() + data[0]?.time * 60000 - 90000);
      let pushData = [];
      data[0].qa.convsersationList.map((val, i) => {
        pushData.push(val[i]);
      });
  
      setQuestionList(pushData);
    }else{
      const data = listLLR.filter((val) => parseInt(rid) === val.id);
      setDeadline(Date.now() + data[0]?.time * 60000 - 90000);
      setData(data[0]);
      setBcolor(data[0].bookmark);
      let pushData = [];
      data[0].qa.convsersationList.map((val, i) => {
        pushData.push(val[i]);
      });
  
      setQuestionList(pushData);
    }

  

    isBusy(false);
    // setDeadline(Date.now() + data[0].time * 60000);
  }, [data, index, busy]);

  console.log(data)

  const handleNext = () => {
    if (index <= --dataLength) {
      setIndex(++index);
      handleRetry();
     
      clearTimeout();
    }
  };
  const handlePrev = () => {
    if (index > 1) {
      setIndex(--index);
      handleRetry();
   
    }
  };

  const openNotification = () => {

    if(xmState===1){
      setxmState(2);
    }

    if(xmState===2){
      notification.open({
      message: `Times Up`,
      placement: "top",
      type: "warning",
      style: {
        border: "2px solid red",
      },
    });
    }


    
  };

  const handleEvaluate = () => {};

  const handleRetry = () => {

    setQcounter(0);
    setIsStart(false)
    setShowSummaryInput(false)
    dispatch(EndEvaluateOption());
    setxmState(false)

    setDeadline(Date.now() + 4 * 60000 );
    // setDeadline((Date.now() + data.time * 60000));
    window.scrollTo(0, 0);
  };

  const handleMeaning = (val) => {
    dispatch(getWordDetails(val.target.textContent));
  };

  const handleNextQuestion = () => {
    setQcounter(++qCounter);
        if(qCounter === questionList.length){
      setShowConversationContainer(false)
      setShowSummaryInput(true)
      setxmState(true)
    }else{
      dispatch(
      startEvaluateOption({
        data: questionList[qCounter],
        currentIndex: qCounter,
        voiceIndex: voiceActor,
      })
    );
    }
   
  };

  const handleStartQuestion = () => {

    setxmTime(Date.now() + .5 * 60000);
    let data = [];
    voices
      .filter((voice) => voice.lang.includes("en")) // showing only english voices
      .map((voice) => data.push(voice)); //all of the voices
    var totalResponses = data.length;
    var responseIndex = Math.floor(Math.random() * 10 + 1) % totalResponses;
    setVoiceActor(responseIndex);
    setVoiceList(data);

 
    dispatch(
      startEvaluateOption({
        data: questionList[qCounter],
        currentIndex: qCounter,
        voiceIndex: voiceActor,
      })
    );
    setIsStart(true)
    setShowConversationContainer(true)
    
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
    setxmTime(undefined);
    setxmState(false)
    handleCloseModal();
  };

  

  return (
    <div>
      {busy ? (
        <Skeleton></Skeleton>
      ) : (
        <div className="h-auto w-[99%] m-auto bg-[#fffffff7]md:px-5 md:py-5">
         <div
              onClick={closeModalWindow}
              className="absolute right-0 mr-3 md:mt-[-1rem] cursor-pointer"
            >
             <span><IconCross height='1rem' width='1rem'></IconCross></span>
            </div>
          <div className="flex flex-col gap-5">
            <h1 className="text-[22px] font-montserrat font-[500] underline self-center">
              Interactive Listening
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

            <div className="ml-1 font-[500] text-[22px] bg-[#DDE9F8] w-min px-2 py-2 rounded-md
            fixed right-0 top-20">
              <Countdown
                onChange={(e) => (e <= 60000 ? setTimeDanger(true) : "")}
                valueStyle={timeDanger ? { color: "red" } : { color: "blue" }}
                onFinish={ openNotification}
                value={xmTime}
                format="mm:ss"
              />
            </div>

            <h1 className="sm:text-[17px] md:text-[22px] md:block sm:text-center md:text-start self-center font-montserrat underline mt-[2rem]">
              You will participate in a conversation about the scenario below
            </h1>

            <div className={`w-[95%] m-auto  rounded-md`}>
              <div className={`${showSummaryInput ?' blur-sm':''} h-auto w-full flex justify-between px-1 py-2 gap-5`}>
                <div className="w-[30%] m-auto rounded-md py-2 opacity-80 sm:hidden md:block">
                  <IconConversationBot
                    height="20rem"
                    width="20rem"
                  ></IconConversationBot>
                </div>

                <div className="md:w-[70%] sm:w-full sm:m-auto h-full  mt-5">
                  <div className="m-auto flex flex-col gap-5">
                    <div className="md:w-[80%] sm:w-full md:text-[20px] sm:text-[17px]">
                      <p className="font-poppins font-[400]">
                        {data.title}
                      </p>
                    </div>

                    <button
                      onClick={(e) => handleStartQuestion()}
                      className={`${isStart ? 'hidden':'block'} px-2 py-1 bg-tahiti w-[20%] 
                      font-montserrat rounded-md m-auto text-white`}
                    >
                      Start
                    </button>
                  </div>

                  <div className="md:mt-10 sm:mt-5">
                    <div className="">
                      <div>
                       
                        {evaluateResult?.map((val,i) => {
                          return (
                            <SingleConversation key={i} data={val}></SingleConversation>
                          );
                        })}
                      </div>

                      <div className={`${showConversationContainer ? 'block':'hidden'} mt-5 `}>
                       
                        <ConverSationContainer
                        currentQuestion={1+qCounter}
                        totalQ={questionList.length}
                          handleNextQuestion={handleNextQuestion}
                        ></ConverSationContainer>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>

              <div className={`${showSummaryInput ? 'block': 'hidden'} w-[90%] 
              m-auto px-2 py-2 flex flex-col justify-center gap-3 mt-10`}>

                <h1 className="text-center font-poppins text-[20px] font-[600]">Summarize the Conversation you just had in 75 seconds.</h1>

                <TextArea placeholder="Your response" rows={5} spellcheck="false" className="text-[18px] font-poppins">

                </TextArea>
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
                onClick={handleEvaluate}
                className="bg-[#DDE9F8]  px-6 py-3 rounded-md  drop-shadow-sm"
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
          </div>
        </div>
      )}
    </div>
  );
}
