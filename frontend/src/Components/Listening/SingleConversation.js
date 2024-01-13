import React, { useEffect, useState } from "react";
import IconConversationSpeaker from "../../Assets/SVG/IconConversationSpeaker";
import IconCrossMark from "../../Assets/SVG/IconCrossMark";
import IconRightMark from "../../Assets/SVG/IconRightMark";

export default function SingleConversation({ data }) {

  return (
    <div>
      <div className="flex flex-col justify-between gap-5 mt-5 px-2 font-poppins">
        <div
          className={`${
            data?.q ? "visible" : "invisible"
          } self-start w-[80%] flex gap-3 drop-shadow-sm`}
            >
          <span className="mt-2">
            <IconConversationSpeaker
              height="3rem"
              width="3rem"
            ></IconConversationSpeaker>
          </span>
          <div className="bg-[#f7faff] p-2 rounded-lg relative before:absolute before:content-[''] before:w-2 before:h-3 before:bg-[#f7faff] before:rotate-45 before: before:-left-1 before:top-2">
            <h1 className=" ">{data?.q ? data?.q : ""}</h1>
          </div>
        </div>

        <div className={`flex justify-end self-end w-[80%] mt-1 drop-shadow-sm`}>
          <div className="bg-[#f7faff] p-2 flex flex-wrap w-[90%] rounded-lg relative before:absolute before:content-[''] before:w-5 before:h-4 before:bg-[#f7faff] before:rotate-45 before: before:-right-1 before:top-2">
            <h1
              className={`px-2 py-2 border-[3px] rounded-md ${
                data?.severity
                  ? "border-green-400 w-full"
                  : "border-red-400 w-full"
              }`}
            >
              {data?.severity ? data.userAns :
              <div className='flex flex-col gap-3'>
                <p className='line-through'> {data?.userAns}</p>
                <div className='flex flex-col gap-1'>
                  <h1>Best Answer:</h1>
                  <h1>{data.correctAns}</h1>

                </div>

                </div>}
             
            </h1>

            <span className={`${data?.severity ? 'absolute':'hidden'} absolute right-0 z-500 mt-[-3px]`}>
              <IconRightMark height='23px' width='23px'></IconRightMark>
            </span>
            <span className={`${data?.severity ? 'hidden':'absolute'} absolute right-0 z-500 mt-[-3px]`}>
              <IconCrossMark height='23px' width='23px'></IconCrossMark>
            </span>


          </div>
        </div>
      </div>
    </div>
  );
}
