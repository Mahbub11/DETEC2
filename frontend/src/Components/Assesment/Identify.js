import React, { useEffect, useState } from "react";
import ShowSen from "./ShowSen";
import { Collapse } from "antd";
import IconWritingSign from "../../Assets/SVG/IconWritingSign";
import IconBxBrain from "../../Assets/SVG/IconBxBrain";

function Identify({ sen, error, index, correctSen }) {

  console.log(error)

  const [errorIndex, setErrorIndex] = useState([error]);
  const [redIndex, setRedIndex] = useState([]);
  const [correctWord, setCorrectWord] = useState([{}]);
  const [sentence, setSentence] = useState(sen);


  useEffect(() => {
    error.map((val, index) => {
      setRedIndex((prev) => [...prev, val[2]]);
      setCorrectWord((state) => ({
        ...state,
        [val[6]]: val[4],
      }));
    });
  }, []);



  const handleEdit = (start1, start2, end1, end2) => {
    const newData23 = redIndex.filter((val) => val !== start1);
    const newData = newData23.filter((val) => val !== start2);
    console.log(newData);
    setRedIndex(newData);

    let newData1 = [];
    sentence.split(" ").map((val, i) => {
      newData1.push(val);
    });

    //    console.log(correctWord[start2])
    //    correctWord[start2].includes('.') ?   newData1[start2] = correctWord[start2] : newData1[start1] = correctWord[start1]
    newData1[start2] = correctWord[start2];
    // if(correctWord[start1].includes('.')){
    //     console.log('1st')
    //      newData1[start1] = correctWord[start1];
    // }else{

    // }
    const fiexed = newData1.join(" ");
    console.log(fiexed);

    setSentence(fiexed);
  };
  //  console.log(mistakeIndex)

  return (
    <div className="flex gap-3 font-montserrat ">
      <div className="flex gap-2 text-[17px] flex-col ">
        <h1 className="flex gap-2 flex-wrap mt-3">
          <span className="bg-home/40 px-1 py-1 rounded-md shadow-sm">
            <IconWritingSign></IconWritingSign>
          </span>
          <ShowSen
            sen={sentence}
            correctWord={correctWord}
            correctSen={correctSen}
            redIndexList={redIndex}
          ></ShowSen>
        </h1>
        <h1 className="flex gap-2 flex-wrap">
          <span className="bg-home/40 px-1 py-1 rounded-md shadow-sm">
            <IconBxBrain></IconBxBrain>
          </span>
          <p className="text-green-500 ">{correctSen}</p>
        </h1>

        <div className="">
          <div className="w-[20rem]">
            {errorIndex[0].length > 0 ? (
              <div>
                <Collapse
                  accordion
                  items={[
                    {
                      key: "1",
                      label: "Explanations",

                      children: errorIndex[0].map((val, i) => {
                        return (
                          <div
                            onClick={(e) => handleEdit(val[6], val[5])}
                            className="cursor-pointer mt-5 h-auto flex flex-col gap-2
                       bg-home/30 rounded-md px-2 py-2"
                          >
                            <h1>
                              {" "}
                              <span className="bg-home rounded-md w-auto px-[7px] py-[2px]">
                                {++i}
                              </span>
                            </h1>
                            <p>Mistake Of: {val[0]}</p>
                            <p>
                              Replaced By: {val[4].length === 0 ? "--" : val[4]}
                            </p>
                       
                          </div>
                        );
                      }),
                    },
                  ]}
                />
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>

      <div></div>
    </div>
  );
}

export default Identify;
