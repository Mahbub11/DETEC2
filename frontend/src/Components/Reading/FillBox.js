
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SaveGapInfo,clearOptions, saveUserInput } from "../../redux/slices/fillgap";
import Gap from "./Gap";
import InputBox from "./InputBox";


function charCount(str) {
  let arr = str.split("");
  return arr.reduce((a, p) => {
    a[p] = a[p] ? a[p] + 1 : 1;
    return a;
  }, {});
}
export default function FillBox({ data,indexNumber,ansWer }) {

  const dd = charCount(data);
  const doc = data.split("*");
  const [otp, setOtp] = useState();
  const dispatch= useDispatch()

 

 
  const setGap = (value) => {
    const newVal= (value).toLowerCase();
    setOtp(newVal);
    dispatch(saveUserInput({
      [indexNumber]:doc[0]+newVal
    }));
  };

  
  const { userInput} = useSelector(
    (state) => state.fillgap
  );

  const { visibility} = useSelector(
    (state) => state.fillgap
  );
 
  
  useEffect(()=>{
    const navigationEntries = window.performance.getEntriesByType('navigation');
    if (navigationEntries.length > 0 && navigationEntries[0].type === 'reload') {
     dispatch(clearOptions(data))
    }else{
      dispatch(SaveGapInfo(data))
    }
  },[])

  return (
   <div className={`${visibility ? 'px-2 py-2' :''} font-[23px] mt-[-6px] px-1 py-1 text-justify`}>
    <p  className={`${visibility ? 'visible' :'hidden'} text-[15px] font-robotomono font[500] text-red-500 absolute ml-1 mt-[-1rem] sm:tracking-[28px] md:tracking-[35px] `}>
      { ansWer ===userInput[indexNumber] ? '': ansWer
      
    }
    </p>
     <div className="flex mt-[1px]">
      {
        doc[0].split('').map((val)=>
        <input disabled value={val} className='sm:text-[15px] md:text-[23px] py-1 px-1
         h-[35px] sm:w-8 sm:h-6 md:w-9 md:h-6 md:mt-[8px] bg-gray-200 m-1 text-center 
          rounded-sm'></input>)
      } 
       <div className="md:mt-[7px] sm:mt-[3px]">
       <Gap optw={otp} setGap={setGap} inputL={dd["*"]}></Gap>
       </div>

      
    </div>
   </div>
  );
}
