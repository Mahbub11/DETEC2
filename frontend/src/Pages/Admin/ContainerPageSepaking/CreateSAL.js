import React, { useState } from "react";
import { Input, Button, Space, List, Select, InputNumber, Radio } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { SaveVoc } from "../../../redux/adminslice/vocabulary";
import TextArea from "antd/es/input/TextArea";
import { SaveReading } from "../../../redux/adminslice/Reading";
import { SaveSpeaking } from "../../../redux/adminslice/Speaking";
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
export default function CreateSAL({ refetch, length, nameInType }) {
  const dispatch = useDispatch();
  const [time, setTime] = useState(1);
  const [level, setLevel] = useState(1);
  const [innerType, setInnerTypr] = useState(nameInType.inner_type);
  const [question, setQuestion] = useState();
  const { error } = useSelector((state) => state.speaking);

  const handleSave = () => {
    if (!question) {
      dispatch(
        ShowNotification({
          severity: "error",
          message: "Question Field is Required",
        })
      );

      return;
    }

    const doc = {
      inner_type: innerType,
      qa: {
        q: question,
      },
      time,
      level,
      type: 4,
    };

    dispatch(SaveSpeaking(doc));
    refetch();
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
              value={`${++length} Read Aloud`}
            />

            <div className="">
              <p>Sample--[ Bangladesh is a beautiful Country ]</p>

              <TextArea
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Question.."
              ></TextArea>
            </div>

            <div className="flex gap-1 mt-3">
              <Radio.Group
                onChange={(e) => setTime(e.target.value)}
                defaultValue="a"
              >
                <Radio.Button value={0.17}>10 Seconds</Radio.Button>
                <Radio.Button value={0.25}>15 Seconds</Radio.Button>
                <Radio.Button value={0.35}>20 Seconds</Radio.Button>
                <Radio.Button value={0.42}>25 Seconds</Radio.Button>
                <Radio.Button value={0.5}>30 Seconds</Radio.Button>
              </Radio.Group>
              <div className="flex bg-home px-2">
                <InputNumber value={time} onChange={(e) => setTime(e)} />
                <p className="text-[15px] mt-1">Second</p>
              </div>
            </div>
            <div className="flex gap-1 mt-3">
              <InputNumber value={4} disabled />
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
                <Radio.Button value={1}>{'Easy < 90'}</Radio.Button>
                <Radio.Button value={2}>{"Medium < 110"}</Radio.Button>
                <Radio.Button value={3}>{ "Hard < 130"}</Radio.Button>
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
