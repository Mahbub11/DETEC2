import React, { useEffect, useState } from "react";
import { Progress, Skeleton, Space, Spin } from "antd";
import Identify from "../../Components/Assesment/Identify";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as LoadingComponent } from "../../../src/Assets/SVG/IconLoadingBlock.svg";
import ParaPhase from "../../Components/Assesment/ParaPhase";
import {
  closeAssesmentModal,
  showAssesmentModal,
} from "../../redux/slices/getAssesment";

export default function ScoringLayout() {
  const {
    loading,
    sentenceError,
    userInputSen,
    finalReWrite,
    error,
    showAssesment,
  } = useSelector((state) => state.getAssesment);

  const dispatch = useDispatch();

  // const finalReWrite = [
  //   "In this picture, I can see some students going to school.",
  //   "They all wear their uniforms and they are also wearing facial masks.",
  //   "Today's weather is best in the town.",
  // ];
  // const userInputSen = [
  //   "In this picture, I can see some student are going to their school.",
  //   "They are all wears their uniforms and they are also wearing facial masks.",
  //   "Today's weather is best in the town",
  // ];

  // const sentenceError = [
  //   {
  //     0: [
  //       ["NOUN:NUM", "student", 7, 8, "students", 7, 8],
  //       ["VERB:TENSE", "are", 8, 9, "", 8, 8],
  //       ["DET", "their", 11, 12, "", 10, 10],
  //     ],
  //     correct: "In this picture, I can see some students going to school.",
  //   },
  //   {
  //     1: [
  //       ["VERB", "are", 1, 2, "", 1, 1],
  //       ["VERB:SVA", "wears", 3, 4, "wear", 2, 3],
  //     ],
  //     correct:
  //       "They all wear their uniforms and they are also wearing facial masks.",
  //   },
  //   {
  //     2: [["NOUN", "town", 6, 7, "town.", 6, 7]],
  //     correct: "Today's weather is best in the town.",
  //   },
  // ];

  console.log(sentenceError)

  return (
    <div
      className="sm:w-[98%] md:w-[80%] h-auto bg-gray-300/40
         rounded-md m-auto z-50 absolute left-0 right-0 top-10"
    >
      <div>
        <div className="h-10 bg-home flex justify-between">
          <div></div>
          <h1 className="md:text-[23px] font-[500] px-1 py-1 text-gray-700 text-center font-montserrat underline">
            {" "}
            Assessment
          </h1>
          <div
            onClick={(e) => dispatch(closeAssesmentModal())}
            className="px-2 py-2 cursor-pointer"
          >
            close
          </div>
        </div>

        <div
          className="flex md:flex-row sm:flex-col justify-between gap-5 m-auto  mt-5 
              sm:w-[95%] md:w-[70%] text-[25px] sm:text-[20px] font-[500] 
           font-montserrat  text-gray-700"
          >
          <div className="flex justify-center m-auto">
            <div className="flex flex-col mt-[13px] justify-center gap-3 w-[10rem] h-[5rem] m-auto">
              <Progress
                className="m-auto"
                type="circle"
                percent={80}
                size={100}
                strokeColor="green"
                strokeWidth={13}
              />
              <h1 className="text-center font-[500] font-montserrat">
                Ovar all
              </h1>
            </div>
          </div>

          <div
            className="
           m-auto shadow-sm px-2 py-2 rounded-md grid md:grid-cols-3
           sm:grid-cols-2 mt-3"
          >
            <div className="flex flex-col justify-center gap-3 w-[10rem]  m-auto">
              <Progress
                className="m-auto"
                type="circle"
                percent={60}
                size={65}
                strokeWidth={10}
              />
              <h1 className="text-center font-[500] font-montserrat">
                Grammatical accuracy
              </h1>
            </div>
            <div className="flex flex-col justify-center gap-3 w-[10rem] h-auto m-auto">
              <Progress
                className="m-auto"
                type="circle"
                percent={60}
                size={65}
                strokeWidth={10}
              />
              <h1 className="text-center font-[500] font-montserrat">
                Grammatical complexity
              </h1>
            </div>
            <div className="flex flex-col justify-center gap-3 w-[10rem] h-auto m-auto">
              <Progress
                className="m-auto"
                type="circle"
                percent={40}
                size={65}
                strokeWidth={10}
              />
              <h1 className="text-center font-[500] font-montserrat">
                Lexical sophistication
              </h1>
            </div>
            <div className="flex flex-col justify-center gap-3 w-[10rem] mt-[27px] h-auto m-auto">
              <Progress
                className="m-auto"
                type="circle"
                percent={70}
                size={65}
                strokeWidth={10}
              />
              <h1 className="text-center font-[500] font-montserrat">
                Lexical diversity
              </h1>
            </div>
            <div className="flex flex-col justify-center gap-3 w-[10rem] h-auto m-auto">
              <Progress
                className="m-auto"
                type="circle"
                percent={80}
                size={65}
                strokeWidth={10}
              />
              <h1 className="text-center font-[500] font-montserrat">
                Fluency
              </h1>
            </div>
            <div className="flex flex-col justify-center gap-3 w-[10rem] h-auto m-auto">
              <Progress
                className="m-auto"
                type="circle"
                percent={90}
                size={65}
                strokeWidth={10}
              />
              <h1 className="text-center font-[500] font-montserrat">
                Task relevance
              </h1>
            </div>
          </div>
        </div>

        <div className="text-gray-700 md:w-[80%] sm:w-[95%] m-auto mt-[3rem] flex flex-col gap-4">
          <div className="flex flex-col gap-4 justify-between flex-wrap">
            <h1 className="text-[22px] font-[500] font-montserrat underline">
              Sentence By Sentence Breakdown
            </h1>
            <div
              className="px-2 py-2 border border-2px m-auto border-gray-600 rounded-md w-full 
                "
            >
              {sentenceError.map((val, index) => {
                return (
                  <div>
                    <Identify
                      correctSen={val.correct}
                      index={index}
                      key={index}
                      error={val[index]}
                      sen={userInputSen[index]}
                    ></Identify>
                  </div>
                );
                console.log(Object.keys(val));
                console.log(val[Object.keys(val)]);
              })}
            </div>
          </div>

          <div>
            <h1 className="ms:text-[26px] sm:text-[17px] font-[600] font-montserrat">
              After Re-Write:
            </h1>
            <div className="border-[1px] border-gray-700 rounded-md px-2 py-2 flex flex-col gap-3">
              <div className="font-[400] font-montserrat md:text-[20px] sm:text-[16px]">
                <div className="px-2 py-2 border border-2px text-[18px] text-gray-700">
                  <p className="font-montserrat">
                    {finalReWrite.map((val) => {
                      return <ParaPhase sen={val}></ParaPhase>;
                    })}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex">
              <span className="px-2 py-2 text-[25px] text-blue-500">*</span>
              <p className="mt-3">
                Diverse your Writing skill By seeing some paraphase of it.
              </p>
            </div>
          </div>

          <div>
            <h1 className="ms:text-[26px] sm:text-[17px] font-[600] font-montserrat">
              Model Answer:
            </h1>

            <div className="border-[1px] border-gray-700 rounded-md px-2 py-2 flex flex-col gap-3">
              <div className="font-[400] font-montserrat md:text-[20px] sm:text-[16px]">
                <p>
                  In this picture, I can see some students going to school. They
                  all wear their uniforms and they are also wearing facial
                  masks. Today's weather is best in the town.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-[10rem]"></div>
      </div>
    </div>
  );
}
