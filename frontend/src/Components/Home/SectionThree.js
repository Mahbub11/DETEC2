import React from "react";
import { ReactComponent as Studentsuccess } from "../../Assets/SVG/StudentSuccess.svg";
import Slider from "react-slick";

export const SectionThree = () => {
  var settings = {
    dots: false,
    slidesToShow: 6,
    slidesToScroll: 1,
    infinite: true,
    speed: 300,
    autoplay: true,
    vertical: true,
    arrows: false,
    rtl: true,
  };

  return (
    <div>
      <section className="sm:h-[40%] lg:h-[60%] mt-[20%] w-full  flex:col justify-center">
        <div className="flex:col justify-center w-full">
          <h1
            className="sm:text-[30px] md:text-[35px] 
           lg:text-[40px]  text-center font-[700]"
          >
            Design For Success
          </h1>
          <div className="w-full flex justify-center mt-3">
            <p
              className="text-[20px] md:text-[22px] text-center sm:w-[90%] 
            sm:text-[16px] sm:font-[400] font-montserrat lg:w-[60%]"
            >
              PracticeMania is designed in such a way that you can easily
              practice as many times as you want and achieve your desired score.
            </p>
          </div>
        </div>

        <div className="sm:w-[80%] sm:mt-[-8rem] md:mt-[-5px] lg:w-[60%] flex justify-center m-auto">
          <span className="w-full h-full flex justify-between md:mt-10">
            <Studentsuccess className="w-[30rem] h-[40rem] sm:blur-[1px]"></Studentsuccess>
          </span>
          <div
            className="md:mt-[22rem] lg:mt-[55rem]  
          sm:h-[50%] msm:h-[56%] sm:top-[92rem] xxl:mt-[32rem] 
          xxl:h-[68%] msm:top-[97rem] lg:h-[58%] mt-10  sm:w-[75%] lg:w-[50%] lg:left-[33%]
           sm:left-[23%]  absolute overflow-hidden"
          >
            <Slider {...settings}>
              <div className="bg-tahiti px-4 py-4 rounded-md mt-5">
                <h1 className="text-gray-100  sm:font-[600] font-montserrat text-[20px]">
                  Practice Over 100+ Free Module
                </h1>
              </div>
              <div className="bg-tahiti px-4 py-4 rounded-md mt-5">
                <h1 className="text-gray-100  sm:font-[600] font-montserrat text-[20px]">
                  Differnet Types of Learning Curve
                </h1>
              </div>
              <div className="bg-tahiti px-4 py-4 rounded-md mt-5">
                <h1 className="text-gray-100  sm:font-[600] font-montserrat text-[20px]">
                  New Questions added every Week
                </h1>
              </div>
              <div className="bg-tahiti px-4 py-4 rounded-md mt-5">
                <h1 className="text-gray-100  sm:font-[600] font-montserrat text-[20px]">
                  Live Result
                </h1>
              </div>
              <div className="bg-tahiti px-4 py-4 rounded-md mt-5">
                <h1 className="text-gray-100  sm:font-[600] font-montserrat text-[20px]">
                  Easy to Practice
                </h1>
              </div>
              <div className="bg-tahiti px-4 py-4 rounded-md mt-5">
                <h1 className="text-gray-100  sm:font-[600] font-montserrat text-[20px]">
                  User Friendly
                </h1>
              </div>
              <div className="bg-tahiti px-4 py-4 rounded-md mt-5">
                <h1 className="text-gray-100  sm:font-[600] font-montserrat text-[20px]">
                  Practice Over 100+ Free Module
                </h1>
              </div>
            </Slider>
          </div>
        </div>
      </section>
    </div>
  );
};
