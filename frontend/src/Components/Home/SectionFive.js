import React from "react";
import { ReactComponent as Studentsuccess } from "../../Assets/SVG/StudentSuccess.svg";
import { ReactComponent as Qutation } from "../../Assets/SVG/Quatation.svg";
import IconDummy1 from "../../Assets/Icon/iconDummy1.jpg";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import "./Carousal.css";
import Review from "../Feedback/Review";
import "./SectionFive.css";

export const SectionFive = () => {
  return (
    <div>
      <section className="h-[60%]  mt-[5%] w-full  flex:col justify-center">
        <div className="flex:col justify-center w-full">
          <h1
            className="sm:text-[30px] md:text-[35px] 
           lg:text-[40px]  text-center font-[700]"
          >
            Choose the Level
          </h1>
          <div className="w-full flex justify-center mt-3">
            <p
              className="text-[20px]  md:text-[22px] text-center sm:w-[90%] sm:text-[16px] sm:font-[400]
             font-montserrat lg:w-[60%]"
            >
              From the varieties of easy, medium and hard you can choose the
              difficulty level according to your preference.
            </p>
          </div>
        </div>

        <div className=" w-full flex justify-center mt-[5rem] ">
          <div class="timeline-wrapper sm:w-[90%] lg:w-[60%]">
            <div class="node">
              <h3 className="text-[40px] text-tahiti font-montserrat">Easy</h3>
              <p className="font-montserrat sm:text-[14px] lg:text-[20px] font-[400]">
                In PracticeMania platform you are getting 6000+ question, from
                this 15 - 20% question is in easy section. So if you are new or
                want to start practice from easy question then this section is
                for you. You can choose easy questions in every module when you
                start practice.
              </p>
            </div>
            <div class="node">
              <h3 className="text-[40px] text-tahiti font-montserrat">
                Medium
              </h3>
              <p className="font-montserrat sm:text-[14px] lg:text-[20px] font-[400]">
                In PracticeMania platform you are getting 6000+ question, from
                this 30 - 40% question is in medium section. So if you are
                already practiced easy questions or want to start from medium
                then you can start. You can choose medium questions in every
                module when you start practice.
              </p>
            </div>
            <div class="node">
              <h3 className="text-[40px] text-tahiti font-montserrat">Hard</h3>
              <p className="font-montserrat sm:text-[14px] lg:text-[20px] font-[400]">
                In PracticeMania platform you are getting 6000+ question, from
                this 40 - 50% question is in hard section. So if you are already
                practiced easy and medium questions or want to start direct from
                hard then you can start. You can choose hard questions in every
                module when you start practice.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
