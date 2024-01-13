import React, { useEffect, useState } from "react";
import { Tag, Button, notification, Progress } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import { Statistic, Skeleton, Collapse } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "../../Components/Reading/RadioBtn.css";
import { IconMicrophone } from "../../Assets/SVG/IconMicrophone";
import { IconMicOffCircle } from "../../Assets/SVG/IconMicOff";
import { ReactMic } from "react-mic";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { clearStatDataError, saveStatData } from "../../redux/slices/statistic";
import IconsArrowLeft from "../../Assets/SVG/IconsArrowLeft";
import IconsArrowRight from "../../Assets/SVG/IconsArrowRight";
import IconConversationBot from "../../Assets/SVG/IconConversationBot";
import IconSpeakingAvatar from "../../Assets/SVG/IconSpeakingAvatar";
import { useParams } from "react-router-dom";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { toggleBookmark } from "../../redux/slices/bookmark";
import IconCross from "../../Assets/SVG/IconCross";
import IconMikeOn from "../../Assets/SVG/IconMikeOn";

const { fuzzy } = require("fast-fuzzy");
const { Countdown } = Statistic;
const deadline = Date.now() + 12000;

export default function PracticePageSAL({ id, handleCloseModal }) {
  const dispatch = useDispatch();
  const synth = window.speechSynthesis;
  let [record, setRecord] = useState(false);
  const [audioData, setAudioData] = useState();
  const [showAssesment, setShowAssesment] = useState(false);
  const [active, setActive] = useState(false);
  const [matching, setMatching] = useState();
  const [timeDanger, setTimeDanger] = useState(false);
  const [busy, isBusy] = useState(true);
  let [index, setIndex] = useState(id);
  const [bColor, setBcolor] = useState(true);
  const { rid } = useParams();
  // const { error } = useSelector((state) => state.statistic);
  const { listSAL } = useSelector((state) => state.getSpeakingList);
  let [data, setData] = useState({});
  const [deadline, setDeadline] = useState(2);
  const [showEvaluate, setShowEvaluate] = useState(false);
  const [bootCounter, setbootCounter] = useState(true);
  const [text, setText] = useState();
  const [utterance, setUtterance] = useState(null);
  const [voice, setVoice] = useState(null);
  let dataLength = listSAL.length;

  useEffect(() => {
    setIndex(id);
  }, [id]);

  useEffect(() => {
    notification.destroy();
    if (!bootCounter) {
      setbootCounter(true);
      setDeadline(undefined);
    }
  }, [bootCounter]);

  useEffect(() => {
    if (id) {
      const data = listSAL.filter((val) => index === val.index);
      setData(data[0]);
      setBcolor(data[0].bookmark);
      setDeadline(Date.now() + data[0]?.time * 60000);
      setText(data[0].qa.q);
    } else {
      const data = listSAL.filter((val) => parseInt(rid) === val.id);
      setDeadline(Date.now() + data[0]?.time * 60000);
      setData(data[0]);
      setBcolor(data[0].bookmark);
      setText(data[0].qa.q);
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
  }, [data]);

  const handleNext = () => {
    if (index <= --dataLength) {
      setIndex(++index);
      handleRetry();
    }
  };
  const handlePrev = () => {
    if (index > 1) {
      setIndex(--index);
      handleRetry();
    }
  };

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

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

  const handleEvaluate = () => {
    setShowAssesment(true);
    setActive(false);
    stopRecording();
    SpeechRecognition.stopListening();
    setMatching(fuzzy(data.qa.q.toString(), transcript));
    setShowEvaluate(true);

    console.log(audioData);
  };

  const handleRetry = () => {
    notification.destroy();
    setShowAssesment(false);
    setActive(false);

    stopRecording();

    SpeechRecognition.stopListening();
    setShowEvaluate(false);
    setDeadline(Date.now() + data.time * 60000);
  };
  const handleSpeech = () => {
    setActive(!active);

    !active ? startRecording() : stopRecording();
    !active
      ? SpeechRecognition.startListening()
      : SpeechRecognition.stopListening();
    setMatching(fuzzy(data.qa.q.toString(), transcript));
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
    setDeadline(undefined);
    SpeechRecognition.stopListening();
    setDeadline(null);
    handleCloseModal();
    setActive(false);
    stopRecording();
  };
  const openNotification = () => {
    setActive(false);
    stopRecording();
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

  const handleAIsampleVoice=()=>{
    utterance.voice = voice;
      utterance.pitch = 1;
      utterance.rate = 1;
      utterance.volume = 1;
      synth.speak(utterance);
  }

  return (
    <div>
      {busy ? (
        <div>
          {" "}
          <Skeleton active></Skeleton>
        </div>
      ) : (
        <div>
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
                Read Aloud
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
                className="ml-1 font-[500] text-[22px] bg-[#DDE9F8] w-min px-2 py-2 rounded-md
              fixed sm:right-0 top-20"
              >
                <Countdown
                  onChange={(e) => (e <= 60000 ? setTimeDanger(true) : "")}
                  valueStyle={timeDanger ? { color: "red" } : { color: "blue" }}
                  onFinish={openNotification}
                  value={deadline}
                  format="mm:ss"
                />
              </div>

              <h1 className="sm:text-[17px] md:text-[22px] md:block self-center font-poppins mt-[2rem]">
                Record yourself saying the statement below.
              </h1>

              <div className="md:w-[85%] sm:w-full m-auto">
                <div className="sm:h-auto md:h-[20rem] border-[2px] rounded-md sm:py-3">
                  <div className="md:flex md:flex-row sm:flex sm:flex-col justify-between gap-3 md:w-[60%] sm:w-[95%] h-full m-auto">
                    <div className="m-auto h-full md:hidden sm:block  w-full">
                      <div className="mt-10 drop-shadow-md flex justify-center">
                        <span>
                          <IconSpeakingAvatar
                            height="7rem"
                            width="7rem"
                          ></IconSpeakingAvatar>
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col justify-center w-[80%] m-auto h-full items-center gap-10 ">
                      <h1 className="md:text-[20px] sm:text-[15px] font-poppins  ">
                        {data.qa.q}
                      </h1>

                      <div className="flex justify-between gap-3 ">
                        <ReactMic
                          className="rounded-md w-[40%]"
                          record={record}
                          visualSetting="frequencyBars"
                          onStop={onStop}
                          strokeColor="#53b0e5"
                          backgroundColor="#FFFFFF"
                        />

                        <button
                          onClick={handleSpeech}
                          className="bg-[#3AB7BF] px-3 py-2 rounded-md text-white font-[500]"
                        >
                          Record Now
                        </button>
                      </div>
                    </div>

                    <div className="m-auto  h-full ml-10 md:block sm:hidden">
                      <div className="mt-10 drop-shadow-md">
                        <span>
                          <IconSpeakingAvatar
                            height="7rem"
                            width="7rem"
                          ></IconSpeakingAvatar>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5  flex justify-center">
                  <div
                    className={`${
                      showEvaluate ? "block" : "hidden"
                    } "h-auto w-[95%] m-auto"`}
                  >
                    <Collapse
                      accordion
                      items={[
                        {
                          key: "1",
                          label: "Evaluation Result",
                          children: (
                            <div className="md:w-[50%] sm:w-full m-auto md:flex md:flex-row sm:flex-col justify-center gap-5">
                              <div className=" m-auto flex flex-col">
                                <div className="sm:m-auto">
                                  <Progress
                                    style={{ fontSize: "10px" }}
                                    type="circle"
                                    percent={Math.floor(matching * 100)}
                                    size={70}
                                  />
                                </div>
                                <p className="text-[20px] font-[500 text-center">
                                  Accuracy
                                </p>
                              </div>
                              <div className="sm:ml-[-12px] ">
                                <div className="ml-3 mt-2 flex gap-2 border-[1px] rounded-md 
                                justify-center m-auto">
                                  <h1 className="mt-[2px] text-[17px] font-poppins font-[500]">AI</h1>
                                  <span onClick={handleAIsampleVoice} className="cursor-pointer"><IconMikeOn
                                    height="2rem"
                                    width="2rem"
                                  ></IconMikeOn></span>
                                </div>
                                <div className="m-auto text-center">
                                  <p>Your Answer</p>
                                  <audio controls src={audioData}></audio>
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
                    <IconsArrowRight
                      width="1rem"
                      height="1rem"
                    ></IconsArrowRight>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
