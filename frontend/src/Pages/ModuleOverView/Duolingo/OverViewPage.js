import React from "react";
import ShowModuleContent from "./ShowModuleContent";
import { moduledata } from "../../../utils/ModuleTextData";

export default function OverViewPage({id}) {

    const data= moduledata[--id]
   
  return (
   <div>
    <div className="blur-sm h-screen w-screen absolute top-0 "></div>
    <ShowModuleContent data={data}></ShowModuleContent>
   </div>
  );
}
