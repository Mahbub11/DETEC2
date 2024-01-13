import React from "react";
import { useSelector } from "react-redux";
import SenErrorContainer from "./SenErrorContainer";

export default function EVpage({error,userInputSen}) {

  const text =
    "It has raining since morning.I needs to finish paragraph.I am very enthustic about football";
  const error1 = [
    {
      "id": "e1783293556",
      "offset": 7,
      "length": 7,
      "description": {
          "en": "Did you mean “been raining”?"
      },
      "bad": "raining",
      "better": [
          "been raining"
      ],
      "type": "grammar"
  },
  {
      "id": "e1074103495",
      "offset": 32,
      "length": 5,
      "description": {
          "en": "Did you mean “need”?"
      },
      "bad": "needs",
      "better": [
          "need"
      ],
      "type": "grammar"
  },
  {
      "id": "e107140458",
      "offset": 48,
      "length": 10,
      "description": {
          "en": "Did you mean “this paragraph.”?"
      },
      "bad": "paragraph.",
      "better": [
          "this paragraph."
      ],
      "type": "grammar"
  },
  {
      "id": "e126227853",
      "offset": 69,
      "length": 9,
      "description": {
          "en": "Possible spelling mistake"
      },
      "bad": "enthustic",
      "better": [
          "enthusiastic",
          "enthused",
          "atheistic",
          "pantheistic",
          "animistic",
          "anapestic"
      ],
      "type": "spelling"
  },
  {
      "id": "e1007202918",
      "offset": 85,
      "length": 8,
      "description": {
          "en": "Incorrect punctuation."
      },
      "bad": "football",
      "better": [
          "football."
      ],
      "type": "punctuation"
  }
  ];

  let temp = [];
  var offset = [];

  // push offset
  Object.entries(error? error :{}).map(val=>{
    offset.push(val[1].offset)

  }) 
  userInputSen?.split("").map((val, i) => {
    if (offset.includes(i)) {
      temp.push(`${i}#${val}`);
    } else {
      temp.push(val);
    }
  });



  return (
    <div className="h-auto w-full px-5 py-5 ">
      <div className="border-[2px] rounded-md font-poppins px-3 py-3 mt-1 w-[95%] m-auto h-[20rem] overflow-y-scroll">
        <div className="flex flex-wrap gap-1 text-[20px] m-auto  ">
          {temp
            .join()
            .replace(/,/g, "")
            .split(" ")
            .map((val, i) => {
              if (val.match(/[_\#]/)) {
                const str = val.split("#");

                return Object.entries(error).map((val) => {
                  if (parseInt(str[0]) === val[1].offset) {
                    return (
                      <div>
                        <SenErrorContainer
                        senerror={str[1]}
                          key={i}
                          data={val[1]}
                        ></SenErrorContainer>
                      </div>
                    );
                  }
                });
              } else {
                return <div>{val}</div>;
              }
            })}
        </div>
      </div>

  
    </div>
  );
}
