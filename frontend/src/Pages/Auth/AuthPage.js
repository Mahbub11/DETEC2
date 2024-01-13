import { useState } from "react";
import { ReactComponent as AuthSvgBG } from "../../Assets/SVG/authbgsvg.svg";
import { ReactComponent as Facebook } from "../../Assets/SVG/facebook.svg";
import { ReactComponent as Google } from "../../Assets/SVG/google.svg";
import { ReactComponent as Linkdii } from "../../Assets/SVG/linkedin.svg";
import Login from "../../Components/auth/Login";
import Register from "../../Components/auth/Register";

export default function AuthPage() {


  const [viewSet,setViewSet]= useState(true);


  const handleAuthToggle=(e)=>{
    setViewSet(!viewSet)
    console.log('d')

  }
  return (
    <section className="w-full h-full relative">
      <div className="w-full h-full ">
        <span className="flex justify-center">
          <AuthSvgBG className="mt-[4%] w-[120rem]  lg:width-[150rem]"></AuthSvgBG>
        </span>
      </div>

      <div className="flex justify-center rounded-md  ">
        <div className="absolute sm:overflow-y-scroll lg:overflow-hidden sm:top-10
         top-2 md:left-[25%] 
        h-[90%] lg:w-[40%] lg:left-[30%] 
            md:w-[50%] m-auto rounded-md z-40  bg-transparent/10 ">
            <div className="w-full h-full flex justify-center mt-7 font-robotomono">
            <div className="w-[87%] md:mt-[-3rem] lg:mt-[1rem]">
              

              {/* take inout */}
              <div className=" w-[60%] sm:w-[90%]  m-2 sm:m-auto sm:mt-20 lg:scale-100 md:mt-[2rem]">
                {/* <Register></Register> */}
               
                {
                  viewSet ? <Login></Login> : <Register></Register>
                }
                <span>
                  {" "}
                  <p className="text-white md:mt-5 mt-20 font-thin m-auto flex justify-center">
                    -or-
                  </p>
                </span>

                {/* btn logo */}
                <div className=" flex justify-center mt-10 gap-6 rounded-md ">
                  <div className="w-[50%] flex justify-center gap-6">
                  <div className="bg-midnight w-[40%]  rounded-md flex justify-center">
                    <span>
                      <Facebook className="fill-white w-10 h-10 mt-1"></Facebook>
                    </span>
                    
                  </div>
                  <div className="bg-midnight w-[40%] rounded-md flex justify-center">
                    <span>
                      <Google className="fill-white w-10 h-10"></Google>
                    </span>
                    
                  </div>

                  <div className="bg-midnight  w-[40%] rounded-md flex justify-center">
                    <span>
                      <Linkdii className="fill-white w-10  h-10"></Linkdii>
                    </span>
                   
                  </div>
                  </div>
                </div>
                <div className="w-full h-full mt-10">
                  <h1 onClick={handleAuthToggle} className="text-white text-center cursor-pointer">
                    {
                      viewSet? <p>Don't Have a Account?</p> : <p>Already Have a Account</p>
                    }
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="h-[50%] ">

        </div> */}
      {/* <div className="relative">
       <span className="">
          <AuthSvgBG className=''></AuthSvgBG>
        </span>
        <div className="h-full w-full [#09375660] absolute"></div>
       </div> */}

      {/* <div className="flex justify-center -z-10">  
         
          <div className="bg-[#09375660] shadow-sm h-full w-full m-auto absolute top-0 bottom-0 rounded-xl">
            <div className="bg-[#0c3149] h-[32rem] w-[35%] m-auto mt-12 relative">
              <div className="m-10 mt-[3rem] h-full relative ">
                <h1 className="text-blue-500 text-[28px] font-bold mt-10 brightness-[300%]">Register New Account</h1>
                <p className="text-white text-[18px] mt-7">
                  Access to the most powerfull tool in the entire design and web
                  industry.
                </p>
              </div>
            </div>
          </div>
        </div> */}
    </section>
  );
}
