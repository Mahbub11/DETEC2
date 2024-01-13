import React from "react";
import { SectionFive } from "../../Components/Home/SectionFive";
import { SectionFour } from "../../Components/Home/SectionFour";
import { SectionThree } from "../../Components/Home/SectionThree";
import IconHomeBannar from "../../Assets/SVG/IconHomeBannar";
import IconHomeBannarMobile from "../../Assets/SVG/IconHomeBannarMobile";
import { Link } from "react-router-dom";
import { SectionLatestArticals } from "../../Components/Home/SectionLatestArticals";

export default function HomePage() {
  return (
    <div className={`flex:col justify-center w-full overflow-hidden`}>
      <section className="w-full h-full sm:mt-[1rem]  m-1 md:mt-[10rem]">
        <div className="w-[90%] m-auto sm:hidden md:flex justify-around">
          <div className="w-[70%]">
            <div className="items-center m-auto px-2 w-[70%] tracking-wider">
              <h1 className="text-[40px] font-[700]">
                <span className="text-[#3AB7BF]">AI </span>
                Powered English{" "}
                <span className="text-[#3AB7BF]">Proficiency</span> Test
                <span className="text-[#3AB7BF]"> Platform!</span>
              </h1>
              <p className="mt-5 text-[20px] font-montserrat">
                With our infinite practice platform, you can raise your Any
                English Test score. Start for FREE right now to raise your
                score.
              </p>

              <div className="mt-5">
                <Link
                  to={"duolingo/module/vocabulary"}
                  className="bg-[#3AB7BF] px-3 py-2 mt-5 text-[15px] 
              rounded-md text-white font-[700]"
                >
                  Let's Practice
                </Link>
              </div>
            </div>
          </div>

          <div className="w-[50%] mt-[-5rem] drop-shadow-md">
            <IconHomeBannar height="30rem" width="30rem"></IconHomeBannar>
          </div>
        </div>

        <div className="m-auto sm:flex justify-center w-full md:hidden">
          <div
            className="w-full m-auto flex justify-center
           drop-shadow-sm mr-2 "
          >
            <IconHomeBannarMobile
              className=" m-auto opacity-50"
              height="auto"
              width="355px"
            ></IconHomeBannarMobile>
          </div>

          <div className="absolute  w-[80%] right-0 mt-5 flex flex-col justify-end items-end mr-5">
            <div className=" px-2 w-[75%] tracking-wider">
              <h1 className="text-[18px] font-[700] self-end">
                A Total <span className="text-[#3AB7BF]">Solution</span> For
                Your English Proficiency{" "}
                <span className="text-[#3AB7BF]">Test !</span>
              </h1>

              <div className="mt-10">
                <Link
                  to={"duolingo/module/vocabulary"}
                  className="bg-[#3AB7BF] px-3 py-2 mt-5 text-[15px] rounded-md text-white font-[700] ml-1"
                >
                  Let's Practice
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="h-[60%] mt-[15%] w-full  flex:col justify-center">
        <div className="flex:col justify-center w-full">
          <h1
            className="sm:text-[30px] md:text-[35px] 
           lg:text-[40px]  text-center font-[700]"
          >
            Select Module to Practice
          </h1>
          <div className="w-full flex justify-center">
            <p
              className="mt-2 text-[20px] md:text-[22px] text-center sm:w-[90%] 
            sm:text-[16px] sm:font-[400] font-montserrat lg:w-[60%]"
            >
              You will get 6000+ questions in reading, writing, speaking and listening. Start from your selected module to raise proficiency module
            </p>
          </div>
        </div>

        <div className="sm:w-[90%] lg:w-[90%] flex sm:justify-around justify-center m-auto mt-[5%]">
          <div
            className="grid sm:grid-cols-2 md:grid-cols-4 sm:gap-5
                  lg:gap-5 place-items-center"
          >
            <div className=" md:h-auto md:w-[18rem] sm:h-auto sm:w-auto rounded-md">
              <div className="w-[90%] m-auto  flex flex-col justify-start h-full bg-[#C0DBFC] rounded-md">
                <div>
                  <h1 className="text-[30px] text-center mt-5 font-[600]">
                    Reading
                  </h1>
                </div>

                <p className="mt-2 px-5 font-montserrat text-justify text-ellipsis ">
                  The Duolingo English Test integrates reading skills with other
                  abilities
                  <span className="sm:hidden md:block">
                    through Literacy and Comprehension subscores, requiring
                    reading and answering questions,...
                  </span>
                </p>
                <a
                  href="/duolingo/reading"
                  className="cursor-pointer text-center mt-3 text-[18px] font-[500]
                    drop-shadow-md py-2"
                >
                  Read More...
                </a>
              </div>

              <div className="sm:mt-5 md:mt-[2rem] m-auto w-min">
                <Link
                  to={"/duolingo/module/reading"}
                  className="flex justify-center px-5 py-2 rounded-md
                   font-[600] text-white m-auto bg-[#3AB7BF]"
                >
                  <h1>Practice</h1>
                </Link>
              </div>
            </div>

            <div className=" md:h-auto md:w-[18rem] sm:h-auto sm:w-auto rounded-md">
              <div className="w-[90%] m-auto  flex flex-col justify-start h-full bg-[#C0DBFC] rounded-md">
                <div>
                  <h1 className="text-[30px] text-center mt-5 font-[600]">
                    Writing
                  </h1>
                </div>

                <p className="mt-2 px-5 font-montserrat text-justify text-ellipsis ">
                  The Duolingo writing example questions have three subtasks.
                  <span className="sm:hidden md:block">
                    "Write About the Photo," "Read then Write," and "Writing
                    Sample" are some of them...
                  </span>
                </p>
                <a
                  href="/duolingo/writing"
                  className="cursor-pointer text-center mt-3 text-[18px] font-[500]
                    drop-shadow-md py-2 "
                >
                  Read More...
                </a>
              </div>

              <div className="sm:mt-5 md:mt-[2rem] m-auto w-min">
                <Link
                  to={"/duolingo/module/writing"}
                  className="flex justify-center px-5 py-2 rounded-md
                   font-[600] text-white m-auto bg-[#3AB7BF]"
                >
                  <h1>Practice</h1>
                </Link>
              </div>
            </div>

            <div className=" md:h-auto md:w-[18rem] sm:h-auto sm:w-auto rounded-md">
              <div className="w-[90%] m-auto  flex flex-col justify-start h-full bg-[#C0DBFC] rounded-md ">
                <div>
                  <h1 className="text-[30px] text-center mt-5 font-[600]">
                    Speaking
                  </h1>
                </div>

                <p className="mt-2 px-5 font-montserrat text-justify text-ellipsis ">
                  The Duolingo English Test (DET) consists of four main
                  categories
                  <span className="sm:hidden md:block">
                    each designed to evaluate a different aspect of speaking
                    English. There are four.....
                  </span>
                </p>
                <a
                  href="/duolingo/speaking"
                  className="cursor-pointer text-center mt-3 text-[18px] font-[500]
                    drop-shadow-md  py-2"
                >
                  Read More...
                </a>
              </div>

              <div className="sm:mt-5 md:mt-[2rem] m-auto w-min">
                <Link
                  to={"/duolingo/module/speaking"}
                  className="flex justify-center px-5 py-2 rounded-md
                   font-[600] text-white m-auto bg-[#3AB7BF]"
                >
                  <h1>Practice</h1>
                </Link>
              </div>
            </div>

            <div className=" md:h-auto md:w-[18rem] sm:h-auto sm:w-auto rounded-md">
              <div className="w-[90%] m-auto  flex flex-col justify-start h-full bg-[#C0DBFC] rounded-md ">
                <div>
                  <h1 className="text-[30px] text-center mt-5 font-[600]">
                    Listening
                  </h1>
                </div>

                <p className="mt-2 px-5 font-montserrat text-justify text-ellipsis ">
                  The following question types will be utilized to assess your
                  listening
                  <span className="sm:hidden md:block">
                    comprehension during the less than hour- long Duolingo
                    English test.By click more you can read full
                  </span>
                </p>
                <a
                  href="/duolingo/listening"
                  className="cursor-pointer text-center mt-3 text-[18px] font-[500]
                    drop-shadow-md py-2"
                >
                  Read More...
                </a>
              </div>

              <div className="sm:mt-5 md:mt-[2rem] m-auto w-min">
                <Link
                  to={"/duolingo/module/listening"}
                  className="flex justify-center px-5 py-2 rounded-md
                   font-[600] text-white m-auto bg-[#3AB7BF]"
                >
                  <h1>Practice</h1>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionThree></SectionThree>
      <SectionFive></SectionFive>
      <SectionLatestArticals></SectionLatestArticals>
      <SectionFour></SectionFour>
    </div>
  );
}
