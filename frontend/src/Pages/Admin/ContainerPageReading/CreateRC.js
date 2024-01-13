import React, { useState } from "react";
import { Input, Button, Space, List, Select, InputNumber,Radio } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { SaveVoc } from "../../../redux/adminslice/vocabulary";
import TextArea from "antd/es/input/TextArea";
import { SaveReading } from "../../../redux/adminslice/Reading";

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
export default function CreateRC({ refetch, length, nameInType }) {
  const dispatch = useDispatch();
  const [ansList, setAnsList] = useState([]);
  const [ans, setAns] = useState();
  const [time, setTime] = useState(1);
  const [level, setLevel] = useState(1);
  const [innerType,setInnerTypr]=useState(nameInType.inner_type);
  const [question,setQuestion] = useState()
  const [title,setTitle] = useState()
  const [customNotification, setCustomNotification] = useState();

  const handleAnsSave = (e) => {
    setAnsList((prev) => [...prev, ans]);
    setCustomNotification();
  };

  const handleAnsRemove = (e) => {
    const newData = ansList.filter(function (item, index) {
      return index !== e;
    });

    setAnsList(newData);
  };

  const handleVocSave = () => {
    const doc = {title,innerType,question,type:3, time, level, ansList };
    dispatch(SaveReading(doc));
    refetch();
  };
  const handleMouseUp = () => {
    let data = [];
    window
      .getSelection()
      .toString()
      .split(" ")
      .map((val) => {
        data.push(val.replace(/\n/g, " "));
      });

    setAns(data.join(" "));
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
              value={`${++length} Read & Complete`}
            />
            <Input
            onChange={(e)=> setTitle(e.target.value)}
              className="mt-4"
              style={{ height: "3rem" }}
              placeholder="Passage Title..."
            />
            <div className="">
              <p>
                Sample--[ Bangladesh i* a Beautiful Country ] (Where gap is
                required please add *)
              </p>

              <TextArea onMouseUp={handleMouseUp} onChange={(e)=>setQuestion(e.target.value)} placeholder="Question.."></TextArea>
            </div>

            <div className="flex justify-between">
              <div>
                <h1 className="py-2">Selct ans by mouse select from passage</h1>
                <Space.Compact style={{ width: "100%" }}>
                  <Input value={ans} onChange={(e) => setAns(e.target.value)} />

                  <Button onClick={handleAnsSave} className="bg-blue-300  ml-2">
                    Add To Ans
                  </Button>
                </Space.Compact>
                <span className="text-red-500">{customNotification}</span>
              </div>

              <List
                size="small"
                header={<div className="text-center font-[500]">Answer</div>}
                bordered
                dataSource={ansList}
                renderItem={(item, index) => (
                  <List.Item>
                    <div className="flex gap-3">
                      <p>{item}</p>
                      <span
                        onClick={(e) => handleAnsRemove(index)}
                        className="cursor-pointer"
                      >
                        <DeleteOutlined></DeleteOutlined>
                      </span>
                    </div>
                  </List.Item>
                )}
              />
            </div>

            <div className="flex gap-1 mt-3">
              <Radio.Group
                onChange={(e) => setTime(e.target.value)}
                defaultValue='1'
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
              <InputNumber value={3} disabled />
              <p className="text-[15px] mt-1">Type</p>
            </div>
            <div className="flex gap-1 mt-3">
              <InputNumber value={nameInType.inner_type} disabled />
              <p className="text-[15px] mt-1">Inner Type(Q sub cat)</p>
            </div>
            <div>
            <div className="flex gap-1 mt-3">
              <Radio.Group
                onChange={(e) => setLevel(e.target.value)}
                defaultValue="a"
              >
                <Radio.Button value={1}>{'Easy < 90'}</Radio.Button>
                <Radio.Button value={2}>{"Medium < 110"}</Radio.Button>
                <Radio.Button value={3}>{ "Hard < 130"}</Radio.Button>
              </Radio.Group>
             
            </div>
            </div>
          </div>
        </div>
        <div className="w-[80%] m-auto bg-home flex justify-center px-2 py-2 rounded-md">
          <Button
            onClick={handleVocSave}
            className=" border-none text-[23px] mt-[-1rem]"
          >
            Save to DB
          </Button>
        </div>
      </div>
    </div>
  );
}
