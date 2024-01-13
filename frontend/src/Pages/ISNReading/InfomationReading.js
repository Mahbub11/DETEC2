import React from "react";

export default function InfomationReading() {
  return (
    <div className=" w-[99%] m-auto">
      <div className="h-auto flex flex-col gap-5">
        <div className="flex flex-col px-2 py-2 bg-gray-300/10 shadow-[2px] rounded-sm">
          <h1 className="font-montserrat sm:text-[18px] md:text-[23px] font-[700] underline">
            Section at a Glance
          </h1>
          <div className="px-2 py-2">
            <p className="font-worksans font-[400] sm:text-[16px] md:text-[20px] whitespace-normal tracking-tight">
              Unlike other English Language Proficiency tests where each skill
              has a section, the Duolingo English Test differs as it measures
              your proficiency holistically through subscores: <br></br>
              <br></br>
              <span className="font-[500]">Literacy: Your ability to read and write.</span><br></br>
             <span  className="font-[500]"> Comprehension: Your ability to read and listen.</span> <br></br>
              <span  className="font-[500]">Conversation: Your ability to listen and speak.</span>
              <br></br>
              
               <span  className="font-[500]">Production: Your ability to write and 
              speak.</span>

              <br></br>
              <br></br>
              While reading, writing, speaking, and listening are all crucial
              language abilities, research suggests that combining them might
              better reflect how language is utilized in everyday situations.
              People must engage numerous talents simultaneously to use language
              effectively and naturally, particularly in academic contexts.
              <br></br>
              <br></br>
              In this case, the Duolingo English Test incorporates reading
              skills with the other abilities through various question types
              under the Literacy and Comprehension subscores.<br></br>
              <br></br>
              The independent tasks will require you to complete paragraphs,
              read aloud sentences, or determine the correct English words,
              demonstrating more discursive writing knowledge and language
              skills.<br></br>
              <br></br>
              Unlike the other tests in the DET, you will read a passage and
              then answer questions. Let’s look at the different question types
              that you will encounter in the DET.<br></br>
              <br></br>
            </p>
          </div>
        </div>

       
      </div>
    </div>
  );
}
