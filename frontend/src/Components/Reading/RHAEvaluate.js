import React from "react";
import { useSelector } from "react-redux";

export default function RHAEvaluate({ passage, answer }) {
  const { inputRHA } = useSelector((state) => state.readingInput);


  return (
    <div>
      <div className="text-justify">
        {passage.map((val) => (
          <p className="text-justify">
            {
               
            val.trim() ===  answer.trim() ?  (
              <p >
                <span className="bg-green-400 rounded-sm">{val + "."}</span>
              </p>
            ) : val.trim()=== (inputRHA.trim() ===answer.trim())?(
                <p >
                <span className="bg-green-400 rounded-sm">{val + "."}</span>
              </p>
            ): val+'.'
         
            }

          </p>
        ))}
      </div>
    </div>
  );
}
