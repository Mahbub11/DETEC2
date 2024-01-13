import React, { useState } from "react";
import { EyeOutlined } from "@ant-design/icons";
import { IconEye } from "../../Assets/SVG/IconEye";
import { Radio, Button, Modal } from "antd";
import IconCommingSoon from "../../Assets/SVG/IconCommingSoon";
import { duolingoMaterial } from "../../utils/MaterialsData";

export default function Duolingo() {
  const [isOpen, setIsOpen] = useState(false);
  const [template, setTemplate] = useState({});

  const handlePreview = () => {
    setTemplate(duolingoMaterial[0]);
    setIsOpen(true);
  };



  return (
    <div className="px-2 py-2 md:w-[80%] sm:w-[95%] h-auto m-auto  mt-10 bg-gradient-to-b from-transparent
     to-blue-100 rounded-sm ">
      <div className="w-full flex flex-col gap-3 justify-center">
        <h1 className="text-center text-[30px] font-montserrat font-[600] text-gray-600">
          Materials
        </h1>
        <div className="mr-5 self-end">
          {/* <Radio.Group
       
      */}

          <Radio.Group defaultValue={1} buttonStyle="solid">
            <div className="flex gap-[2px] font-montserrat">
              <Radio.Button
                style={{
                  background: "#B4D6FD",
                  color: "#000000",
                  fontFamily: "inherit",
                }}
                value={1}
              >
                DUOLINGO
              </Radio.Button>
              <div className="flex gap-1">
                <Radio.Button
                  style={{
                    background: "#B4D6FD",
                    color: "#000000",
                    fontFamily: "inherit",
                  }}
                  value={2}
                >
                  IELTS
                </Radio.Button>
                <span className="mt-[-1rem]">
                  <IconCommingSoon width="2rem" height="2rem"></IconCommingSoon>
                </span>
              </div>
            </div>
          </Radio.Group>
        </div>
        <div className=" flex flex-col gap-10 text-gray-600 md:w-[80%] sm:w-[95%] m-auto md:mt-[3rem] sm:mt-4">
          <div className="px-2 py-2">
            <h1 className="font-poppins text-[25px] border-b-[3px] text-gray-800">
              Latest Materials
            </h1>
            <div className="mt-5 flex justify-between px-2 md:mt-[2rem] sm:mt-4">
              <h1 className=" text-[20px] ">DET Official Guide</h1>
              <button className="border-[2px] bg-[#3AB7BF] px-2 py-2 rounded-md text-white">
                Preview
              </button>
            </div>
          </div>

          <div className="px-2 py-2 font-montserrat">
            <h1 className="font-poppins text-[25px] border-b-[3px] text-gray-800">
              Best Scoring Templates
            </h1>
            <div className="md:mt-[2rem] sm:mt-4">
              <div className="mt-5 flex justify-between px-2 md:mt-[1rem] sm:mt-2">
                <h1 className=" text-[20px] ">
                  Speak About the Photo Templates
                </h1>
                <button
                  onClick={(e) => handlePreview(1)}
                  className=" px-2 py-2 rounded-md "
                >
                  <IconEye
                    className="shadow-md"
                    height="2rem"
                    width="2rem"
                  ></IconEye>
                </button>
              </div>
              <div className="flex justify-between px-2  sm:mt-2">
                <h1 className=" text-[20px] ">
                  Write About the Photo Templates
                </h1>
                <button
                  onClick={(e) => handlePreview(2)}
                  className=" px-2 py-2 rounded-md "
                >
                  <IconEye
                    className="shadow-md"
                    height="2rem"
                    width="2rem"
                  ></IconEye>
                </button>
              </div>
              <div className="mt-5 flex justify-between px-2 sm:mt-1">
                <h1 className=" text-[20px] ">Read Then Write Templates</h1>
                <button
                  onClick={(e) => handlePreview(3)}
                  className=" px-2 py-2 rounded-md "
                >
                  <IconEye
                    className="shadow-md"
                    height="2rem"
                    width="2rem"
                  ></IconEye>
                </button>
              </div>
              <div className="mt-5 flex justify-between px-2  sm:mt-2">
                <h1 className=" text-[20px] ">Writing Sample Templates</h1>
                <button className=" px-2 py-2 rounded-md ">
                  <IconEye
                    className="shadow-md"
                    height="2rem"
                    width="2rem"
                  ></IconEye>
                </button>
              </div>
              <div className="mt-5 flex justify-between px-2 sm:mt-2">
                <h1 className=" text-[20px] ">Read Then Speak Templates</h1>
                <button className=" px-2 py-2 rounded-md ">
                  <IconEye
                    className="shadow-md"
                    height="2rem"
                    width="2rem"
                  ></IconEye>
                </button>
              </div>
              <div className="mt-5 flex justify-between px-2 sm:mt-2">
                <h1 className=" text-[20px] ">
                  Speak About the Photo Templates
                </h1>
                <button className=" px-2 py-2 rounded-md ">
                  <IconEye
                    className="shadow-md"
                    height="2rem"
                    width="2rem"
                  ></IconEye>
                </button>
              </div>
              <div className="mt-5 flex justify-between px-2  sm:mt-2">
                <h1 className=" text-[20px] ">Listen Then Speak Templates</h1>
                <button className=" px-2 py-2 rounded-md ">
                  <IconEye
                    className="shadow-md"
                    height="2rem"
                    width="2rem"
                  ></IconEye>
                </button>
              </div>
            </div>
          </div>

          <div>
            <Modal
              open={isOpen}
              title=""
              onCancel={(e) => setIsOpen(false)}
              footer={false}
            >
              <div className="w-full h-auto m-auto mt-5 ">
                <div className="px-2 py-2">
                  <h1 className="font-poppins text-[20px]">{template.title}</h1>
                  <div className="md:mt-[2rem] sm:mt-4 px-2 py-1 w-[80%] m-auto">
                    <ul className="list-disc font-montserrat flex gap-3 flex-col">
                      {template?.templates?.map((val) => {
                        return <li>{val}</li>;
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}
