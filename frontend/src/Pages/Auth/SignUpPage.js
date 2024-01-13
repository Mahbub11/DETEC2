import React, { useState } from "react";
import IconSignUpBg from "../../Assets/SVG/IconSignUpBg";
import IconFBL from "../../Assets/SVG/IconFBL";
import IconGL from "../../Assets/SVG/IconGL";
import { Link } from "react-router-dom";
import { notification,Spin } from "antd";
import axiosInstance from "../../utils/axios";
import { API_LEVEL } from "../../config";
import { LoadingOutlined } from '@ant-design/icons';

export default function SignUpPage() {
  const [api, contextHolder] = notification.useNotification();
  const [name, setName] = useState(false);
  const [password, setPassword] = useState(false);
  const [email, setEmail] = useState(false);
  const [passwor2, setPassword2] = useState(false);
  const [loading, setLoading] = useState(false)

  const openNotification = (type, message, description) => {
    api[type]({
      message: message,
      description: description,
      placement: "topRight",
    });
  };

  const handleSignUp = async () => {
    // name && email && password && passwor2
    if (name && email && password && passwor2) {
      if (ValidateEmail(email)) {
        // console.log(email, password, name, passwor2);
        if (password != passwor2) {
          openNotification("error", "Error !", "Password did not match!");
        }
      }

      setLoading(true)
      const config = { headers: { "Content-Type": "application/json" } };
      const signUpdata = {
        name: name,
        email: email,
        password: password,
      };
      await axiosInstance
        .post(`${API_LEVEL}/auth/signup/`, signUpdata, config)
        .then((res) => {
          console.log(res.status);

          if (res.status === 201) {
            openNotification(
              "success",
              "Success !",
              "Account Activation Link Send to Email"
            );
          }
          setLoading(false)
        })
        .catch((error) => {
          // error?.password?.map((val) => {
          //   openNotification("error", "Error !", val);
          // });
          // error?.name?.map((val) => {
          //   openNotification("error", "Error !", val);
          // });
          error?.email?.map((val) => {
            openNotification("error", "Error !", val);
          });
          openNotification("error", "Error !", error?.message);
          setLoading(false)
          console.log(error);
        });
    } else {
      openNotification("error", "Error !", "All field Rquired");
    }
  };
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
      <div className="flex justify-center">
        <h1
          className="sm:text-[30px] md:text-[40px] md:mt-1 sm:mt-2  bg-gradient-to-r
         from-blue-600 via-green-600 to-indigo-500 inline-block text-transparent bg-clip-text
          text-center text-[22px] font-lobster font-[500] drop-shadow-sm lg:w-[20%] w-full"
        >
          PracticeMania
        </h1>
      </div>
      <div className=" md:w-[80%] sm:w-full m-auto flex justify-center  px-5 py-3 h-[80%] mt-10">
        <span className="sm:hidden md:block">
          <IconSignUpBg height="40rem" width="70rem"></IconSignUpBg>
        </span>
        <div
          className="md:h-auto sm:h-auto md:w-[35rem] sm:w-full bg-white md:absolute sm:block md:top-[13%]
           md:left-[25%] rounded-md shadow-sm"
        >
          <div className="md:w-[75%] sm:w-full md:h-[85%] sm:h-full m-auto mt-2">
            <div className="h-full px-5 py-5 flex flex-col gap-2 justify-between">
              <h1 className="font-montserrat text-[22px] text-center font-[500]">
                SIGN UP
              </h1>
              <div className="md:mt-[2rem] flex flex-col gap-3 justify-center items-center sm:mt-[1rem]">
                <input
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Your Full Name"
                  className=" h-[3rem] w-[90%] border-[3px] shadow-sm rounded-md px-2 py-2"
                ></input>
                <input
                  type="text"
                  name="email"
                  pattern=".*@.*\..*"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your E-mail Address"
                  className=" h-[3rem] w-[90%] border-[3px] shadow-sm rounded-md px-2 py-2"
                ></input>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  className=" h-[3rem] w-[90%] border-[3px] shadow-sm rounded-md px-2 py-2"
                ></input>
                <input
                  onChange={(e) => setPassword2(e.target.value)}
                  placeholder="Re-enter Password"
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
                <button
                  onClick={handleSignUp}
                  className={`${loading ? 'hidden':'block'} bg-[#15B13F] w-[90%] h-[3rem] md:mt-[2rem] rounded-md text-white font-[500]`}
                >
                  SignUp
                </button>
              </div>

              <div className="flex justify-center  flex-col  md:mt-5 m-auto ">
                <h1 className="text-center">Or Continue With</h1>
                <div className="flex justify-center gap-2 ">
                  <span className="cursor-pointer">
                    <IconFBL height="5rem" width="7rem"></IconFBL>
                  </span>
                  <span className="cursor-pointer">
                    <IconGL height="5rem" width="7rem"></IconGL>
                  </span>
                </div>
                <p className="sm:flex sm:flex-wrap justify-center">
                  Already have a account?
                  <Link to={"/auth/signin"}>
                    <span className="text-[#3AB7BF] font-[600] cursor-pointer">
                      {" "}
                      SIGN IN
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
