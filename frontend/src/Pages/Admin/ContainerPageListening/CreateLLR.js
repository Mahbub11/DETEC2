import React, { useState } from "react";
import { Input, Button, Space, List, Select, InputNumber, Radio } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { SaveVoc } from "../../../redux/adminslice/vocabulary";
import TextArea from "antd/es/input/TextArea";
import { SaveReading } from "../../../redux/adminslice/Reading";
import { SaveWriting } from "../../../redux/adminslice/Writing";
import { SaveSpeaking } from "../../../redux/adminslice/Speaking";
import { SaveListening } from "../../../redux/adminslice/Listening";
import IconCross from "../../../Assets/SVG/IconCross";

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
export default function CreateLLR({ refetch, length, nameInType }) {
  const dispatch = useDispatch();
  const [ans, setAns] = useState([]);
  const [time, setTime] = useState(1);
  const [level, setLevel] = useState();
  const [innerType, setInnerTypr] = useState(nameInType.inner_type);
  const [senerio, setSenerio] = useState();
  const [voiceActor, setVoiceActor] = useState(0);
  const [option, setOption] = useState();
  const [optionsList, setOptionsList] = useState([]);
  const [customNotification, setCustomNotification] = useState();
  const [audioText, setAudioText] = useState("");
  const [summary, setSummary] = useState();
  const [convsersationList, setConversationList] = useState([]);
  let [conIndex, setConIndex] = useState(0);

  const handleSave = () => {
    const additionalData={
      'summary':summary,
      voiceActor:voiceActor
    }
   
    const doc = {
      inner_type: innerType,
      qa: {additionalData,convsersationList},
      time,
      level,
      type: 5,
      title:senerio
    };

    console.log(doc)
   
    dispatch(SaveListening(doc));
    refetch();
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
  };


  console.log(convsersationList)

  return (
    <div className="w-full m-auto h-auto block px-5 py-1">
      <div className="flex justify-center gap-3">
        <div className="bg-gray-300/40 w-[70%]">
          <h1 className="text-[25px] font-[500] text-center px-2 py-2 bg-gray-200/70">
            Add--[ {nameInType.title} ]
          </h1>
          <div className="w-[90%] border-2 px-5 py-5 h-auto m-auto mt-10">
            <div className="h-auto flex flex-col gap-3">
              <Input
                style={{ height: "2rem" }}
                placeholder="Title of Test"
                disabled
                value={`${++length} Listen and Respond`}
              />

              <div className="flex flex-col justify-between gap-3">
                <div>
                  <h1>
                    Question senerio Ex: '(A conversation- you need an extra
                    class as because you missed last class)
                  </h1>
                  <TextArea
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
                    <h1>Voice Actor</h1>
                    <div className="flex gap-1 mt-3">
                      <Radio.Group
                        onChange={(e) => setVoiceActor(e.target.value)}
                        defaultValue="0"
                      >
                        <Radio.Button value={0}>David M</Radio.Button>
                        <Radio.Button value={1}>Mark M</Radio.Button>
                        <Radio.Button value={2}>Zira F</Radio.Button>
                        <Radio.Button value={3}>Google US</Radio.Button>
                        <Radio.Button value={4}>Google UK M</Radio.Button>
                        <Radio.Button value={5}>Google UK F</Radio.Button>
                      </Radio.Group>
                    </div>
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
                </div>

                <div>
                  <TextArea
                  onChange={(e)=> setSummary(e.target.value)}
                  placeholder="Sample Summaray of Conversation"
                  >

                  </TextArea>
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
                  <Radio.Button value={5.15}>5.15 Minute</Radio.Button>
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
              {convsersationList?.map((val, index) => {
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
                      {val[index]?.audio ? (
                        <div>
                          <h1 className=" px-2 py-2 flex flex-wrap">
                            Audio Text:
                            <span className="text-[15px] ml-2 mt-[5px]">
                              {val[index].audio}
                            </span>
                          </h1>
                        </div>
                      ) : (
                        <div className="px-2 py-2 flex flex-wrap justify-center">
                          <h1>Pick an Option to Start the Conversation</h1>
                        </div>
                      )}

                      <div className="flex justify-start gap-3  px-2 py-2">
                        <h1>Options</h1>
                        <div>
                          {val[index]?.options.map((val, i) => {
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
                          {val[index]?.ans}
                        </span>
                      </h1>
                      {/* <h1 className=" px-2 py-2 flex flex-wrap">
                        Voice Index:{" "}
                        <span className="text-[15px] ml-2 mt-[5px]">
                          {val[index].voiceActor}
                        </span>
                      </h1> */}
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
