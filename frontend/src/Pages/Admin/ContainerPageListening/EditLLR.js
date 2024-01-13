import React, { useState } from "react";
import { Input, Button, Space, List, Select, InputNumber, Radio } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import TextArea from "antd/es/input/TextArea";
import { UpdatListening } from "../../../redux/adminslice/Listening";
import IconCross from "../../../Assets/SVG/IconCross";
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
export default function EditLLR() {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const [data, setData] = useState(state);
  const [ans, setAns] = useState([]);
  const [time, setTime] = useState(data.time);
  const [level, setLevel] = useState(data.level);
  const [innerType, setInnerTypr] = useState(data.inner_type);
  const [senerio, setSenerio] = useState(data.title);
  const [option, setOption] = useState();
  const [optionsList, setOptionsList] = useState([]);
  const [customNotification, setCustomNotification] = useState();
  const [audioText, setAudioText] = useState("");
  const [summary, setSummary] = useState(state.qa.additionalData.summary);
  const [convsersationList, setConversationList] = useState(state.qa.convsersationList);
  let [conIndex, setConIndex] = useState(convsersationList.length);

  const handleSave = () => {
    const additionalData={
      'summary':summary,
    }
    const doc = {
      id: data.id,
      inner_type: innerType,
      qa: {additionalData,convsersationList},
      time,
      level,
      type: 5,
      title:senerio
    };

    dispatch(UpdatListening(doc));
  };

  
  const handleOPSave = (e) => {
    if (optionsList.includes(option)) {
      setCustomNotification("Already saved!");
    } else {
      setOptionsList((prev) => [...prev, option]);
      setCustomNotification();
      setOption("");
    }
  };
  const handleOPRemove = (e) => {
    const newData = optionsList.filter(function (item, index) {
      return index !== e;
    });

    setOptionsList(newData);
  };

  const saveConversation = () => {
    const conversationData = {
      [conIndex]: {
        audio: audioText,
        options: optionsList,
        ans: ans[0],
      },
    };

    setConversationList((prev) => [...prev, conversationData]);
    setConIndex(++conIndex);

    setAudioText("");
    setOptionsList([]);
    setAns([]);
  };

  const handleConversationRemove = (index) => {
    const newConversationData = convsersationList.filter(
      (val, i) => i !== index
    );
    setConversationList(newConversationData);
    setConIndex(--conIndex);
  };

  console.log(convsersationList);

  return (
    <div className="w-full m-auto h-auto block px-5 py-1">
      <div className="flex justify-center gap-3">
        <div className="bg-gray-300/40 w-[70%]">
          <h1 className="text-[25px] font-[500] text-center px-2 py-2 bg-gray-200/70">
            Edit--[ Listen then Respond ]
          </h1>
          <div className="w-[90%] border-2 px-5 py-5 h-auto m-auto mt-10">
            <div className="h-auto flex flex-col gap-3">
              <Input
                style={{ height: "2rem" }}
                placeholder="Title of Test"
                disabled
                value={`${data.index} Listen and Respond`}
              />

              <div className="flex flex-col justify-between gap-3">
                <div>
                  <h1>
                    Question senerio Ex: '(A conversation- you need an extra
                    class as because you missed last class)
                  </h1>
                  <TextArea
                    value={senerio}
                    onChange={(e) => setSenerio(e.target.value)}
                    placeholder="Conversation Senerio"
                  ></TextArea>

                  <div className="mt-5">
                    <h1>Audio Text</h1>
                    <Input
                      value={audioText}
                      onChange={(e) => setAudioText(e.target.value)}
                      placeholder="audio Text"
                    ></Input>
                  </div>

                  <div className="mt-5">
                    <p>Options to choose</p>
                    <div className="flex gap-3 w-full">
                      <div className="w-[60%]">
                        <Input
                          value={option}
                          onChange={(e) => setOption(e.target.value)}
                        ></Input>
                        <span className="text-red-500">
                          {customNotification}
                        </span>
                      </div>
                      <Button
                        className="bg-blue-300  ml-2"
                        onClick={handleOPSave}
                      >
                        Add To Option
                      </Button>
                    </div>

                    <div className="flex gap-3 justify-between">
                      <div className="w-[60%]">
                        <List
                          size="small"
                          header={
                            <div className="text-center font-[500]">
                              Options List
                            </div>
                          }
                          bordered
                          dataSource={optionsList}
                          renderItem={(item, index) => (
                            <List.Item>
                              <div className="flex gap-3">
                                <p>{item}</p>
                                <span
                                  onClick={(e) => handleOPRemove(index)}
                                  className="cursor-pointer"
                                >
                                  <DeleteOutlined></DeleteOutlined>
                                </span>
                                <div className="px-1 py-1 bg-modt rounded-md text-white">
                                  <button onClick={(e) => setAns([item])}>
                                    Add To Ans
                                  </button>
                                </div>
                              </div>
                            </List.Item>
                          )}
                        />
                      </div>

                      <List
                        size="small"
                        header={
                          <div className="text-center font-[500]">Answer</div>
                        }
                        bordered
                        dataSource={ans}
                        renderItem={(item, index) => (
                          <List.Item>
                            <div className="flex gap-3">
                              <p>{item}</p>
                              <span
                                // onClick={(e) => handleQBreakRemove(index)}
                                className="cursor-pointer"
                              >
                                <DeleteOutlined></DeleteOutlined>
                              </span>
                            </div>
                          </List.Item>
                        )}
                      />
                    </div>

                    <div className=" w-full px-2 py-2 m-auto">
                      <button
                        onClick={saveConversation}
                        className="bg-tahiti px-2 py-2 w-full"
                      >
                        Add to Conversation
                      </button>
                    </div>
                  </div>
                   <div>
                  <TextArea
                  value={summary}
                  onChange={(e)=> setSummary(e.target.value)}
                  placeholder="Sample Summaray of Conversation"
                  >

                  </TextArea>
                </div>
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
                <InputNumber value={5} disabled />
                <p className="text-[15px] mt-1">Type</p>
              </div>
              <div className="flex gap-1 mt-3">
                <InputNumber value={data.inner_type} disabled />
                <p className="text-[15px] mt-1">Inner Type(Q sub cat)</p>
              </div>
              <div className="flex gap-5">
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
              Save to DB{" "}
              <span className="text-red-500 ml-2">
                (Please revised Conversation Before Save)
              </span>
            </Button>
          </div>
        </div>

        {/* Conversation OverView */}
        <div className="w-[30%] h-auto bg-white mt-10 px-2 py-2">
          <div className=" h-full px-2 py-2">
            <h1 className="text-[20px] text-center px-2 py-2 bg-header">
              Conversation
            </h1>
            <p className="text-[12px] text-red-400 text-center">
              NB:[while delete a conversation maintain index like (3-2-1)]
            </p>
            <div className=" px-2 py-2 text-[20px]  flex flex-col ">
              {convsersationList.map((val, index) => {
                // console.log(val[index].audio)
                // return
                return (
                  <div className="border-[2px] mt-5 ">
                    <div className="bg-header flex justify-between">
                      <h1 className="px-1 py-1">{index}</h1>
                      <div
                        onClick={(e) => handleConversationRemove(index)}
                        className="px-1 py-1 mt-1 cursor-pointer"
                      >
                        <IconCross height="1rem" width="1rem"></IconCross>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 justify-start">
                      {
                        // console.log((val[Object.keys(val)]))

                        val[Object.keys(val)]?.audio ? (
                          <div>
                            <h1 className=" px-2 py-2 flex flex-wrap">
                              Audio Text:
                              <span className="text-[15px] ml-2 mt-[5px]">
                                {val[Object.keys(val)]?.audio}
                              </span>
                            </h1>
                          </div>
                        ) : (
                          <div className="px-2 py-2 flex flex-wrap justify-center">
                            <h1>Pick an Option to Start the Conversation</h1>
                          </div>
                        )
                      }

                      <div className="flex justify-start gap-3  px-2 py-2">
                        <h1>Options</h1>
                        <div>
                          {val[Object.keys(val)]?.options.map((val, i) => {
                            return (
                              <div>
                                <div className="flex justify-start gap-3  flex-wrap">
                                  <Radio.Group>
                                    <Radio value={i}>{val}</Radio>
                                  </Radio.Group>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <h1 className=" px-2 py-2 flex flex-wrap">
                        Answer:{" "}
                        <span className="text-[15px] ml-2 mt-[5px]">
                          {val[Object.keys(val)]?.ans}
                        </span>
                      </h1>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
