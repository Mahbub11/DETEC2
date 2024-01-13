import React, { useEffect, useState } from "react";
import CheckboxBoxButton from "./CheckboxButton";
import { useDispatch } from "react-redux";
import { ToggleVisibility } from "../../redux/slices/fillgap";
import { saveUserchoice } from "../../redux/slices/wordSelect";
import {IconSound } from "../../Assets/SVG/Sound.js";

export default function SingleListenType({ ans }) {
  const data = [
    "Apple",
    "Mango",
    "Triup",
    "Lorem",
    "Egg",
    "Apple1",
    "Mango1",
    "Triup1",
    "Lorem2",
    "Egg2",
    "Egg3",
    "Apple3",
    "Mango3",
    "Triup3",
    "Lorem4",
  ];

  const [choice, setChoice] = useState([]);
  let [isplaying,setisPlaying]= useState(3);
  const [soundShow,setsoundShow]= useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(saveUserchoice(choice));
  }, [choice]);

  const handleInputVal = (val) => {
    if (choice.includes(val)) {
      const newData = choice.filter((name, index) => name !== val);
      return setChoice(newData);
    } else {
      return setChoice((prev) => [...prev, val]);
    }
  };

  const handleSoundPlay=()=>{

    if(isplaying===0){
      setsoundShow(false)
    }else{
      setisPlaying(--isplaying);
    }
         
  }

  return (
    <div className="  sm:mt-[4rem] bg-violet-400/30 flex items-center justify-center  md:mt-[8rem]">
      
        <div className=" w-full flex justify-center">
          <div className="w-[90%] sm:flex sm:flex-col lg:flex-row justify-center sm:gap-[3rem] md:gap-10 ">
            <div className="flex justify-center sm:h-full lg:h-[10%] sm:w-full lg:w-[30%]">
              <div onClick={handleSoundPlay} className={`${soundShow ? 'block' :'disabled'} cursor-pointer  h-full`}>
               <span className=""><IconSound playing={isplaying}></IconSound></span>
              </div>
            </div>
            <div className="sm:h-full lg:h-[10%] sm:w-full lg:w-[60%] mt-[-2rem] ">
              <div className="flex justify-center">
              <div className="flex:col justify-center">
                <textarea className="sm:h-[9rem] border-none outline-none md:h-[15rem] md:w-[90%] sm:w-full text-[25px] px-2 py-2">

                </textarea>
                <div>
                  <h1>Number of play left: {isplaying}</h1>
                </div>

              </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="h-full w-full">
        <button onClick={handleEvalute} className="w-full h-full flex justify-center m-auto mt-5 bg-blue-300 rounded-md">
          <span className="text-center  mt-1 mb-1 text-white ">Evaluate</span>
        </button>
      </div> */}
      
    </div>
  );
}
