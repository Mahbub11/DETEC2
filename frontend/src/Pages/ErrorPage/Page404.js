import React from "react";
import Icon404 from "../../Assets/SVG/Icon404";

export default function Page404() {
  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex justify-center m-auto items-center flex-col mt-[7rem]">
        <span>
          <Icon404 height="15rem" width="15rem"></Icon404>
        </span>
        <h1 className="text-[30px] font-poppins font-[700]">Oops! Page Not Found</h1>
      </div>
    </div>
  );
}
