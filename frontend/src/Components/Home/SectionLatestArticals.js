import React from "react";
import { ReactComponent as Studentsuccess } from "../../Assets/SVG/StudentSuccess.svg";
import { ReactComponent as Qutation } from "../../Assets/SVG/Quatation.svg";
import IconDummy1 from "../../Assets/Icon/iconDummy1.jpg";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import "./Carousal.css";
import Review from "../Feedback/Review";
import "./SectionFive.css";
import IconReadingAvatar from "../../Assets/SVG/IconReadingAvatar";
import IconWritingAvatar from "../../Assets/SVG/IconWritingAvatar";
import IconSpeakingAvatarISN from "../../Assets/SVG/IconSpeakingAvatarISN";
import IconListeningAvatar from "../../Assets/SVG/IconListeningAvatar";
import { Link } from "react-router-dom";

export const SectionLatestArticals = () => {
  return (
    <div>
      <section className="h-auto  mt-[5%] w-full  flex:col justify-center ">
        <div className="flex:col justify-center w-full">
          <h1
            className="sm:text-[30px] md:text-[35px] 
           lg:text-[40px]  text-center font-[700]"
          >
            Latest Articles
          </h1>
          <div className="w-full flex justify-center mt-3">
            <p
              className="text-[20px]  md:text-[22px] text-center sm:w-[90%] sm:text-[16px] sm:font-[400]
             font-montserrat lg:w-[60%]"
            >
              In our latest articles, you will get detailed questions and
              answers tips for all modules for your proficiency exam.
            </p>
          </div>
        </div>

        <div
          className=" w-full flex flex-col justify-center mt-[5rem] m-auto self-center items-center
         md:gap-[7rem] sm:gap-[3rem]"
        >
          <div className="flex justify-center md:w-[80%] sm:w-full md:gap-10">
            <div className="h-auto md:w-[35%] sm:px-2">
              <div className="flex flex-col gap-2  ">
                <div
                  className="bg-[#DDE9F8] md:h-[30rem] sm:h-[15rem] flex flex-col justify-center items-center
                 px-3 rounded-md "
                >
                  <span className="mt-2 ">
                    <IconReadingAvatar
                      height="md:17rem sm:10rem"
                      width="md:15rem sm:10rem"
                    ></IconReadingAvatar>
                  </span>
                  <h1
                    className="font-poppins md:text-[22px] sm:text-[15px] font-[700] text-center md:leading-9
                  text-gray-800 mt-3"
                  >
                    Useful Tips for Reading Section in Duolingo English Test
                  </h1>
                  <div className="md:h-[10rem] sm:h-[2rem]"></div>
                </div>
              </div>
              <div className="h-auto w-full">
                <div className="md:mt-5 sm:block md:hidden text-center">
                  <Link to={"/duolingo/tips/reading"}>
                    <span className="font-[600] text-[#3AB7BF] text-[20px] py-2">
                      Read More...
                    </span>
                  </Link>
                </div>
                <div
                  className="md:w-[25%] sm:w-[40%] m-auto bg-[#FFFF] h-auto 
                  md:mt-[-8rem] sm:mt-[-1.5rem] absolute md:ml-4 sm:ml-[5px] shadow-sm rounded-lg
                    md:flex justify-center md:px-2 md:py-2 sm:hidden"
                >
                  <div className="w-[80%] h-full md:px-2 md:py-3 ">
                    <div
                      className="flex flex-col justify-center w-full  items-center m-auto
                     sm:h-[9rem]"
                    >
                      <div className="w-full h-full flex justify-center">
                        <p className="font-montserrat md:text-[17px] sm:text-[15px] text-justify sm:hidden md:block">
                          You will be evaluated on the following skills in the
                          DET Reading Section (or Question categories), and it
                          is expected that you will read actively...…..
                        </p>
                      </div>
                      <div className="md:mt-5">
                        <Link to={"/duolingo/tips/reading"}>
                          <span className="font-[600] text-[#3AB7BF] text-[20px] py-2">
                            Read More...
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-auto md:w-[35%] sm:px-2">
              <div className="flex flex-col gap-2  ">
                <div
                  className="bg-[#DDE9F8] md:h-[30rem] sm:h-[15rem] flex flex-col justify-center items-center
                 px-3 rounded-md "
                >
                  <span className="mt-2">
                    <IconSpeakingAvatarISN
                      height="md:15rem sm:10rem"
                      width="md:15rem sm:10rem"
                    ></IconSpeakingAvatarISN>
                  </span>
                  <h1 className="font-poppins md:text-[22px] sm:text-[15px] font-[700] text-center md:leading-9  mt-3 text-gray-800">
                    Useful Tips for Speaking Section in Duolingo English Test
                  </h1>
                  <div className="md:h-[10rem] sm:h-[2rem]"></div>
                </div>
              </div>
              <div className="h-auto w-full">
                <div className="md:mt-5 sm:block md:hidden text-center">
                  <Link>
                    <span className="font-[600] text-[#3AB7BF] text-[20px] py-2">
                      Read More...
                    </span>
                  </Link>
                </div>
                <div
                  className="md:w-[25%] sm:w-[40%] m-auto bg-[#FFFF] h-auto 
                  md:mt-[-8rem] sm:mt-[-1.5rem] absolute md:ml-4 sm:ml-[5px] shadow-sm rounded-lg
                    md:flex justify-center md:px-2 md:py-2 sm:hidden"
                >
                  <div className="w-[80%] h-full md:px-2 md:py-3 ">
                    <div
                      className="flex flex-col justify-center w-full  items-center m-auto
                     sm:h-[9rem]"
                    >
                      <div className="w-full h-full flex justify-center">
                        <p className="font-montserrat md:text-[17px] sm:text-[15px] text-justify sm:hidden md:block">
                          This is likely one of the trickiest adaptive system
                          questions you will face on the Duolingo English Test
                          since it requires you to describe a....
                        </p>
                      </div>
                      <div className="md:mt-5">
                        <Link>
                          <span className="font-[600] text-[#3AB7BF] text-[20px] py-2">
                            Read More...
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*  */}
          <div className="flex justify-center md:w-[80%] sm:w-full md:gap-10">
            <div className="h-auto md:w-[35%] sm:px-2">
              <div className="flex flex-col gap-2  ">
                <div
                  className="bg-[#DDE9F8] md:h-[30rem] sm:h-[15rem] flex flex-col justify-center items-center
                 px-3 rounded-md "
                >
                  <span className="mt-2 sm:h-[8rem] md:h-[13rem]">
                    <IconWritingAvatar
                      height="full"
                      width="md:13rem sm:7rem"
                    ></IconWritingAvatar>
                  </span>
                  <h1 className="font-poppins md:text-[22px] sm:text-[15px]  mt-3 font-[700] text-center md:leading-9 text-gray-800">
                    Useful Tips for Writing Section in Duolingo English Test
                  </h1>
                  <div className="md:h-[10rem] sm:h-[2rem]"></div>
                </div>
              </div>
              <div className="h-auto w-full">
                <div className="md:mt-5 sm:block md:hidden text-center">
                  <Link>
                    <span className="font-[600] text-[#3AB7BF] text-[20px] py-2">
                      Read More...
                    </span>
                  </Link>
                </div>
                <div
                  className="md:w-[25%] sm:w-[40%] m-auto bg-[#FFFF] h-auto 
                  md:mt-[-8rem] sm:mt-[-1.5rem] absolute md:ml-4 sm:ml-[5px] shadow-sm rounded-lg
                    md:flex justify-center md:px-2 md:py-2 sm:hidden"
                >
                  <div className="w-[80%] h-full md:px-2 md:py-3 ">
                    <div
                      className="flex flex-col justify-center w-full  items-center m-auto
                     sm:h-[9rem]"
                    >
                      <div className="w-full h-full flex justify-center">
                        <p className="font-montserrat md:text-[17px] sm:text-[15px] text-justify sm:hidden md:block">
                          Tips on describing an image in DET. The first step is
                          to begin the explanation with your immediate
                          assessment of the...
                        </p>
                      </div>
                      <div className="md:mt-5">
                        <Link>
                          <span className="font-[600] text-[#3AB7BF] text-[20px] py-2">
                            Read More...
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-auto md:w-[35%] sm:px-2">
              <div className="flex flex-col gap-2  ">
                <div
                  className="bg-[#DDE9F8] md:h-[30rem] sm:h-[15rem] flex flex-col justify-center items-center
                 px-3 rounded-md "
                >
                  <span className="mt-2">
                    <IconListeningAvatar
                      height="md:17rem sm:10rem"
                      width="md:15rem sm:10rem"
                    ></IconListeningAvatar>
                  </span>
                  <h1 className="font-poppins md:text-[22px]  mt-3 sm:text-[15px] font-[700] text-center md:leading-9 text-gray-800">
                    Useful Tips for Listening Section in Duolingo English Test
                  </h1>
                  <div className="md:h-[10rem] sm:h-[2rem]"></div>
                </div>
              </div>
              <div className="h-auto w-full">
                <div className="md:mt-5 sm:block md:hidden text-center">
                  <Link>
                    <span className="font-[600] text-[#3AB7BF] text-[20px] py-2">
                      Read More...
                    </span>
                  </Link>
                </div>
                <div
                  className="md:w-[25%] sm:w-[40%] m-auto bg-[#FFFF] h-auto 
                  md:mt-[-8rem] sm:mt-[-1.5rem] absolute md:ml-4 sm:ml-[5px] shadow-sm rounded-lg
                    md:flex justify-center md:px-2 md:py-2 sm:hidden"
                >
                  <div className="w-[80%] h-full md:px-2 md:py-3 ">
                    <div
                      className="flex flex-col justify-center w-full  items-center m-auto
                     sm:h-[9rem]"
                    >
                      <div className="w-full h-full flex justify-center">
                        <p className="font-montserrat md:text-[17px] sm:text-[15px] text-justify sm:hidden md:block">
                          Take note of each word's unique syllables; some
                          made-up terms might sound very different from the real
                          thing....
                        </p>
                      </div>
                      <div className="md:mt-5">
                        <Link>
                          <span className="font-[600] text-[#3AB7BF] text-[20px] py-2">
                            Read More...
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
