import React from "react";
import { vocList } from "../../utils/VocabularyList";
import { useDispatch } from "react-redux";
import { getWordDetails } from "../../redux/slices/disctionary";

export default function NotesVoc() {

    const dispatch= useDispatch()


    const handleMeaning = (val) => {
        dispatch(getWordDetails(val.target.textContent))
      };
  return (
    <div className=" w-[99%] m-auto">
      <div className="h-auto flex flex-col gap-5 first-letter:bg-gray-300/10 shadow-[2px] rounded-sm px-2 py-2">
        <div className="flex flex-col  ">
          <h1 className="font-montserrat sm:text-[18px] md:text-[23px] font-[700] underline">
            English Test Vocabulary Wordlist
          </h1>
          <div className="px-2 py-2">
            <p className="mt-4 font-worksans font-[400] sm:text-[16px] md:text-[20px] whitespace-normal tracking-tight">
              Many individuals recommend reading books, magazines, and
              television shows to learn new words. <br></br> <br></br>
            </p>
          </div>
        </div>

        <div>
        
          <div className="w-[95%] m-auto ">
            {
                vocList.map(val=>{
                    return(
                        <div className="mt-5">
                          <h1 className="text-center font-worksans font-[500] text-[23px]">{val.area}</h1>
                          <div className="px-2 py-2  gap-3 flex flex-wrap sm:w-full md:w-[70%] m-auto">
                            {
                                val.word.map(val=>{
                                    return(
                                        <div>
                                            <span className="sm:hover:text-blue-500 cursor-pointer"  onClick={handleMeaning} ><p className="bg-gray-300/40 md:hover:text-blue-500 rounded-md px-2 py-1 font-worksans">{val}</p></span>
                                        </div>
                                    )
                                })
                            }

                          </div>

                        </div>
                    )
                })
            }
          </div>
        </div>
      </div>
    </div>
  );
}
