import React, { useEffect, useState } from "react";
import CheckboxBoxButton from "./CheckboxButton";
import { useDispatch, useSelector } from "react-redux";
import { ToggleVisibility } from "../../redux/slices/fillgap";
import { saveUserchoice } from "../../redux/slices/wordSelect";


export default function SingleWordChoice({ data }) {
  const { q, a } = data;
  const [choice, setChoice] = useState([]);
  const dispatch = useDispatch();
  const { checkbox } = useSelector((state) => state.wordSelect);

  useEffect(() => {
    dispatch(saveUserchoice(choice));
  }, [choice]);

  useEffect(() => {
    setChoice([]);
  }, [checkbox]);


  const handleInputVal = (val) => {
    if (choice.includes(val)) {
      const newData = choice.filter((name, index) => name !== val);
      return setChoice(newData);
    } else {
      return setChoice((prev) => [...prev, val]);
    }
  };


  return (
    <div className="sm:mt-[1rem] bg-violet-400/30 flex items-center justify-center md:mt-[3rem]">
      <div className=" ">
        <div className=" w-full flex justify-center">
          <div className="grid grid-cols-2 font-montserrat sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 
          gap-2 justify-between">
            {q?.map((val, index) => {
              return (
                <div>
                  {
                    <CheckboxBoxButton
                      key={val}
                      handleInputVal={handleInputVal}
                      label={val}
                      answer={a}
                    ></CheckboxBoxButton>
                  }
                </div>
              );
            })}
          </div>
        </div>
        {/* <div className="h-full w-full">
        <button onClick={handleEvalute} className="w-full h-full flex justify-center m-auto mt-5 bg-blue-300 rounded-md">
          <span className="text-center  mt-1 mb-1 text-white ">Evaluate</span>
        </button>
      </div> */}
      </div>
    </div>
  );
}
