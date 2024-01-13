import React, { useState } from "react";
import { Radio, Button, Modal, Input } from "antd";
import Artical from "../../Components/Articals/Artical";

export default function Articals() {

  const [sectionName,setSectionName] =useState(1)

  const handleSectionModule=(e)=>{
  
    setSectionName(e.target.value)

  }
  return (
    <div className="w-full h-full">
      <div className=" md:w-[90%] sm:w-full h-full m-auto">
        <div className="h-auto w-full px-2 py-2">
          <div className="flex justify-end px-2 py-2">
            <input
              placeholder="Search Text "
              className="px-2 py-2 bg-gray-200 rounded-l-md"
            ></input>
            <button className="bg-[#3AB7BF] px-2 text-white rounded-r-md">Search</button>
          </div>
          <div className="flex justify-between w-full h-auto mt-10">
            <h1 className="text-[25px] font-poppins font-[700]">
              Our Latest Articals
            </h1>
            <div>
              <Radio.Group defaultValue={1} onChange={handleSectionModule} buttonStyle="solid">
                <div className="flex gap-3 sm:flex-wrap font-montserrat">
                  <div className="flex gap-1">
                    <Radio.Button
                      style={{
                        background: sectionName===1 ? "#3AB7BF" : "#FFFF",
                        color: sectionName===1  ? "#FFFF" : "	#000000",
                        fontFamily: "inherit",
                      }}
                      value={1}
                    >
                      DUOLINGO
                    </Radio.Button>
                  </div>
                  <div className="flex gap-1">
                    <Radio.Button
                      style={{
                        background: sectionName===2 ? "#3AB7BF" : "#FFFF",
                        color: sectionName===2 ? "#FFFF" : "	#000000",
                        fontFamily: "inherit",
                      }}
                      value={2}
                    >
                      IELTS
                    </Radio.Button>
                  </div>
                </div>
              </Radio.Group>
            </div>
          </div>

          <div className='h-full w-full  mt-10 grid sm:grid-cols-2 md:grid-cols-4 sm:gap-5
                  lg:gap-5 place-items-center'>
            <Artical></Artical>
            <Artical></Artical>
            <Artical></Artical>
            <Artical></Artical>
            <Artical></Artical>
            <Artical></Artical>

          </div>
        </div>
      </div>
    </div>
  );
}
