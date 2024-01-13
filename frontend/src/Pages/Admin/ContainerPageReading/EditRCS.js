import React, { useState } from "react";
import { Input, Button, Space, List, Select, InputNumber } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { SaveVoc, UpdateVoc } from "../../../redux/adminslice/vocabulary";
import { useLocation } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import {
  UpdatInteractiveReading,
  UpdatReading,
} from "../../../redux/adminslice/Reading";

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
export default function EditRCS({ data }) {
  const dispatch = useDispatch();

  const [vocList, setVocList] = useState(data?.qa?.q);
  const [ansList, setAnsList] = useState(data?.qa?.a);
  const [time, setTime] = useState(data.time);
  const [level, setLevel] = useState(data.level);
  const [question, setQuestion] = useState(data?.qa?.q);
  const [title, setTitle] = useState(data.title);
  const [ans, setAns] = useState();

  const handleAnsSave = (e) => {
    setAnsList((prev) => [...prev, ans]);
    setAns("");
  };

  const handleAnsRemove = (e) => {
    const newData = ansList.filter(function (item, index) {
      return index !== e;
    });

    setAnsList(newData);
  };

  const handleEdit = () => {
    const doc = {
      id: data.id,
      title,
      question,
      time,
      level,
      ansList,
      id: data.id,
    };
    dispatch(UpdatInteractiveReading(doc));
  };

  return (
    <div className="w-[90%] m-auto h-auto block px-5 py-1">
      <div className="bg-gray-300/40 ">
        <h1 className="text-[25px] font-[500] text-center px-2 py-2 bg-gray-200/70">
          Edit Complete the Sentence
        </h1>
        <div className="w-[70%] border-2 px-5 py-5 h-auto m-auto mt-10">
          <div className="h-auto flex flex-col gap-3">
            <Input
              style={{ height: "2rem" }}
              placeholder="Title of Test"
              disabled
              value={`${data.id} Read & Complete`}
            />
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-4"
              style={{ height: "3rem" }}
              placeholder="Passage Title..."
            />
            <div className="">
              <p>
                Sample--[ Bangladesh i* a Beautiful Country ] (Where gap is
                required please add *)
              </p>

              <TextArea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Question.."
              ></TextArea>
            </div>

            <div className="flex justify-between">
              <div>
                <Space.Compact style={{ width: "100%" }}>
                  <Input value={ans} onChange={(e) => setAns(e.target.value)} />

                  <Button onClick={handleAnsSave} className="bg-blue-300  ml-2">
                    Add To Ans
                  </Button>
                </Space.Compact>
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
              <InputNumber value={3} disabled />
              <p className="text-[15px] mt-1">Type</p>
            </div>
            <div className="flex gap-1 mt-3">
              <InputNumber value={data.inner_type} disabled />
              <p className="text-[15px] mt-1">Inner Type(Q sub cat)</p>
            </div>
          </div>
        </div>
        <div className="w-[80%] m-auto bg-home flex justify-center px-2 py-2 rounded-md">
          <Button
            onClick={handleEdit}
            className=" border-none text-[23px] mt-[-1rem]"
          >
            Save to DB
          </Button>
        </div>
      </div>
    </div>
  );
}
