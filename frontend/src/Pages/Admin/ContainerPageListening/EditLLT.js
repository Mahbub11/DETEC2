import React, { useState } from "react";
import { Input, Button, Space, List, Select, InputNumber, Radio } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { SaveVoc } from "../../../redux/adminslice/vocabulary";
import TextArea from "antd/es/input/TextArea";
import { SaveReading } from "../../../redux/adminslice/Reading";
import { SaveWriting } from "../../../redux/adminslice/Writing";
import {
  SaveSpeaking,
  UpdatSpeaking,
} from "../../../redux/adminslice/Speaking";
import { useLocation } from "react-router-dom";
import { UpdatListening } from "../../../redux/adminslice/Listening";

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
export default function EditLLT({ refetch, length, nameInType }) {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const [data, setData] = useState(state);
  const [ans, setAns] = useState(data.qa.a);
  const [time, setTime] = useState(data.time);
  const [level, setLevel] = useState(data.level);
  const [innerType, setInnerTypr] = useState(data.inner_type);
  const [question, setQuestion] = useState(data.qa.q);
  const [questionBreakdown, setQuestionBreakdown] = useState();
  const [qBreakdownList, setQBreakdownList] = useState(data.qa.qb);
  const [customNotification, setCustomNotification] = useState();

  const handleSave = () => {
    

    const doc = {
      id:data.id,
      inner_type:innerType,
      qa: {a: ans, q: question, qb: qBreakdownList },
      time,
      level,
      type:5
      
    };



    dispatch(UpdatListening(doc));
  };
  const onChange = (e) => {
    console.log(`radio checked:${e.target.value}`);
  };
  const handleQBSave = (e) => {
    if (qBreakdownList.includes(questionBreakdown)) {
      setCustomNotification("Already saved!");
    } else {
      setQBreakdownList((prev) => [...prev, questionBreakdown]);
      setCustomNotification();
      setQuestionBreakdown("");
    }
  };
  const handleQBreakRemove = (e) => {
    const newData = qBreakdownList.filter(function (item, index) {
      return index !== e;
    });

    setQBreakdownList(newData);
  };

  return (
    <div className="w-[90%] m-auto h-auto block px-5 py-1">
      <div className="bg-gray-300/40 ">
        <h1 className="text-[25px] font-[500] text-center px-2 py-2 bg-gray-200/70">
          Edit--[Listen and Type ]
        </h1>
        <div className="w-[70%] border-2 px-5 py-5 h-auto m-auto mt-10">
          <div className="h-auto flex flex-col gap-3">
            <Input
              style={{ height: "2rem" }}
              placeholder="Title of Test"
              disabled
              value={`${data.index} Listen and Type`}
            />

            <div className="flex flex-col justify-between gap-3">
              <div>
                <TextArea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Write the Question"
                ></TextArea>

                <div className="mt-5">
                  <p>Question Breakdown</p>
                  <div className="flex gap-3">
                    <div>
                      <Input
                        value={questionBreakdown}
                        onChange={(e) => setQuestionBreakdown(e.target.value)}
                      ></Input>
                      <span className="text-red-500">{customNotification}</span>
                    </div>
                    <Button
                      className="bg-blue-300  ml-2"
                      onClick={handleQBSave}
                    >
                      Add To Question List
                    </Button>
                  </div>

                  <List
                    size="small"
                    header={
                      <div className="text-center font-[500]">
                        Question Brakdown List
                      </div>
                    }
                    bordered
                    dataSource={qBreakdownList}
                    renderItem={(item, index) => (
                      <List.Item>
                        <div className="flex gap-3">
                          <p>{item}</p>
                          <span
                            onClick={(e) => handleQBreakRemove(index)}
                            className="cursor-pointer"
                          >
                            <DeleteOutlined></DeleteOutlined>
                          </span>
                        </div>
                      </List.Item>
                    )}
                  />
                </div>

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
              <InputNumber value={4} disabled />
              <p className="text-[15px] mt-1">Type</p>
            </div>
            <div className="flex gap-1 mt-3">
              <InputNumber value={data.inner_type} disabled />
              <p className="text-[15px] mt-1">Inner Type(Q sub cat)</p>
            </div>
            <Select
              placeholder="Select Level"
              optionFilterProp="children"
              onChange={(e) => setLevel(e)}
              options={options}
            />
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
