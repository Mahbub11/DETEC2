import React from "react";
import IconFBOriginal from "../../Assets/SVG/IconFBOriginal";
import IconYoutubeOriginal from "../../Assets/SVG/IconYoutubeOriginal";

export default function CommunityIndex() {
  return (
    <div className="w-full h-full">
      <div className=" m-auto items-center w-full h-full mt-[7rem]">
        <div className="md:flex md:flex-row sm:flex sm:flex-col justify-center w-full ">
          <div className="h-auto md:w-[60%] sm:w-[80%]  m-auto md:flex md:justify-end ">
            <div>
              <textarea
                className="md:w-[45rem] sm:w-full md:h-[25rem] sm:h-[10rem] bg-gray-100 px-3 py-3 text-[20px]
             font-poppins border-none rounded-sm"
                placeholder="Send your feedback"
              ></textarea>
              <button
                to={"/auth/signin"}
                className="bg-[#3AB7BF] px-5 py-3 flex justify-center items-center m-auto
             text-[15px] rounded-md text-white font-[700] mt-5 w-full"
              >
                Send Feedback
              </button>
            </div>
          </div>

          <div className="h-auto md:w-[20%] sm:w-[90%] mr-[2rem] sm:mt-[3rem] md:mt-0">
            <div>
              <h1 className="text-[25px] font-poppins font-[700] sm:text-center sm:ml-[2rem] md:ml-0">
                Join Official Community
              </h1>
              <div className="flex flex-col justify-center md:w-[60%] sm:w-full h-full m-auto mt-[3rem] items-center">
                <div className="flex flex-col justify-center w-full gap-5 items-center">
                  <div>
                    <span>
                      <IconFBOriginal
                        height="5rem"
                        width="5rem"
                      ></IconFBOriginal>
                    </span>
                    <h1 className="ml-3 mt-2">Facebook</h1>
                  </div>
                  <div>
                    <span>
                      <IconYoutubeOriginal
                        height="5rem"
                        width="5rem"
                      ></IconYoutubeOriginal>
                    </span>
                    <h1 className="ml-4 ">Youtube</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
