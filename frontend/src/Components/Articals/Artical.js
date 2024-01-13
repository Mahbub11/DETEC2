import React from "react";
import { Link } from "react-router-dom";
import IconReadingAvatar from "../../Assets/SVG/IconReadingAvatar";
import IconWritingAvatar from "../../Assets/SVG/IconWritingAvatar";
import IconSpeakingAvatarISN from "../../Assets/SVG/IconSpeakingAvatarISN";
import IconListeningAvatar from "../../Assets/SVG/IconListeningAvatar";

export default function Artical() {
  return (
    <div >
      <div className="h-auto md:w-[35%] sm:px-2">
        <div className="flex flex-col gap-2  ">
          <div
            className="bg-[#DDE9F8] md:h-[20rem] md:w-[17rem] sm:h-[15rem] flex flex-col justify-center 
            items-center
                 px-3 rounded-md "
          >
            <span className="mt-2 sm:h-[8rem] md:h-[8rem]">
              <IconWritingAvatar height="full" width="full"></IconWritingAvatar>
            </span>
            <h1
              className="font-poppins md:text-[18px] sm:text-[13px] 
             mt-5 font-[700] text-center text-gray-800"
            >
              Useful Tips for Writing Section in Duolingo English Test
            </h1>
            <div className="w-full self-end h-10  md:mt-5">
              <Link
                className="text-center mt-2 md:text-[17px] sm:text-[15px] font-poppins font-[500] flex justify-center
                w-full hover:underline hover:text-blue-500"
              >
                Read More..
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
