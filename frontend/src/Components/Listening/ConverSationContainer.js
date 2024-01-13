import React, { useEffect, useState } from "react";
import { Input, Radio, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  endEvaluateOption,
  saveEvaluation,
  startEvaluateOption,
} from "../../redux/slices/converSationHandler";
import IconMikeOn from "../../Assets/SVG/IconMikeOn";
import IconMikeOff from "../../Assets/SVG/IconMikeOff";

export default function ConverSationContainer({
  handleNextQuestion,
  currentQuestion,
  totalQ,
}) {
  const dispatch = useDispatch();
  const { isEvaluate, currentQ, data, voiceIndex, voiceList } = useSelector(
    (state) => state.converSationHandler
  );

  console.log(data);
  const synth = window.speechSynthesis;
  const [utterance, setUtterance] = useState(null);
  const [voice, setVoice] = useState(null);
  const [value, setValue] = useState(null);
  const [optionView, setOptionView] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const [canPlay, setCanPlay] = useState(true);
  const voices = synth.getVoices();
  const u = new SpeechSynthesisUtterance(data?.audio);

  useEffect(() => {
    console.log(data);
  }, [data]);
  useEffect(() => {
    setUtterance(u);

    let data1 = [];
    voices
      .filter((voice) => voice.lang.includes("en")) // showing only english voices
      .map((voice) => data1.push(voice)); //all of the voices

    setVoice(data1[data?.voiceActor]);
    if (!data?.audio) {
      setOptionView(true);
    }

    return () => {
      synth.cancel();
    };
  }, [data]);

 

  const handlePlay = () => {

   
    if (canPlay) {
      utterance.voice = voice;
      utterance.pitch = 1;
      utterance.rate = 1;
      utterance.volume = 1;
      synth.speak(utterance);
      utterance.onend = (event) => {
        setOptionView(true);
        setIsPlay(false)
          setCanPlay(false);
      };
 setIsPlay(true)

    }

   
  };
  const onChange = (e) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };

  const handleCheck = () => {
    setOptionView(false);

    if (value === data?.ans) {
      dispatch(
        saveEvaluation({
          data: {
            q: data?.audio ? data.audio : null,
            userAns: value,
            severity: true,
          },
        })
      );
    } else {
      dispatch(
        saveEvaluation({
          data: {
            q: data?.audio ? data.audio : "",
            userAns: value,
            severity: false,
            correctAns: data?.ans,
          },
        })
      );
    }
  };

  const handleEvaluation = () => {
    handleNextQuestion();
    handleCheck();
    setCanPlay(true);
  
  };

  console.log(isEvaluate);
  return (
    <div className={`${isEvaluate ? "block" : "hidden"} `}>
      <div className="flex flex-col gap-4  px-2 py-2">
        {data?.audio ? (
          <div>
           <div className="w-[40%]">
           <h1 className="font-poppins text-[12px]">
              Listen Carefully, Audio can Play One time
            </h1>
            <div  className="bg-[#f1f0f0] rounded-md">
              <div onClick={handlePlay} className="px-2 py-1 drop-shadow-md cursor-pointer">

                {
                  isPlay ? <div><span ><IconMikeOn className='mt-1' width="2rem" height="2rem"></IconMikeOn></span></div> :
                  <div> <span ><IconMikeOff className='mt-1' width="2rem" height="2rem"></IconMikeOff></span></div>
                }
                
               
              </div>
            </div>
           </div>
            <div
              className={`${
                optionView ? "block" : "hidden"
              } h-auto w-[80%]  self-end`}
            >
              <div className="font-poppins text-[20px] mt-5">
                <h1>
                  Question {currentQuestion} of {totalQ}{" "}
                </h1>
                <h1> Selete the best response</h1>
              </div>
              <Radio.Group onChange={onChange} value={value}>
                <div className="flex flex-col gap-1 font-poppins text-[20px]">
                  {data?.options.map((val, i) => {
                    return (
                      <div className="font-poppins text-[20px] border-[2px] px-1 py-1 rounded-md">
                        <Radio
                          style={{ fontSize: "17px", fontFamily: "inherit" }}
                          value={val}
                        >
                          {val}
                        </Radio>
                      </div>
                    );
                  })}
                </div>
              </Radio.Group>
            </div>
          </div>
        ) : (
          <div>
            <div className="font-poppins text-[20px]">
              <h1>
                Question {currentQuestion} of {totalQ}{" "}
              </h1>
              <h1> Selete the best Option to Start</h1>
            </div>
            <div
              className={`${
                optionView ? "block" : "hidden"
              } h-auto w-[80%]  self-end mt-5`}
            >
              <Radio.Group onChange={onChange} value={value}>
                <div className="flex flex-col gap-1 font-poppins text-[20px]">
                  {data?.options.map((val, i) => {
                    return (
                      <div className="font-poppins text-[20px] border-[2px] px-1 py-1 rounded-md">
                        <Radio
                          style={{ fontSize: "17px", fontFamily: "inherit" }}
                          value={val}
                        >
                          {val}
                        </Radio>
                      </div>
                    );
                  })}
                </div>
              </Radio.Group>
            </div>
          </div>
        )}

        <button
          onClick={handleEvaluation}
          className={`w-min self-end px-5 py-2 mt-4 bg-[#3AB7BF] rounded-md text-white`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
