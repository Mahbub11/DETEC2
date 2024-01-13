import React, { useState } from "react";
import { Input, Button, Space, List, Select, InputNumber, Upload } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { SaveVoc } from "../../../redux/adminslice/vocabulary";
import TextArea from "antd/es/input/TextArea";
import { SaveReading } from "../../../redux/adminslice/Reading";
import { UpdatWriting } from "../../../redux/adminslice/Writing";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../../utils/axios";
import { ShowNotification } from "../../../redux/actions";
import axios from "axios";
import { UpdatSpeaking } from "../../../redux/adminslice/Speaking";

const options = [
  {
    value: 1,
    label: "Easy < 90",
  },
  {
    value: 2,
    label: "Medium < 110",
  },
  {
    value: 3,
    label: "Hard < 130",
  },
];
export default function EditeSAP() {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const [data, setData] = useState(state);
  const [ans, setAns] = useState(data.qa.a);
  const [time, setTime] = useState(data.time);
  const [level, setLevel] = useState(data.level);
  const [dbImage, setDbImg] = useState(data.image);
  const [innerType, setInnerTypr] = useState(data.inner_type);
  const [fileList, setFileList] = useState([
    {
      uid: -1,
      name: data.image,
      originFileObj: `https://practicemania.s3.ap-south-1.amazonaws.com/duolingo/${data.image}`,
      status: "done",
      url: `https://practicemania.s3.ap-south-1.amazonaws.com/duolingo/${data.image}`,
    },
  ]);

  const handleSave = async () => {
    var currentTime = new Date();

    const { name, originFileObj } = fileList[0];

    //get presignedURL
    let signedurl = null;
    const filename = currentTime.valueOf() + name;

    
    if (dbImage === name) {
      const doc = {
        id: data.id,
        inner_type: innerType,
        qa: {
          a: ans,
        },
        time,
        level,
      };
      dispatch(UpdatSpeaking(doc));
    } else {
      await axios
        .delete(
          `http://localhost:3006/delete-img?folder=duolingo&key=${data.image}`
        )
        .then(async (res) => {
          await axiosInstance
            .get(`crete-signed-url?type=get&key=${filename}&folder=duolingo`)
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
         
          const doc = {
            id: data.id,
            inner_type: innerType,
            qa: {
              a: ans,
            },
            time,
            level,
            image: filename,
          };
          dispatch(UpdatSpeaking(doc));
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
    // delete the existing file
  };
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  return (
    <div className="w-[90%] m-auto h-auto block px-5 py-1">
      <div className="bg-gray-300/40 ">
        <h1 className="text-[25px] font-[500] text-center px-2 py-2 bg-gray-200/70">
          Edit Write about the Photo
        </h1>
        <div className="w-[70%] border-2 px-5 py-5 h-auto m-auto mt-10">
          <div className="h-auto flex flex-col gap-3">
            <Input
              style={{ height: "2rem" }}
              placeholder="Title of Test"
              disabled
              value={`${data.index} Highlight the Answer`}
            />

            <div className="flex flex-col justify-between">
              <div>
                <Upload
                  listType="picture-card"
                  multiple={false}
                  fileList={fileList}
                  onChange={onChange}
                >
                  {fileList.length < 1 && "+ Upload"}
                </Upload>

                <h1>Model Answer</h1>
                <Space.Compact style={{ width: "100%" }}>
                  <TextArea
                    value={ans}
                    onChange={(e) => setAns(e.target.value)}
                    style={{ width: "100%" }}
                  />
                </Space.Compact>
              </div>
            </div>

            <div className="flex gap-1 mt-3">
              <InputNumber
                min={1}
                max={10}
                value={time}
                onChange={(e) => setTime(e)}
              />
              <p className="text-[15px] mt-1">Minute</p>
            </div>
            <div className="flex gap-1 mt-3">
              <InputNumber value={4} disabled />
              <p className="text-[15px] mt-1">Type</p>
            </div>
            <div className="flex gap-1 mt-3">
              <InputNumber value={data.inner_type} disabled />
              <p className="text-[15px] mt-1">Inner Type(Q sub cat)</p>
            </div>
            <div className="flex gap-3">
              <Select
                placeholder="Select Level"
                optionFilterProp="children"
                onChange={(e) => setLevel(e)}
                options={options}
              />
              <p className="mt-1">
                {level === 1 ? (
                  <p>Easy</p>
                ) : level === 2 ? (
                  <p>Medium</p>
                ) : (
                  <p>Hard</p>
                )}{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="w-[80%] m-auto bg-home flex justify-center px-2 py-2 rounded-md">
          <Button
            onClick={handleSave}
            className=" border-none text-[23px] mt-[-1rem]"
          >
            Save to DB
          </Button>
        </div>
      </div>
    </div>
  );
}
