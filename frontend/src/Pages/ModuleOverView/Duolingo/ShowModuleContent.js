import React from "react";
import logo from "../../../Assets/pictures/duolingoModule/read-and-complete-duolingo-english-test@2x.png";

export default function ShowModuleContent({ data }) {
  return (
    <div className="sm:w-[90%] md:w-[80%] m-auto mt-10">
      {/* Header */}
      <section>
        <div className="flex flex-col gap-3">
          <div className="text-center uppercase">
            <h1 className="text-[40px] font-[600]">{data.heading}</h1>
            <p className="text-[20px] font-[500] underline">
              {data.subHeading}
            </p>
          </div>
          <p className="mt-5 sm:text-[17px] md:text-[20px] font-montserrat text-justify">
            {data.subPara}
          </p>
        </div>

        <div className="mt-10">
          {data.content.map((val) => {
            return (
              <div className="flex flex-col mt-[5rem]">
                <div className="ml-4">
                  <ul className="list-disc">
                    <li className="font-[600] sm:text-[20px] md:text-[22px]">
                      {val.heading}
                    </li>
                  </ul>
                </div>
                <p className="font-montserrat sm:text-[17px] md:text-[20px] text-justify">
                  {val.subHeading}
                </p>

                <div className="self-center mt-[5rem] flex justify-center">
                  <img
                    className="md:w-[60%] sm:w-[95%] h-auto self-center"
                    src={logo}
                  ></img>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
