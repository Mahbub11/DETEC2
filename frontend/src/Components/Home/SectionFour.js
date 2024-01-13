import React from "react";
import { ReactComponent as Studentsuccess } from "../../Assets/SVG/StudentSuccess.svg";
import { ReactComponent as Qutation } from "../../Assets/SVG/Quatation.svg";
import IconDummy1 from "../../Assets/Icon/iconDummy1.jpg";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import "./Carousal.css";
import Review from "../Feedback/Review";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

export const SectionFour = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  return (
    <div>
      <section className="h-[60%] sm:mt-[20%] lg:mt-[10%] w-full  flex:col justify-center">
      <div className="flex:col justify-center w-full">
          <h1 className="sm:text-[30px] md:text-[35px] 
           lg:text-[40px]  text-center font-[700]">
            Reviews
          </h1>
          <div className="w-full flex justify-center mt-3">
            <p className=" md:text-[22px] text-[20px] text-center sm:w-[90%] sm:text-[16px] 
            sm:font-[400] font-montserrat lg:w-[60%]">
              Your review is very important to us which will give us more encouragement so
that we can raise the quality of PracticeMania even more.
            </p>
          </div>
        </div>

        <div className="w-full flex justify-center sm:mt-[2rem] lg:mt-[5rem]">
          <div className="embla w-[70%] " ref={emblaRef}>
            <div className="lg:w-[45%] sm:w-full flex">
             
              <Review></Review>
              <Review></Review>
              <Review></Review>
              <Review></Review>
              <Review></Review>
              <Review></Review>
              <Review></Review>
              <Review></Review>
              <Review></Review>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
