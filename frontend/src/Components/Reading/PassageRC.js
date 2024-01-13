import React, { useState, useEffect, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWordDetails } from "../../redux/slices/disctionary";
import FillBox from "./FillBox";
import InputBox from "./InputBox";
import InputBoxContainer from "./InputBoxContainer";

export default function PassageRC({ question, ans, title }) {
  const dispatch = useDispatch();

  const handleMeaning = (val) => {
    dispatch(getWordDetails(val.target.textContent));
  };

  let a = -1;
  return (
    <div className="h-full w-full sm:block md:flex flex-col justify-between m-auto ">
      <div className="w-full sm:mt-[0px] m-auto flex flex-col justify-between ">
        <h1 className="text-center text-[22px] font-[500] sm:font-[500] font-robotomono underline">
          {title}
        </h1>

        <div>
          <div className="bmd:order-[2px] md:px-1 md:py-1 mt-5 font-montserrat sm:text-[15px] 
          md:text-[18px] font-[400] flex flex-col">
            <div
              className="flex flex-wrap md:gap-1 sm:gap-[5px]  leading-1 w-[90%] sm:w-full msm:w-[100%]
            px-2 sm:leading-8 md:leading-10 m-auto text-justify"
            >
              {question.split(" ").map((value, index) => {
                if (value.includes("*")) {
                  let passIndex = ++a;
                  a = passIndex;

                  var sectionToCheck = value;
                  var allFoundCharacters = sectionToCheck.match(/[*]/g);
                  const doc = sectionToCheck.split("*");
                  return (
                    <InputBoxContainer
                      ansWer={ans[passIndex]}
                      starter={doc[0]}
                      indexNumber={passIndex}
                      gap={allFoundCharacters}
                      givenChar={doc}
                    ></InputBoxContainer>
                  );

                  // return (
                  //   <div className="flex flex-col gap-1">

                  //     <div className={`${visibility ? 'flex':'hidden'} gap-1 font-[500] tracking-[2rem] ml-2 font-poppins`}>
                  //       {ans[passIndex].split("").map((val, i) => {
                  //         return <p>{val}</p>;
                  //       })}
                  //     </div>

                  //     <div className="flex md:gap-2 sm:gap-1">
                  //       {doc[0].split("").map((val, i) => {
                  //         return (
                  //           <p className="md:w-10 sm:w-7 bg-gray-200 md:px-2 text-center rounded-md ">
                  //             {val}
                  //           </p>
                  //         );
                  //       })}

                  //       {allFoundCharacters.map((val) => (
                  //         <InputBox
                  //           ansWer={ans[passIndex]}
                  //           indexNumber={passIndex}
                  //           key={index}
                  //           data={doc[0]}
                  //           gapChar={gapChar}
                  //         ></InputBox>
                  //       ))}
                  //     </div>
                  //   </div>
                  // );
                } else {
                  return (
                    <div>
                      <p
                        className="cursor-pointer md:hover:text-blue-500"
                        onClick={handleMeaning}
                      >
                        {value}
                      </p>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
