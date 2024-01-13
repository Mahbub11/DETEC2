import React, { useEffect, useState } from "react";
import { Collapse } from "antd";

export default function ParaPhase({ sen }) {
  const items = ["in this picture i can see a few students doing school","i can see students going to school in this picture", "in this picture i can see some students attending school",  "in this picture i can see some students going to school",];
  const [showCollapse,setshowCollapse] =useState(false)


  const handleCollapse=()=>{
    setshowCollapse(!showCollapse);
  }

  useEffect(()=>{

  },[showCollapse])

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <h1>{sen}</h1>
        <button onClick={(e)=>handleCollapse()} className="bg-home text-[12px] px-1 py-1 rounded-md">
          Paraphase
        </button>
      </div>
      <div className={`${showCollapse ? 'block': 'hidden'}`}>
        <Collapse
          accordion
          items={[
            {
              key: "1",
              label: "Paraphase List",

              children: items.map((val, i) => {
                return (
                  <div
                    className="cursor-pointer mt-5 h-auto flex flex-col gap-2
                       bg-home/30 rounded-md px-2 py-2"
                  >
                   
                    <p>{val}</p>
                  </div>
                );
              }),
            },
          ]}
        />
      </div>
    </div>
  );
}
