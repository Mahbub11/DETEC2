import React from "react";
import { CiCircleFilled, UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <div className="flex flex-col justify-center gap-3 h-full overflow-hidden w-full mt-[-2rem]">
      <div className=" h-auto w-[30%] self-center sm:hidden md:block">
        <div className="px-2 py-2 m-auto h-full w-full ">
          <div className="h-full w-full  ">
            <div className="flex flex-col justify-center items-center">
              <div className="mt-2 self-center ml-3">
                <h1 className="text-[22px] font-poppins font-[600] text-center">
                  Mahbub Rahim
                </h1>
                <h1 className="text-[20px] font-montserratfont-[600] text-center">
                  Email: mahbub@gmail.com
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" h-full md:w-[80%] sm:w-full flex justify-center m-auto sm:mt-[5rem] md:mt-0">
        <div className="h-full w-full m-auto">
          <div className="bg-white flex justify-center h-full w-full m-auto items-center">
            <div className="flex gap-2 justify-around h-full w-full px-2 py-2 items-center">
              <div className=" w-[70%] h-[90%]">
                <div className="flex flex-col justify-start ml-[2rem] gap-3">
                  <h1 className="font-poppins text-[23px] font-[500] underline">
                    Personal Information
                  </h1>
                  <div className="flex flex-col gap-1 font-poppins text-[18px]">
                    <h1>Name: Mahbub Rahim</h1>
                    <h1>Email: mahbubrahim@hotmail.com</h1>
                    <h1>Joined Date: 22 Nov 2023</h1>
                    <h1>Phone : 0123333433</h1>
                    <h1>Address: Dhaka,Bangladesh</h1>
                    <h1>Subscription: Hobby</h1>
                  </div>

                  <div className="mt-5">
                    <h1 className="font-poppins text-[23px] font-[500] underline">
                      Progress Detailes
                    </h1>
                    <div className="flex flex-col gap-1 font-poppins text-[18px]">
                      <h1 className="mt-2">Total Practiced: 120</h1>
                      <h1>Average Score: 110-160</h1>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className=" w-[30%] h-full self-center sm:hidden md:block
              m-auto"
              >
                <div className=" flex flex-col justify-center h-full gap-2">
                  <Link
                    to={"/auth/signin"}
                    className="bg-[#3AB7BF] px-5 py-3 mt-1 
                       text-[15px] rounded-md text-white font-[700] w-[70%] text-center"
                  >
                    Subscribe Now
                  </Link>
                  <Link
                    to={"/auth/signin"}
                    className="bg-[#3AB7BF] px-5 py-3 mt-1 
                       text-[15px] rounded-md text-white font-[700] w-[70%] text-center"
                      >
                    Pricing
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="h-full m-auto flex w-full">
          <div className="md:h-auto sm:h-[25rem] w-full rounded-md">
            <div className="md:w-[90%] sm:w-full h-[90%] flex justify-center  m-auto">
              <div className="h-full w-full px-2 py-2 flex justify-center flex-col gap-3">
                <h1 className="md:text-[25px] sm:text-[17px] font-montserrat text-center font-[500]">
                  Todays Practice VS Correctness
                </h1>
                <div className="h-[80%] w-full border-[1px] border-gray-700 md:px-2 rounded-md"></div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
