import React, { useState } from "react";

export default function ShowSen({
  sen,
  redIndexList,
  correctWord,
  correctSen,
}) {

  const [visible, setvisible] = useState(false);

  const handleHover = () => {
    setvisible(true);
  };

  let v = 1;

  return (
    <div className="flex gap-2 flex-wrap">
      {sen.split(" ").map((val, i) => {
        return (
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              {redIndexList.includes(i) ? (
                <div>
                  
                  {/* { correctWord[i]} */}

                  <p className="text-red-400 underline cursor-pointer">
                    {val}

                    <span className="text-[12px] bg-home rounded-md w-auto px-[7px] py-[2px] text-black">
                      {v++}
                    </span>
                  </p>
                </div>
              ) : (
                <p>{val}</p>
              )}
            </div>
            
          </div>
        );
      })}
    </div>
  );
}
