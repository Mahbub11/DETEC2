import React, { useEffect, useState } from "react";
import { Radio, Button, Modal, Input } from "antd";
import { vocList } from "../../utils/VocabularyList";
import { useDispatch, useSelector } from "react-redux";
import { getWordDetails } from "../../redux/slices/disctionary";
import TextArea from "antd/es/input/TextArea";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import {
  getUserProfileInfo,
  saveUserProfileInfo,
} from "../../redux/slices/auth";
import axios from "axios";
import axiosInstance from "../../utils/axios";
import { ShowNotification } from "../../redux/actions";

export default function Setting() {
  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.auth);
  const { userInfo } = useSelector((state) => state.auth);

  const [name, setName] = useState();
  const [itp, setITP] = useState(userProfile?.extra_info?.itp);
  const [cLevel, setClevel] = useState(userProfile?.extra_info?.cLevel);
  const [ds, setDS] = useState(userProfile?.extra_info?.ds);
  const [sEmail, setsEmail] = useState(userProfile?.s_email || "");
  const [pNo, setpNo] = useState(userProfile?.phone);
  const [address, setaddress] = useState(userProfile?.address);
  const [dbImage, setDbImg] = useState(userProfile?.avatar);

  const [fileList, setFileList] = useState([
    {
      uid: -1,
      name: userProfile?.avatar,
      originFileObj: `https://practicemania.s3.ap-south-1.amazonaws.com/user/${userProfile?.avatar}`,
      status: "done",
      url: `https://practicemania.s3.ap-south-1.amazonaws.com/user/${userProfile?.avatar}`,
    },
  ]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleITP = (e) => {
    setITP(e.target.value);
  };
  const handleClevel = (e) => {
    setClevel(e.target.value);
  };
  const handleDS = (e) => {
    setDS(e.target.value);
  };

  const handleSave = async () => {
    var currentTime = new Date();
    let name = "";
    let originFileObj = "";
    if (!fileList[0]) {
    
      name = null;
    } else {
      name = fileList[0].name;
      originFileObj = fileList[0].originFileObj;
    }

    //get presignedURL
    let signedurl = null;
    const filename = currentTime.valueOf() + name;

    if (dbImage === name) {
      const data = {
        id: userInfo.id,
        s_email: sEmail,
        phone: pNo,
        address,
        extra_info: {
          itp: itp,
          cLevel: cLevel,
          ds: ds,
        },
      };

      dispatch(saveUserProfileInfo(data));
    } else {
      await axios
        .delete(
          `http://localhost:3006/delete-img?folder=user&key=${userProfile?.avatar}`
        )
        .then(async (res) => {
          await axiosInstance
            .get(`crete-signed-url?type=get&key=${filename}&folder=user`)
            .then((res) => {
              signedurl = res.data.signedurl;
            })
            .catch((err) => {
              dispatch(
                ShowNotification({
                  severity: "error",
                  message: "Sign Create Error",
                })
              );
              console.log(err);
              return;
            });
        })
        .catch((err) => {
          dispatch(
            ShowNotification({
              severity: "error",
              message: "Existing file delete failed",
            })
          );
          console.log(err);
        });
      // put file with signed URL
      await axios
        .put(signedurl, originFileObj)
        .then((res) => {
          const data = {
            id: userInfo.id,
            image: filename,
            s_email: sEmail,
            phone: pNo,
            address,
            extra_info: {
              itp: itp,
              cLevel: cLevel,
              ds: ds,
            },
          };

          dispatch(saveUserProfileInfo(data));
        })
        .catch((err) => {
          dispatch(
            ShowNotification({
              severity: "error",
              message: "Image Saving Failed",
            })
          );
          console.log(err);
        });
    }
  };

  return (
    <div className="flex flex-col justify-center gap-3 h-full  w-full mt-[-2rem]">
      <div className=" h-auto w-[30%] self-center sm:hidden md:block">
        <div className="px-2 py-2 m-auto h-full w-full ">
          <div className="h-full w-full  ">
            <div className="flex flex-col justify-center items-center">
              <div className="mt-2 self-center ml-3">
                <h1 className="text-[22px] font-poppins font-[600] text-center">
                  {userInfo.name}
                </h1>
                <h1 className="text-[20px] font-montserratfont-[600] text-center">
                  {userInfo.email}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" h-full md:w-[90%] sm:w-full flex justify-center m-auto sm:mt-[5rem] md:mt-0">
        <div className="h-full w-full m-auto">
          <div className="bg-white flex justify-center h-full w-full m-auto items-center">
            <div className="md:flex sm:flex sm:flex-col md:flex-row gap-2 justify-around h-full w-full px-2 py-2 items-center">
              <div className="sm:w-full md:w-[50%] h-[90%]">
                <div className="flex flex-col justify-start md:ml-[2rem] gap-3">
                  <h1 className="font-poppins text-[23px] font-[500] underline">
                    Change Information
                  </h1>
                  <div className="flex flex-col gap-1 font-poppins text-[18px]">
                    <div className="mt-3">
                      <Upload
                        name="avatar"
                        listType="picture-circle"
                        multiple={false}
                        fileList={fileList}
                        onChange={onChange}
                      >
                        {fileList.length < 1 && "+ Upload"}
                      </Upload>
                    </div>
                    <div className="mt-5">
                      <h1>Secondary E-mail:</h1>
                      <div className="flex ">
                        <input
                          onChange={(e) => setsEmail(e.target.value)}
                          value={sEmail}
                          className="bg-gray-100 px-1 py-1 w-full"
                        ></input>
                      </div>
                    </div>
                    <div>
                      <h1>Phone No:</h1>
                      <div className="flex">
                        <input
                          onChange={(e) => setpNo(e.target.value)}
                          value={pNo}
                          className="bg-gray-100 px-1 py-1 w-full"
                        ></input>
                      </div>
                    </div>
                    <div>
                      <h1>Address</h1>
                      <div className="flex">
                        <textarea
                          onChange={(e) => setaddress(e.target.value)}
                          value={address}
                          className="bg-gray-100 px-1 py-1 w-full"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="sm:w-full md:w-[30%] flex justify-center flex-col ">
                <div className="h-min w-auto mt-5">
                  <h1 className="font-montserrat text-[20px] font-[500]">
                    Interested Test Proficency
                  </h1>
                  <Radio.Group
                    defaultValue={1}
                    buttonStyle="solid"
                    onChange={handleITP}
                  >
                    <div className="flex gap-3 sm:flex-wrap font-montserrat">
                      <div className="flex gap-1">
                        <Radio.Button
                          style={{
                            background:
                              itp === "duolingo" ? "#3AB7BF" : "#FFFF",
                            color: itp === "duolingo" ? "#FFFF" : "	#000000",
                            fontFamily: "inherit",
                          }}
                          value="duolingo"
                        >
                          DUOLINGO
                        </Radio.Button>
                      </div>
                      <div className="flex gap-1">
                        <Radio.Button
                          style={{
                            background: itp === "ielts" ? "#3AB7BF" : "#FFFF",
                            color: itp === "ielts" ? "#FFFF" : "	#000000",
                            fontFamily: "inherit",
                          }}
                          value="ielts"
                        >
                          IELTS
                        </Radio.Button>
                      </div>
                    </div>
                  </Radio.Group>
                </div>

                <div className="h-min w-auto mt-5">
                  <h1 className="font-montserrat text-[20px] font-[500]">
                    Current Level
                  </h1>
                  <Radio.Group buttonStyle="solid" onChange={handleClevel}>
                    <div className="flex gap-3 sm:flex-wrap font-montserrat ">
                      <div className="flex gap-1">
                        <Radio.Button
                          style={{
                            background:
                              cLevel === "student" ? "#3AB7BF" : "#FFFF",
                            color: cLevel === "student" ? "#FFFF" : "	#000000",
                            fontFamily: "inherit",
                          }}
                          value="student"
                        >
                          STUDENT
                        </Radio.Button>
                      </div>
                      <div className="flex gap-1">
                        <Radio.Button
                          style={{
                            background: cLevel === "jb" ? "#3AB7BF" : "#FFFF",
                            color: cLevel === "jb" ? "#FFFF" : "	#000000",
                            fontFamily: "inherit",
                          }}
                          value="jb"
                        >
                          JOB HOLDER
                        </Radio.Button>
                      </div>
                      <div className="flex gap-1">
                        <Radio.Button
                          style={{
                            background: cLevel === "ap" ? "#3AB7BF" : "#FFFF",
                            color: cLevel === "ap" ? "#FFFF" : "	#000000",
                            fontFamily: "inherit",
                          }}
                          value="ap"
                        >
                          Abroad Plan
                        </Radio.Button>
                      </div>
                    </div>
                  </Radio.Group>
                </div>

                <div className="h-min w-auto mt-5">
                  <h1 className="font-montserrat text-[20px] font-[500]">
                    Desire Score
                  </h1>
                  <Radio.Group buttonStyle="solid" onChange={handleDS}>
                    <div className="flex gap-3 sm:flex-wrap font-montserrat">
                      <div className="flex gap-1">
                        <Radio.Button
                          style={{
                            background: ds === "90-100" ? "#3AB7BF" : "#FFFF",
                            color: ds === "90-100" ? "#FFFF" : "	#000000",
                            fontFamily: "inherit",
                          }}
                          value="90-100"
                        >
                          90-100
                        </Radio.Button>
                      </div>
                      <div className="flex gap-1">
                        <Radio.Button
                          style={{
                            background: ds === "100-110" ? "#3AB7BF" : "#FFFF",
                            color: ds === "100-110" ? "#FFFF" : "	#000000",
                            fontFamily: "inherit",
                          }}
                          value="100-110"
                        >
                          100-110
                        </Radio.Button>
                      </div>
                      <div className="flex gap-1">
                        <Radio.Button
                          style={{
                            background: ds === "110-120" ? "#3AB7BF" : "#FFFF",
                            color: ds === "110-120" ? "#FFFF" : "	#000000",
                            fontFamily: "inherit",
                          }}
                          value="110-120"
                        >
                          110-120
                        </Radio.Button>
                      </div>
                      <div className="flex gap-1">
                        <Radio.Button
                          style={{
                            background: ds === "120-130" ? "#3AB7BF" : "#FFFF",
                            color: ds === "120-130" ? "#FFFF" : "	#000000",
                            fontFamily: "inherit",
                          }}
                          value="120-130"
                        >
                          120-130
                        </Radio.Button>
                      </div>
                      <div className="flex gap-1">
                        <Radio.Button
                          style={{
                            background: ds === "130-140" ? "#3AB7BF" : "#FFFF",
                            color: ds === "130-140" ? "#FFFF" : "	#000000",
                            fontFamily: "inherit",
                          }}
                          value="130-140"
                        >
                          130-140
                        </Radio.Button>
                      </div>
                      <div className="flex gap-1">
                        <Radio.Button
                          style={{
                            background: ds === "140-150" ? "#3AB7BF" : "#FFFF",
                            color: ds === "140-150" ? "#FFFF" : "	#000000",
                            fontFamily: "inherit",
                          }}
                          value="140-150"
                        >
                          140-150
                        </Radio.Button>
                      </div>
                      <div className="flex gap-1">
                        <Radio.Button
                          style={{
                            background: ds === "150-160" ? "#3AB7BF" : "#FFFF",
                            color: ds === "150-160" ? "#FFFF" : "	#000000",
                            fontFamily: "inherit",
                          }}
                          value="150-160"
                        >
                          150-160
                        </Radio.Button>
                      </div>
                    </div>
                  </Radio.Group>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={handleSave}
            className="h-10 w-full m-auto bg-tahiti text-white text-[20px]"
          >
            Save Info
          </button>
        </div>
      </div>
    </div>
  );
}
