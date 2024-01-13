import React, { useState } from "react";
import {
  Input,
  Button,
  Space,
  List,
  Select,
  InputNumber,
  Upload,
  Radio,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { SaveVoc } from "../../../redux/adminslice/vocabulary";
import TextArea from "antd/es/input/TextArea";
import { SaveReading } from "../../../redux/adminslice/Reading";
import { SaveWriting } from "../../../redux/adminslice/Writing";
import axios from "axios";
import axiosInstance from "../../../utils/axios";
import { ShowNotification } from "../../../redux/actions";

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
export default function CreateWAP({ refetch, length, nameInType }) {
  const dispatch = useDispatch();
  const [ans, setAns] = useState();
  const [time, setTime] = useState(1);
  const [level, setLevel] = useState();
  const [innerType, setInnerTypr] = useState(nameInType.inner_type);
  const [fileList, setFileList] = useState([]);

  const handleSave = async () => {
    var currentTime = new Date();

    const { name, originFileObj } = fileList[0];
    console.log(fileList[0]);

    //get presignedURL
    let signedurl = null;
    const filename = currentTime.valueOf() + name;
    await axiosInstance
      .get(`crete-signed-url?type=get&key=${filename}&folder=duolingo`)
      .then((res) => {
        signedurl = res.data.signedurl;
      })
      .catch((err) => {
        dispatch(
          ShowNotification({ severity: "error", message: "Sign Create Error" })
        );
        console.log(err);
        return;
      });

    // put file with signed URL
    await axios
      .put(signedurl, originFileObj)
      .then((res) => {
        console.log(res);
        const doc = {
          inner_type: innerType,
          type:2,
          qa: {
            a: ans,
          },
          time,
          level,
          image: filename,
        };
        dispatch(SaveWriting(doc));
        refetch();
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
  };
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  return (
    <div className="w-[90%] m-auto h-auto block px-5 py-1">
      <div className="bg-gray-300/40 ">
        <h1 className="text-[25px] font-[500] text-center px-2 py-2 bg-gray-200/70">
          Add--[ {nameInType.title} ]
        </h1>
        <div className="w-[70%] border-2 px-5 py-5 h-auto m-auto mt-10">
          <div className="h-auto flex flex-col gap-3">
            <Input
              style={{ height: "2rem" }}
              placeholder="Title of Test"
              disabled
              value={`${++length} ${nameInType.title}`}
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
                    onChange={(e) => setAns(e.target.value)}
                    style={{ width: "100%" }}
                  />
                </Space.Compact>
              </div>
            </div>
            <div className="flex gap-1 mt-3">
              <Radio.Group
                onChange={(e) => setTime(e.target.value)}
                defaultValue="a"
              >
                <Radio.Button value={1}>1 Minute</Radio.Button>
                <Radio.Button value={2}>2 Minute</Radio.Button>
                <Radio.Button value={3}>3 Minute</Radio.Button>
                <Radio.Button value={4}>4 Minute</Radio.Button>
                <Radio.Button value={5}>5 Minute</Radio.Button>
              </Radio.Group>
              <div className="flex bg-home px-2">
                <InputNumber
                  min={1}
                  max={10}
                  value={time}
                  onChange={(e) => setTime(e)}
                />
                <p className="text-[15px] mt-1">Minute</p>
              </div>
            </div>
            <div className="flex gap-1 mt-3">
              <InputNumber value={2} disabled />
              <p className="text-[15px] mt-1">Type</p>
            </div>
            <div className="flex gap-1 mt-3">
              <InputNumber value={nameInType.inner_type} disabled />
              <p className="text-[15px] mt-1">Inner Type(Q sub cat)</p>
            </div>
            <div className="flex gap-1 mt-3">
              <Radio.Group
                onChange={(e) => setLevel(e.target.value)}
                defaultValue="a"
              >
                <Radio.Button value={1}>{"Easy < 90"}</Radio.Button>
                <Radio.Button value={2}>{"Medium < 110"}</Radio.Button>
                <Radio.Button value={3}>{"Hard < 130"}</Radio.Button>
              </Radio.Group>
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
