import React, { useState } from "react";
import { Input, Button, Space, List, Select, InputNumber,Radio } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { SaveVoc } from "../../../redux/adminslice/vocabulary";
import TextArea from "antd/es/input/TextArea";
import { SaveInteractiveReading, SaveReading } from "../../../redux/adminslice/Reading";

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
export default function CreateRHA({ refetch, id }) {
  const dispatch = useDispatch();
  const [ans, setAns] = useState();
  const [time, setTime] = useState(1);
  const [level, setLevel] = useState();
  const [passage, setPassage] = useState();
  const [innerType, setInnerTypr] = useState(324);
  const [question, setQuestion] = useState();
  const [title, setTitle] = useState();
  const [customNotification, setCustomNotification] = useState();

  const handleSave = () => {
    
    const doc = {rid:id,title,innerType,question, ansList: ans,passage };
    dispatch(SaveInteractiveReading(doc));
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
          Add--[  Highlight the Answer ]
        </h1>
        <div className="w-[70%] border-2 px-5 py-5 h-auto m-auto mt-10">
          <div className="h-auto flex flex-col gap-3">
            <Input
              style={{ height: "2rem" }}
              placeholder="Title of Test"
              disabled
              value={`${id} Highlight the Answer`}
            />
             <p>Title (Optional)</p>
            <Input
              onChange={(e) => setTitle(e.target.value)}
             
              style={{ height: "3rem" }}
              placeholder="Passage Title..."
            />
            <div className="">
              <p>Paste The Passage and Select the Answer by Mouse Select</p>

              <TextArea
                onMouseUp={handleMouseUp}
                onChange={(e) => setPassage(e.target.value)}
                placeholder="Passage..."
                className=""
              ></TextArea>

              <Input
                className="mt-2"
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Question.."
              ></Input>
            </div>

            <div className="flex flex-col justify-between">
              <div>
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
