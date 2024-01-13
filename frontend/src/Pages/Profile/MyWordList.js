import React, { useEffect, useState } from "react";
import { Radio, Button, Modal, Skeleton } from "antd";
import { vocList } from "../../utils/VocabularyList";
import { useDispatch, useSelector } from "react-redux";
import { deleteWord, getWordDetails, getWordList } from "../../redux/slices/disctionary";
import IconCross from "../../Assets/SVG/IconCross";

export default function MyWordList() {

  const [crossShow, setCrossShow] = useState(false);
  const [flag, setFlag] = useState(5);
  const [busy, isBusy] = useState(true);
  const { wordList, wordCList, wordLList, wordDList, wordSList } = useSelector(
    (state) => state.disctionary
  );
  const [currentList,setCurrentList] = useState()

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWordList());
   
    if(flag===1){
      setCurrentList(wordCList);
    }else if(flag===2){
      setCurrentList(wordDList);

    }else if(flag===3){
      setCurrentList(wordLList);
      
    }else if(flag===4){
      setCurrentList(wordSList);
    }else{
       setCurrentList(wordList);
    }
    isBusy(false);
  }, [busy,flag]);

  const handleMeaning = (val) => {
    dispatch(getWordDetails(val.target.textContent));
  };

  const handleWordRemove = () => {
    setCrossShow(!crossShow);
  };
  const handleRemoveWord=(e)=>{

    const data={
      flag,
      data:e
    }
    dispatch(deleteWord(data))
    setFlag('a')
  }

  return (
    <div>
      {busy ? (
        <Skeleton></Skeleton>
      ) : (
        <div className=" h-full w-full md:px-5 md:py-4 sm:mt-[1rem] md:mt-0 ">
          <div className="md:flex md:flex-row sm:flex sm:flex-col justify-between md:gap-5 h-full w-full">
            <div className="h-full md:w-[80%] sm:w-full bg-home/20 flex justify-center m-auto items-center sm:px-2 sm:py-2">
              <div className=" md:px-2 md:py-2 md:h-full sm:h-[20rem] w-full ">
                <div className=" h-full w-full flex flex-col gap-3 justify-center">
                  <div>
                    <h1 className="text-center text-[20px] font-poppins font-[500] px-2 py-2 underline">
                      Word List <span className="font-[600]"></span>
                    </h1>
                    <div
                      className={`${
                        flag === "a" ? "hidden" : "flex"
                      } justify-end w-full`}
                    >
                      <button
                        onClick={handleWordRemove}
                        className="bg-home text-gray-800 self-end  px-1 py-1 rounded-md font-poppins"
                      >
                        Remove Word
                      </button>
                    </div>
                  </div>
                  <div className="h-[90%] w-full md:px-2 md:py-2  flex flex-wrap gap-2">
                    {currentList?.map((val) => {
                      return (
                        <span
                          className="sm:hover:text-blue-500 cursor-pointer"
                        
                        >
                          <div className="flex gap-2">
                            <p   onClick={handleMeaning} className="bg-gray-300/40 md:hover:text-blue-500 rounded-md px-2 py-1 font-worksans">
                              {val}
                            </p>

                            <span onClick={()=>handleRemoveWord(val)}
                              className={`${
                                crossShow ? "block" : "hidden"
                              } items-end  bg-home  ml-[-.5rem] drop-shadow-sm px-2 py-2`}
                            >
                              <IconCross
                             
                                height=".7rem"
                                width=".7rem"
                              ></IconCross>
                            </span>
                          </div>
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="h-min w-auto  md:px-5 md:py-5 sm:px-2 sm:py-4">
              <Radio.Group
                onChange={(e) => setFlag(e.target.value)}
                defaultValue="a"
                buttonStyle="solid"
              >
                <div className="md:flex md:flex-col sm:flex sm:flex-row sm:flex-wrap gap-3 font-montserrat">
                  <Radio.Button
                    style={{
                      background: flag === 5 ? "#3AB7BF" : "#FFFF",
                      color: flag === 5 ? "#FFFF" : "	#000000",
                      fontFamily: "inherit",
                    }}
                    value={5}
                  >
                    ALL
                  </Radio.Button>
                  <div className="flex gap-1">
                    <Radio.Button
                      style={{
                        background: flag ===1 ? "#3AB7BF" : "#FFFF",
                        color: flag ===1 ? "#FFFF" : "	#000000",
                        fontFamily: "inherit",
                      }}
                      value={1}
                    >
                      COMPLETED
                    </Radio.Button>
                  </div>

                  <div className="flex gap-1 ">
                    <Radio.Button
                      style={{
                        background: flag === 2 ? "#3AB7BF" : "#FFFF",
                        color: flag === 2 ? "#FFFF" : "	#000000",
                        fontFamily: "inherit",
                      }}
                      value={2}
                    >
                      DIFFICULT
                    </Radio.Button>
                  </div>

                  <div className="flex gap-1">
                    <Radio.Button
                      style={{
                        background: flag === 3 ? "#3AB7BF" : "#FFFF",
                        color: flag === 3 ? "#FFFF" : "	#000000",
                        fontFamily: "inherit",
                        width: "100%",
                        height: "100%",
                      }}
                      value={3}
                    >
                      LATER PRACTICE
                    </Radio.Button>
                  </div>
                  <div className="flex gap-1">
                    <Radio.Button
                      style={{
                        background: flag === 4 ? "#3AB7BF" : "#FFFF",
                        color: flag === 4 ? "#FFFF" : "	#000000",
                        fontFamily: "inherit",
                      }}
                      value={4}
                    >
                      SPEEL CHECK
                    </Radio.Button>
                  </div>
                </div>
              </Radio.Group>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
