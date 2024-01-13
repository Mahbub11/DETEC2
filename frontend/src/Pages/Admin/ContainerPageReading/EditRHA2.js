import React, { useState } from "react";
import { Input, Button, Space, List, Select, InputNumber } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { SaveVoc } from "../../../redux/adminslice/vocabulary";
import TextArea from "antd/es/input/TextArea";
import {
  SaveReading,
  UpdatInteractiveReading,
  UpdatReading,
} from "../../../redux/adminslice/Reading";
import { useLocation } from "react-router-dom";

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
export default function EditRHA({ data }) {
  const dispatch = useDispatch();

  const [ans, setAns] = useState(data.qa.a);
  const [time, setTime] = useState(data.time);
  const [level, setLevel] = useState(data.level);
  const [innerType, setInnerTypr] = useState(data.inner_type);
  const [question, setQuestion] = useState(data.qa.q);
  const [title, setTitle] = useState(data.title);
  const [passage, setPassage] = useState(data.qa.passage);
  const [customNotification, setCustomNotification] = useState();

  const handleSave = () => {
    const doc = {
      id: data.id,
      title,
      innerType,
      question,
      time,
      level,
      ansList: ans,
      passage,
    };
    dispatch(UpdatInteractiveReading(doc));
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
          Edit-- HighLight the Answer
        </h1>
        <div className="w-[70%] border-2 px-5 py-5 h-auto m-auto mt-10">
          <div className="h-auto flex flex-col gap-3">
            <Input
              style={{ height: "2rem" }}
              placeholder="Title of Test"
              disabled
              value={`${data.id} Highlight the Answer`}
            />
            <div>
              <p>Title</p>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ height: "3rem" }}
                placeholder="Passage Title..."
              />
            </div>
            <div>
              <p>Passage</p>
              <TextArea
                value={passage}
                onChange={(e) => setPassage(e.target.value)}
                onMouseUp={handleMouseUp}
                style={{ height: "3rem" }}
                placeholder="Passage"
              />
            </div>

            <div className="">
              <p>Question</p>

              <Input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Question.."
              ></Input>
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <p>Answer-[ From Passage Select the Answer by Mouse Select]</p>
                <Space.Compact style={{ width: "100%" }}>
                  <TextArea style={{ width: "100%" }} disabled value={ans} />
                </Space.Compact>
                <span className="text-red-500">{customNotification}</span>
              </div>
            </div>

            <div className="flex gap-1 mt-3">
              <InputNumber value={3} disabled />
              <p className="text-[15px] mt-1">Type</p>
            </div>
            <div className="flex gap-1 mt-3">
              <InputNumber value={innerType} disabled />
              <p className="text-[15px] mt-1">Inner Type(Q sub cat)</p>
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
