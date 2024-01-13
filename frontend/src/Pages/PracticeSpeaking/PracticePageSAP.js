import React, { useEffect, useRef, useState } from "react";
import { Tag, Button, notification, Progress, Collapse } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import { Statistic, Skeleton } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "../../Components/Reading/RadioBtn.css";
import { IconMicrophone } from "../../Assets/SVG/IconMicrophone";
import { IconMicOffCircle } from "../../Assets/SVG/IconMicOff";
import { ReactMic } from "react-mic";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useParams } from "react-router-dom";
import {
  destroyNotificationState,
  setNotification,
} from "../../redux/slices/general";
import { getWordDetails } from "../../redux/slices/disctionary";
import IconsArrowLeft from "../../Assets/SVG/IconsArrowLeft";
import IconsArrowRight from "../../Assets/SVG/IconsArrowRight";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { toggleBookmark } from "../../redux/slices/bookmark";
import IconCross from "../../Assets/SVG/IconCross";
import AssmentContainer from "../../Components/Assesment/AssmentContainer";
import {
  clearAssesmentResult,
  getAssesmentResult,
} from "../../redux/slices/assesmentResult";
import { ShowNotification } from "../../redux/actions";
const { fuzzy } = require("fast-fuzzy");
const { Countdown } = Statistic;

