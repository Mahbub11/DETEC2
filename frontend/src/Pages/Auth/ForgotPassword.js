import { notification,Spin } from "antd";
import React, { useState } from "react";
import IconLoginBG from "../../Assets/SVG/IconLoginBG";
import { API_LEVEL } from "../../config";
import axiosInstance from "../../utils/axios";
import { LoadingOutlined } from '@ant-design/icons';

export default function ForgotPassword() {


  const [api, contextHolder] = notification.useNotification();
  const [email, setEmail] = useState(false);
  const [loading, setLoading] = useState(false)



  const openNotification = (type, message, description) => {
    api[type]({
      message: message,
      description: description,
      placement: "topRight",
    });
  };

  const handlePassReset=()=>{
    setLoading(true)
    // const config = { headers: { "Content-Type": "application/json" } };
    if (ValidateEmail(email)) {
      axiosInstance.post(`${API_LEVEL}/auth/pass-reset-request`,{email:email}).then(res=>{
        openNotification("success", "Success !", 'Reset Password Link send to Email');
        setLoading(false)
      }).catch(error=>{

        console.log(error)
        openNotification("error", "Error !", error.message);
        setLoading(false)

      })
    }

  }


  function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    openNotification("error", "Error !", "Invalid email address");
    return false;
  }


  return (
    <div className="h-full w-full px-2 relative overflow-hidden font-montserrat">
        {contextHolder}
       <div className='flex justify-center'>
            <h1
            className="sm:text-[30px] md:text-[40px] md:mt-2 sm:mt-4  bg-gradient-to-r
         from-blue-600 via-green-600 to-indigo-500 inline-block text-transparent bg-clip-text
          text-center text-[22px] font-lobster font-[500] drop-shadow-sm lg:w-[20%] w-full"
          >
           PracticeMania
          </h1>
            </div>
      <div className="md:h-[80%] sm:h-auto md:w-[80%] sm:w-full m-auto flex justify-around  px-5 py-3  mt-[2rem]">
        <div className="md:h-full sm:h-[80%] md:w-[35rem] sm:w-full bg-white  rounded-md shadow-sm">
          <div className="md:w-[75%] sm:w-full md:h-auto sm:h-full m-auto mt-2">
            <div className="h-full px-5 py-5 flex flex-col gap-2 justify-between">
              <h1 className="font-montserrat text-[22px] text-center font-[500]">
                Enter The Mail Address Associate With Your Account
              </h1>
              <div className="md:mt-[3rem] flex flex-col gap-3 justify-center items-center sm:mt-[2rem]">
                <input
                 name="email"
                 pattern=".*@.*\..*"
                onChange={(e)=> setEmail(e.target.value)}
                  placeholder="Enter Your E-mail Address"
                  className=" h-[3rem] w-[90%] border-[3px] shadow-sm rounded-md px-2 py-2"
                ></input>

<div className={`${loading ? 'block':'hidden'} mt-5`}>
                  <Spin
                    indicator={
                      <LoadingOutlined
                        style={{
                          fontSize: 24,
                        }}
                        spin
                      />
                    }
                  />
                </div>

                <button onClick={handlePassReset} className={`${loading ? 'hidden':'block'} bg-[#15B13F] w-[90%] h-[3rem] md:mt-[2rem] rounded-md text-white font-[500]`}>
                  Send Reset Password Link
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="sm:hidden md:block self-center">
          <span>
            <IconLoginBG height="30rem" width="35rem"></IconLoginBG>
          </span>
        </div>
      </div>
    </div>
  );
}
