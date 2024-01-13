import React, { useEffect, useState } from "react";
import { Input } from "antd";
import {
  Tag,
  Button,
  notification,
  Typography,
  Collapse,
  Skeleton,
} from "antd";
import { Statistic } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "../../Components/Reading/RadioBtn.css";
import { useParams } from "react-router-dom";
import IconsArrowLeft from "../../Assets/SVG/IconsArrowLeft";
import IconsArrowRight from "../../Assets/SVG/IconsArrowRight";
import IconMikeOn from "../../Assets/SVG/IconMikeOn";
import IconMikeOff from "../../Assets/SVG/IconMikeOff";
import { clearStatDataError, saveStatData } from "../../redux/slices/statistic";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { toggleBookmark } from "../../redux/slices/bookmark";
import IconCross from "../../Assets/SVG/IconCross";

const { TextArea } = Input;
const { Countdown } = Statistic;

export default function PracticePageLLT({id,handleCloseModal}) {
   const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();
  const [matching, setMatching] = useState();
  const [timeDanger, setTimeDanger] = useState(false);
  const [busy, isBusy] = useState(true);
  const [bColor, setBcolor] = useState(true);
  let [index, setIndex] = useState((id));
  const { rid } = useParams();
  const { error } = useSelector((state) => state.statistic);
  const { listLLT } = useSelector((state) => state.getListeningList);
  let [data, setData] = useState({});
  const [deadline, setDeadline] = useState(0);
  let [playLeft, setPlayLeft] = useState(3);
  let dataLength = listLLT.length;
  const [isWorking, setIsWorking] = useState(false);
  let [micVoice, setMicVoice] = useState(2);
  const [timeOut, setTimeOut] = useState(100);
  const [wordLength, setWordLength] = useState(0);

  // speech

  const [text, setText] = useState();
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState(null);
  const [voice, setVoice] = useState(null);
  const [voiceActive, setvoiceActive] = useState(false);
  const [inputAvailable, setInputAvailable] = useState(true)
  const [userAns, setUserAns] = useState();
  const synth = window.speechSynthesis;

   useEffect(() => {
    setIndex(id);
  }, [id]);

  useEffect(() => {
    if(id){
      const data = listLLT.filter((val) => index === val.index);
      setData(data[0]);
      setBcolor(data[0].bookmark);
      setDeadline(Date.now() + data[0]?.time * 60000);
      setText(data[0].qa.q+ data[0].qa.qb.join(","));
      
    }else{
      const data = listLLT.filter((val) => parseInt(rid) === val.id);
      setDeadline(Date.now() + data[0]?.time * 60000);
      setData(data[0]);
      setBcolor(data[0].bookmark);
      setText(data[0].qa.q + "In Your Writing" + data[0].qa.qb.join(","));
    }
   
    isBusy(false);


  }, [data, index, busy]);

  useEffect(() => {
    const u = new SpeechSynthesisUtterance(text);
    const voices = synth.getVoices();

    let data = [];
    voices
      .filter((voice) => voice.lang.includes("en")) // showing only english voices
      .map((voice) => data.push(voice)); //all of the voices
    var totalResponses = data.length;
    var responseIndex = Math.floor(Math.random() * 10 + 1) % totalResponses;

    setUtterance(u);
    setVoice(data[responseIndex]);

    return () => {
      synth.cancel();
    };
  }, [text]);

  const handlePlay = () => {
    if (isPaused) {
      synth.resume();
    } else {
      setvoiceActive(true);
      utterance.voice = voice;
      utterance.pitch = 1;
      utterance.rate = 0.9;
      utterance.volume = 1;
      synth.speak(utterance);
      utterance.onend = (event) => {
        setPlayLeft(--playLeft);
        setvoiceActive(false);
      };
    }

    setIsPaused(false);
  };

  const handleNext = () => {
    if (index <= --dataLength) {
      setIndex(++index);
      handleRetry();
      setPlayLeft(3);
      clearTimeout();
    }
  };
  const handlePrev = () => {
    if (index > 1) {
      setIndex(--index);
      handleRetry();
      setPlayLeft(3);
    }
  };

  const openNotification = () => {
    setInputAvailable(false)
  
    notification.open({
      message: `Times Up`,
      placement: "top",
      type: "warning",
      style: {
        border: "2px solid red",
      },
    });
  };


  const handleEvaluate = () => {
    // clearTimeout(myTimeout);
    setIsWorking(false);
 
  };

  const handleRetry = () => {
    // clearTimeout(myTimeout);
    setIsWorking(false);
    setUserAns('')
    setInputAvailable(true)

    setDeadline(Date.now() + data.time * 60000);
    setPlayLeft(3);
    setMicVoice(2);
  };

  console.log(data);

  const handleMeaning = (val) => {
    // dispatch(getWordDetails(val.target.textContent));
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
    setUserAns('')
    setInputAvailable(false)
    setDeadline(null);
    handleCloseModal();

  };
  const handleUserAns = (val) => {
    setUserAns(val);
    setWordLength(val.split(" ").length);
  };

  return (
    <div>
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
             <span><IconCross height='1rem' width='1rem'></IconCross></span>
            </div>
          <div className="flex flex-col gap-5">
            <h1 className="text-[22px] font-montserrat font-[500] underline self-center">
              Listen and Type
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
            <div className="ml-1 font-[500] text-[22px] bg-[#DDE9F8] w-min px-2 py-2 rounded-md  fixed sm:right-0 top-20">
              <Countdown
                onChange={(e) => (e <= 60000 ? setTimeDanger(true) : "")}
                valueStyle={timeDanger ? { color: "red" } : { color: "blue" }}
                onFinish={() => openNotification("top")}
                value={deadline}
                format="mm:ss"
              />
            </div>

            <h1 className="sm:text-[17px] md:text-[22px] md:block self-center font-poppins">
              Type the statement that you hear
            </h1>

            <div
              className="w-[90%] sm:flex sm:justify-center m-auto
             rounded-md md:flex md:justify-end md:mt-10 "
            >
              <div className="sm:flex-col md:flex md:flex-row justify-end 
              md:w-[90%] sm:w-full items-end md:gap-5 sm:gap-2 h-auto">
                <div className="w-[30%] md:h-full sm:h-auto sm:m-auto ">
                  <div className="px-2 py-2 flex justify-center m-auto h-full ">
                    <div className="px-2 py-2 flex flex-col justify-center m-auto">
                      <button
                        disabled={playLeft > 0 ? false : true}
                        onClick={handlePlay}
                        className="m-auto bg-[#C0DBFC] rounded-full px-5 py-5 cursor-pointer w-[7.5rem] h-[7.5rem]"
                      >
                        {voiceActive ? (
                          <div>
                            <IconMikeOn height="5rem" width="5rem"></IconMikeOn>
                          </div>
                        ) : (
                          <div className="mr-1">
                            <IconMikeOff
                              height="5rem"
                              width="5rem"
                            ></IconMikeOff>
                          </div>
                        )}
                      </button>
                      <p className="text-[17px] font-thin text-center mt-4">
                        Number of replays left: {playLeft}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="md:w-[70%] md:h-auto sm:h-auto flex justify-center sm:w-full sm:m-auto sm:flex">
                  <div className="px-2 py-2 flex flex-col justify-center m-auto w-full">
                    <TextArea
                    spellCheck={false}
                      onChange={(e) => handleUserAns(e.target.value)}
                    disabled={inputAvailable ? false :true}
                    value={userAns}
                      className="font-poppins text-[20px]"
                      rows={8}
                    ></TextArea>
                    <div className="self-end flex justify-end px-1 py-2 font-[600]">
                    <h1>Word Count: {wordLength}</h1>
                  </div>
                    
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

            <div>
              <div className="h-auto w-[95%] m-auto">
                <Collapse
                  accordion
                  items={[
                    {
                      key: "1",
                      label: "Model Answer",
                      children: (
                        <p className="flex gap-3 flex-wrap">
                          {data.qa.a.split(" ").map((val) => (
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