export default function PracticePageSAL({ id, handleCloseModal }) {
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();
  let [record, setRecord] = useState(false);
  const [audioData, setAudioData] = useState();
  const [active, setActive] = useState(false);
  const [matching, setMatching] = useState();
  const [timeDanger, setTimeDanger] = useState(false);
  const [busy, isBusy] = useState(true);
  let [index, setIndex] = useState(id);
  const { rid } = useParams();
  const { listSAP } = useSelector((state) => state.getSpeakingList);
  const { error } = useSelector((state) => state.statistic);
  let [data, setData] = useState({});
  let [openPanels, setOpenPanels] = useState([]);
  const modalRef = useRef();

  const [deadline, setDeadline] = useState(0);
  const [xmTime, setxmTime] = useState(null);
  const [thinkTime, setThinkTime] = useState(Date.now() + 0.133333 * 60000);
  const [startExam, setStartExam] = useState(false);
  const [showThinkTime, setShowThinkTime] = useState(true);
  const [enableEvaluationBtn, setenableEvaluationBtn] = useState(true);

  let dataLength = listSAP.length;
  const [messages, setMessages] = useState([]);
  const [isWorking, setIsWorking] = useState(false);
  const [finalOutputSen, setFinalOutputSen] = useState([]);
  let [micVoice, setMicVoice] = useState(2);
  const [timeOut, setTimeOut] = useState(100);
  const [showEvaluate, setShowEvaluate] = useState(false);
  const [bColor, setBcolor] = useState(true);
  const [bootCounter, setbootCounter] = useState(true);
  const [loadingImage, setLoadingImg] = useState(true);

  const [voiceActive, setvoiceActive] = useState(false);
  const synth = window.speechSynthesis;

  const {
    transcript,
    listening,
    finalTranscript,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    notification.destroy();
    if (!bootCounter) {
      setbootCounter(true);
      setThinkTime(undefined);
    }
  }, [bootCounter]);

  // useEffect(() => {
  //   setMicStatus(true);
  // }, [micStatus]);

  useEffect(() => {
    setIndex(id);
  }, [id]);

  useEffect(() => {
    if (id) {
      const data = listSAP.filter((val) => index === val.index);
      setData(data[0]);
      setBcolor(data[0].bookmark);
      setDeadline(data[0]?.time * 60000);
      setShowThinkTime(true);
    } else {
      const data = listSAP.filter((val) => parseInt(rid) === val.id);
      setDeadline(data[0]?.time * 60000);
      setData(data[0]);
      setBcolor(data[0].bookmark);
      setShowThinkTime(true);
    }
    isBusy(false);
  }, [data, index, busy]);

  useEffect(() => {
    if (data && !loadingImage) {
      setThinkTime(Date.now() + 0.333333 * 60000);
    }
  }, [data, loadingImage]);

  let pushD = [];
  useEffect(() => {
    pushD.push(finalTranscript);
    setMessages([...messages, finalTranscript]);
  }, [finalTranscript]);

  const myTimeout = setTimeout(() => {
    if (isWorking) {
      console.log("is working true");
      SpeechRecognition.startListening();
    } else {
      console.log("is working false");
      SpeechRecognition.stopListening();
      clearTimeout(myTimeout);
    }
  }, timeOut);

  const handleNext = () => {
    if (index <= --dataLength) {
      setIndex(++index);
      handleRetry();
      clearTimeout();
      setenableEvaluationBtn(true);
      setStartExam(false);
    }
  };
  const handlePrev = () => {
    if (index > 1) {
      setIndex(--index);
      handleRetry();
      clearTimeout();
      setenableEvaluationBtn(true);
      setStartExam(false);
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  const startRecording = () => {
    setRecord(true);
  };

  const stopRecording = () => {
    setRecord(false);
  };

  const onStop = (recordedBlob) => {
    setAudioData(recordedBlob.blobURL);
  };
  const openNotification = (placement) => {
    setActive(false);
    stopRecording();
    setIsWorking(false);
    SpeechRecognition.stopListening();
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
    dispatch(clearAssesmentResult());
    setxmTime(undefined);
    setIsWorking(false);
    setActive(false);
    stopRecording();
    SpeechRecognition.stopListening();
    

    if (messages.join().replace(/,/g, ".").length > 10) {
      setOpenPanels(["1"]);
      setShowEvaluate(true);
      dispatch(clearAssesmentResult());
      dispatch(
        getAssesmentResult(
          messages.join().replace(/,/g, ".").replace(/\../g, ".")
        )
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
          message: "Speak more Information about the topic",
        })
      );
    }
  };

  const handleRetry = () => {
    dispatch(clearAssesmentResult());
    setShowThinkTime(true);
    setThinkTime(Date.now() + 0.333333 * 60000);
    setenableEvaluationBtn(true);
    setStartExam(false);
    setxmTime(undefined);
    setIsWorking(false);
    resetTranscript();
    setMessages([]);
    setActive(false);
    stopRecording();

    SpeechRecognition.stopListening();
    setShowEvaluate(false);
  };
  const handleSpeech = () => {
    if (bootCounter) {
      setxmTime(Date.now() + deadline);
      setShowThinkTime(false);
      // setMicVoice(--micVoice);
      //  setDeadline(data.time * 60000);
      setActive(true);
      startRecording();
      setIsWorking(true);
      setTimeOut(() => {
        setTimeOut(3000);
      }, 2000);
    } else {
      setActive(false);
      setIsWorking(false);
      stopRecording();
      SpeechRecognition.stopListening();
    }
    // if (micVoice > 0) {
    //   setDeadline(data.time * 60000);
    //   setActive(!active);
    //   startRecording();
    //   setIsWorking(true);
    //   setTimeOut(() => {
    //     setTimeOut(3000);
    //   }, 2000);
    // } else if (micVoice <= 0) {
    //   setActive(false);
    //   setIsWorking(false);
    //   stopRecording();
    //   SpeechRecognition.stopListening();
    //   return;
    // }

    console.log("d");
    if (!isWorking) {
      setIsWorking(true);

      // check()
    } else {
      setIsWorking(false);
    }

    !active
      ? SpeechRecognition.startListening({ continuous: false })
      : SpeechRecognition.stopListening();
    setMatching(fuzzy(data.qa.a.toLowerCase(), transcript));
  };

  const handleMeaning = (val) => {
    dispatch(getWordDetails(val.target.textContent));
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
    // setMicStatus(false);
    setIsWorking(false);
    SpeechRecognition.stopListening();
    resetTranscript();
    setMessages([]);
    setActive(false);
    stopRecording();
    clearTimeout();
    setxmTime(undefined);
    setStartExam(false);
    setenableEvaluationBtn(true);

    // setData([])
    handleCloseModal();
  };

  const handleXmTime = (e) => {
    if (e <= 60000) {
      setTimeDanger(true);
    }
    if (e <= 30000) {
      setenableEvaluationBtn(false);
    }
  };
 

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
              Speak about the Photo
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
              className="ml-1 font-[500] fixed sm:right-0 top-20 text-[22px] 
            bg-[#DDE9F8] w-min px-2 py-2 rounded-md"
            >
              <Countdown
                onChange={handleXmTime}
                valueStyle={timeDanger ? { color: "red" } : { color: "blue" }}
                onFinish={openNotification}
                value={xmTime}
                format="mm:ss"
              />
            </div>

            <h1 className="sm:text-[17px] md:text-[22px] md:block self-center font-poppins">
              Speak about the image below for 90 seconds.
            </h1>

            <div className="w-[95%] m-auto">
              <div className=" border-[2px] rounded-md">
                <div className="h-[22rem] w-full m-auto">
                  <div className="flex-col justify-center mt-5 items-end h-full w-full">
                    <div
                      className={`${
                        loadingImage ? "hidden" : "block"
                      } md:h-[16rem] md:w-[22rem] sm:h-[15rem] sm:w-[95%] m-auto`}
                    >
                      <img
                        onLoad={() => setLoadingImg(false)}
                        className="h-full w-full rounded-md object-fill"
                        src={`https://practicemania.s3.ap-south-1.amazonaws.com/duolingo/${data.image}`}
                        alt="icondummy1"
                      ></img>
                    </div>

                    <div className="flex justify-center w-full mt-5">
                      <div className="flex justify-end gap-3 md:w-[50%] sm:m-auto sm:w-[90%]">
                        <ReactMic
                          className="rounded-md w-[40%]"
                          record={record}
                          visualSetting="frequencyBars"
                          onStop={onStop}
                          strokeColor="#53b0e5"
                          backgroundColor="#FFFF"
                        />

                        <div
                          className={`${showThinkTime ? "block" : "hidden"}`}
                        >
                          <Countdown
                            onFinish={bootCounter ? handleSpeech : null}
                            onChange={(e) =>
                              e <= 10000 ? setStartExam(true) : ""
                            }
                            valueStyle={
                              timeDanger ? { color: "red" } : { color: "blue" }
                            }
                            value={thinkTime}
                            format="mm:ss"
                          />
                        </div>
                        <button
                          disabled={!startExam ? true : false}
                          onClick={handleSpeech}
                          className={`${
                            startExam ? "opacity-100" : "opacity-50"
                          } bg-[#3AB7BF] px-3 py-2 self-end rounded-md text-white font-[500]`}
                        >
                          <p>{isWorking ? "Recording..." : "Record Now"}</p>
                        </button>
                      </div>
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
                // disabled={enableEvaluationBtn ? true : false}
                onClick={handleEvaluate}
                className={`${
                  enableEvaluationBtn ? "opacity-50" : "opacity-100"
                } bg-[#DDE9F8]  px-6 py-3 rounded-md  drop-shadow-sm`}
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
                            fluency={true}
                              
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
