import React from "react";
import { ReactComponent as Qutation } from "../../Assets/SVG/Quatation.svg";
import IconDummy2 from "../../Assets/Icon/iconDummy2.jpg";

export default function Review() {
  return (
    <div className="embla__slide !md:h-[22rem] !sm:h-[21rem] lg:h-[15rem]">
      <div className="flex justify-center">
        <div className="flex:col justify-around">
          <div className="px-4 mt-3">
            <span>
              <Qutation className="fill-modt w-[3rem] h-[3rem]"></Qutation>
            </span>
            <p className="text-midnight px-2 py-2 font-montserrat font-[500]">
              Lorem ipsum dolor sit amet Lorem ipsum dolor si.t ametLorem ipsum
              dolor sit amet Lorem ipsum dolor sit amet.
            </p>
          </div>

          <div className="h-full w-full flex mt-5 px-4">
            <img
              className="w-[4rem] h-[4rem] rounded-full"
              src={IconDummy2}
              alt="icondummy1"
            ></img>
            <div className="mt-[8px] ml-4">
              <h1 className="text-[20px] font-robotomono text-midnight">
                Mahbub Rahim
              </h1>
              <p className="text-modt">Dhaka</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
