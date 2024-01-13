import React from "react";
import TestItem from "./PassageRC";

export default function PracticeComponentRC({questionAns,title}) {
  
  const {q,a}=questionAns


  return (
    <div className="w-full h-full m-aut font-robotomono mt-5 md:px-4 md:py-2 sm:px-1">
    
        <div className="h-auto w-full sm:mt-0  m-auto">
          <TestItem
           question={q}
           ans={a}
           title={title}
          ></TestItem>
        </div>
    </div>
  );
}
