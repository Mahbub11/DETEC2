import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveUserInput } from "../../redux/slices/fillgap";
import InputBox from "./InputBox";
import { ReactComponent as Tick } from "../../Assets/SVG/tick.svg";

export default function InputBoxContainer({
  ansWer,
  indexNumber,
  gap,
  givenChar,
  starter,
}) {
  const dispatch = useDispatch();
  const [val, setVal] = useState({});
  const [isActive, setActive] = useState(false);

  const { userInput } = useSelector((state) => state.fillgap);
  const { visibility } = useSelector((state) => state.fillgap);
  const gapChar = (e) => {
   
    const { name, value } = e.target;
    setActive(true);
    const newVal = value.toLowerCase();
    console.log(newVal);
    setVal(prev => {
      return { ...prev, [name]: (newVal) };
    });

  //   setVal((prev) => prev ,[name]: newVal );
  };
  // useEffect(() => {
  //   setVal(starter);
  // }, [visibility]);

  useEffect(() => {

    dispatch(
      saveUserInput({
        [indexNumber]: starter+Object.values(val).join(''),
      })
    );
    setActive(false);
  }, [isActive]);



  return (
    <div className="flex flex-col h-[2rem]">
      <p
        className={`${
          visibility ? "visible" : "hidden"
        } text-[15px] font-robotomono font[500]
      text-red-500 absolute mt-[-1.5rem] `}
      >
        {ansWer.trim() === userInput[indexNumber] ? <div className="mt-3"><Tick></Tick></div> : ansWer}
      </p>
      <div className="flex gap-1 ">
        {starter.split("").map((val) => (
          <input
            disabled
            value={val}
            className="bg-gray-100 md:w-[2.2rem] md:h-[25px] md:mt-[8px] sm:w-7 
             px-2 rounded-md text-center shadow-sm "
          ></input>
        ))}
        {gap.map((val, i) => (
       
          <InputBox name={i} key={i} gapChar={gapChar}></InputBox>
        ))}
      </div>
    </div>
  );
}
