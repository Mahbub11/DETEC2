import React, { useEffect, useRef, useState } from "react";

export default function InputBox({ ansWer,gapChar,name}) {
  const [val, setVal] = useState({});

  const handleKeyDown = (e) => {

    gapChar(e)
    if (e.target.value.length === 1) {
      const fields = Array.from(document.querySelectorAll("#inputBox")) || [];
      const position = fields.indexOf(e.target);
      fields[position + 1] && fields[position + 1].focus();
    }
  };

  const handleKeyDown1 = (event) => {
    if (event.key === "Backspace") {
      const fields = Array.from(document.querySelectorAll("#inputBox")) || [];
      const position = fields.indexOf(event.target);
      fields[position - 1] && fields[position - 1].focus();
    }
  };

  return (
    <div>
      {/* {
        ansWer.split('').map((val,i)=>{
          return(<p>D</p>)
        })
      } */}
      <div className="flex flex-wrap">
        <input
        maxLength={1}
        name={name}
        pattern="[a-z]+"
          onKeyDown={handleKeyDown1}
          id="inputBox"
          className="bg-gray-100 md:w-[2.2rem] md:h-[25px] md:mt-[8px]
           sm:w-7  px-2 rounded-md text-center shadow-sm"
          onChange={handleKeyDown}
        ></input>
      </div>
    </div>
  );
}
