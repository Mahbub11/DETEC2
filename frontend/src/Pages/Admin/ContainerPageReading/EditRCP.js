import React, { useState } from "react";
import { Input, Button, Space, List, Select, InputNumber } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { SaveVoc, UpdateVoc } from "../../../redux/adminslice/vocabulary";
import { useLocation } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import { UpdatInteractiveReading, UpdatReading } from "../../../redux/adminslice/Reading";

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
export default function EditRCP({data}) {
  
  const dispatch = useDispatch();
  const [ansList, setAnsList] = useState(data?.qa?.a ? data?.qa.a :[]);
  const [optionList, setOptionList] = useState(data?.qa?.options);
  const [ans, setAns] = useState();
  const [input, setInput] = useState();
  const [option, setOption] = useState();
  const [time, setTime] = useState(data?.time);
  const [level, setLevel] = useState(data?.level);
  const [question, setQuestion] = useState(data?.qa?.q);
  const [title, setTitle] = useState(data?.title);
  const [customNotification, setCustomNotification] = useState();


  const handleAnsSave = (e) => {
    if (ansList.includes(input)) {
      setCustomNotification("Already saved!");
    } else {
      setAnsList((prev) => [...prev, input]);
      setCustomNotification();
    }
  };
  const handleOptionSave = (e) => {
    if (optionList.includes(input)) {
      setCustomNotification("Already saved!");
    } else {
      setOptionList((prev) => [...prev, input]);
      setCustomNotification();
    }
  };

  const handleAnsRemove = (e) => {
    const newData = ansList.filter(function (item, index) {
      return index !== e;
    });

    setAnsList(newData);
  };
  const handleOptionRemove = (e) => {
    const newData = optionList.filter(function (item, index) {
      return index !== e;
    });

    setOptionList(newData);
  };

  const handleEdit = () => {
    const doc = {id:data.id, title, innerType:data.inner_type, question, time, level, ansList,optionList };
    dispatch(UpdatInteractiveReading(doc));
    // refetch();
  };

  return (
    <div className="w-[90%] m-auto h-auto block px-5 py-1">
      <div className="bg-gray-300/40 ">
        <h1 className="text-[25px] font-[500] text-center px-2 py-2 bg-gray-200/70">
          Edit Complete the Passage
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
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="mt-4"
              style={{ height: "3rem" }}
              placeholder="Passage Title..."
            />
            <div className="">
              <p>
                Sample--[ I love to spend time with my Family . * . When ever i
                get free time i try to spend with family ] (Where sentence gap
                is required please add * )
              </p>

              <TextArea
              value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Question.."
              ></TextArea>
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <Space.Compact style={{ width: "100%" }}>
                  <Input onChange={(e) => setInput(e.target.value)} />
                  <Button
                    onClick={handleOptionSave}
                    className="bg-blue-300  ml-2"
                  >
                    Add To Option
                  </Button>
                  <Button onClick={handleAnsSave} className="bg-blue-300  ml-2">
                    Add To Ans
                  </Button>
                </Space.Compact>
                <span className="text-red-500">{customNotification}</span>
              </div>

              <div className="flex flex-col gap-3">
                <List
                  size="small"
                  header={<div className="text-center font-[500]">Options</div>}
                  bordered
                  dataSource={optionList}
                  renderItem={(item, index) => (
                    <List.Item>
                      <div className="flex gap-3">
                        <p>{item}</p>
                        <span
                          onClick={(e) => handleOptionRemove(index)}
                          className="cursor-pointer"
                        >
                          <DeleteOutlined></DeleteOutlined>
                        </span>
                      </div>
                    </List.Item>
                  )}
                />
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
