import React, { useRef, useState } from "react";
import "./App.css";
import Router from "./routes/Route";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ClearUserInputs,
  DisableVisibility,
} from "./redux/slices/fillgap";
import { Button, Modal, Radio, Select } from "antd";
import { closeDictionary, saveWord } from "./redux/slices/disctionary";
import { IconSoundOn } from "./Assets/SVG/IconSoundOn";
import { EndEvaluateOption } from "./redux/slices/converSationHandler";
import { ForceBlurFalse } from "./redux/actions";
import { getUserInfo } from "./redux/slices/auth";
import { notification } from "antd";
import { clearAssesmentResult } from "./redux/slices/assesmentResult";

function App() {
  let location = useLocation();
  const dispatch = useDispatch();
  const { isOpen, dictionaryData } = useSelector((state) => state.disctionary);
  const dicData = dictionaryData ? dictionaryData[0] : "";
  const [flag, setFlag] = useState("d");
  const audioRef = useRef();


  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  const handleOk = () => {
    dispatch(closeDictionary());
  };
  const handleCancel = () => {
    dispatch(closeDictionary());
  };

  useEffect(() => {
    dispatch(DisableVisibility());
    // clearReduxWhiteList();
    dispatch(ForceBlurFalse());
    dispatch(ClearUserInputs());
  }, [location]);

  useEffect(() => {
    window.addEventListener("beforeunload", clearReduxWhiteList);
    return () => {
      window.removeEventListener("beforeunload", clearReduxWhiteList);
    };
  }, []);
  const clearReduxWhiteList = (e) => {
    dispatch(EndEvaluateOption());
  };

  const handlePhonetic = () => {
    let audio = new Audio(dicData?.phonetics[0]?.audio);
    audio.play();
    // console.log('Clicke')
    // audioRef.current.play()
  };

  const handleWordSave=()=>{
    const data={
      flag,
      data:dicData?.wordName
    }
    dispatch(saveWord(data))

  }

  return (
    <>
      <Router></Router>
      <Modal
        width="30rem"
        className="text-[22px] w-[40rem]"
        footer={[
          // <Button key="1">Close</Button>,
          <div className="flex gap-2 justify-end">
            <Select
              defaultValue="Difficult"
              style={{ width: 120 }}
              onChange={(e) => setFlag(e)}
              options={[
                { value: "d", label: "Difficult" },
                { value: "l", label: "Later Practice" },
                { value: "s", label: "Speel Check" },
                { value: "c", label: "Completed" },
              ]}
            />
            <Button onClick={handleWordSave} >Add to my Vocabuary</Button>,
          </div>,
        ]}
        title="Dictionary"
        open={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
       >
        <div className="h-auto flex flex-col gap-5">
          <div className="flex gap-5 justify-between">
            <h1 className="text-[30px] text-tahiti normal-case">
              {dicData?.wordName}
            </h1>
            <div className="flex gap-5 mr-[2rem] mt-2">
              <p className="border px-3 rounded-md">
                <h1 className="mt-1">{dicData?.phonetics[0]?.text}</h1>
              </p>
              <span
                onClick={handlePhonetic}
                className="mt-[5px] cursor-pointer"
              >
                <IconSoundOn
                  className="cursor-pointer"
                  fill="#f7f7f7"
                ></IconSoundOn>
              </span>
              <audio
                ref={audioRef}
                hidden={true}
                src={dicData?.phonetics[0]?.audio}
              ></audio>
            </div>
          </div>

          <div>
            {dictionaryData.map((val, index) => {
              return (
                <div className="shadow-md px-2 py-2 rounded-sm">
                  <h1 className="text-[20px] font-[500] font-robotomono underline">
                    PartOfSpeech: {val.partOfSpeech}
                  </h1>
                  <h1 className="text-[18px] font-robotomono font-[500] mt-3 underline">
                    Definations:
                  </h1>
                  <div className="font-montserrat font-[500]">
                    {val.definitions.map((val, index) => {
                      return (
                        <ul className="list-disc ml-10">
                          <li>{val}</li>
                        </ul>
                      );
                    })}
                  </div>
                  <div>
                    <h1 className="text-[18px] font-robotomono font-[500] underline mt-5">
                      Synonyms:
                    </h1>
                    <div className="flex gap-2 flex-wrap">
                      {val.synonyms.map((val, index) => {
                        return (
                          <p className="rounded-md bg-gray-200 px-2 py-1 font-[400]">
                            {val}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <h1 className="text-[18px] font-robotomono font-[500] underline mt-5">
                      Antonyms:
                    </h1>
                    <div className="flex gap-3 flex-wrap">
                      {val.antonyms.map((val, index) => {
                        return (
                          <p className="rounded-md bg-gray-200 px-2 py-1 font-[400]">
                            {val}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Modal>
    </>
  );
}

export default App;
