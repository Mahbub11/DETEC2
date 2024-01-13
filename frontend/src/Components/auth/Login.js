import React from "react";

export default function Login() {
  return (
    <div className="w-[60%] sm:w-[90%]  m-2 sm:m-auto sm:mt-20 lg:scale-100 md:mt-[2rem]">
      <h1 className="text-white/90 text-blue-500 text-[28px] font-bold mt-10 brightness-[300%]">
        Login
      </h1>
      <p className="text-white/80 text-[18px] mt-5 font-montserrat">
      Whereas disregard and contempt for human rights have resulted
      </p>
      
      <div class="relative mt-10 w-full flex:col gap-10">
        <input
          type="text"
          class="bg-midnight mt-5 rounded-sm placeholder:text-white py-4 px-4 w-full text-white border-none outline-none"
          placeholder="Email address"
        />
        <input
          type="text"
          class="bg-midnight mt-5 rounded-sm placeholder:text-white py-4 px-4 w-full text-white border-none outline-none"
          placeholder="Enter Password"
        />
      </div>
      <button className="text-center rounded-md mt-10 py-3 px-4 bg-tahiti w-full font-robotomono text-white m-auto ">
        Login
      </button>
    </div>
  );
}
