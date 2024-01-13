import React, { useState } from "react";
import { Input, Button, Space, List, Radio, InputNumber } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { SaveVoc } from "../../../redux/adminslice/vocabulary";
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
export default function VocCreate({ refetch, length }) {
  const dispatch = useDispatch();
  const [vocList, setVocList] = useState([]);
  const [ansList, setAnsList] = useState([]);
  const [voc, setVoc] = useState();
  const [time, setTime] = useState(1);
  const [level, setLevel] = useState();
  const [type, setType] = useState(1);
  const [innerType, setInnerType] = useState(11);
  const [customNotification, setCustomNotification] = useState();

  const handleSave = (e) => {
    if (vocList.includes(voc)) {
      setCustomNotification("Already saved!");
    } else {
      setVocList((prev) => [...prev, voc]);
      setCustomNotification();
    }
  };

  const handleAnsSave = (e) => {
    if (ansList.includes(voc)) {
      setCustomNotification("Already saved!");
    } else {
      setAnsList((prev) => [...prev, voc]);
      setCustomNotification();
    }
  };

  const handleVocRemove = (e) => {
    const newData = vocList.filter(function (item, index) {
      return index !== e;
    });

    setVocList(newData);
  };
  const handleAnsRemove = (e) => {
    const newData = ansList.filter(function (item, index) {
      return index !== e;
    });

    setAnsList(newData);
  };

  const handleVocSave = () => {
    if (vocList.length === 0 || ansList.length === 0) {
      dispatch(
        ShowNotification({
          severity: "error",
          message: "Must have some Vocabulary List during Save",
        })
      );
    } else {
      const doc = { time, level, vocList, ansList, type, innerType };
      dispatch(SaveVoc(doc));
      setTime(1);
      setVocList([]);
      setAnsList([]);

      refetch();
    }
  };

  return (
    <div className="w-[90%] m-auto h-auto block px-5 py-1">
      <div className="bg-gray-300/40 ">
        <h1 className="text-[25px] font-[500] text-center px-2 py-2 bg-gray-200/70">
          Add Vocabulary Test
        </h1>
        <div className="w-[70%] border-2 px-5 py-5 h-auto m-auto mt-10">
          <div className="h-auto">
            <Input
              style={{ height: "2rem" }}
              placeholder="Title of Test"
              disabled
              value={`${++length} Vocabulary test`}
            />
            <div className="flex gap-1 mt-3">
              <InputNumber
                min={1}
                max={10}
                value={time}
                onChange={(e) => setTime(e)}
              />
              <p className="text-[15px] mt-1">Min</p>
            </div>
            <div className="flex gap-1 mt-3">
              <InputNumber
                min={1}
                max={10}
                value={time}
                onChange={(e) => setTime(e)}
                disabled
              />
              <p className="text-[15px] mt-1">Type</p>
            </div>
            <div className="flex gap-1 mt-3">
              <InputNumber
                min={1}
                max={10}
                value={time}
                onChange={(e) => setTime(e)}
                disabled
              />
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
          <div className="flex justify-between mt-2">
            <div>
              <Space.Compact style={{ width: "100%" }}>
                <Input onChange={(e) => setVoc(e.target.value)} />
                <Button onClick={handleSave} className="bg-blue-300 ">
                  Add
                </Button>
                <Button onClick={handleAnsSave} className="bg-blue-300  ml-2">
                  Add To Ans
                </Button>
              </Space.Compact>
              <span className="text-red-500">{customNotification}</span>
            </div>
            <List
              size="small"
              header={
                <div className="text-center font-[500] ">Added Vocabulary</div>
              }
              bordered
              dataSource={vocList}
              renderItem={(item, index) => (
                <List.Item>
                  <div className="flex gap-3">
                    <p>{item}</p>
                    <span
                      onClick={(e) => handleVocRemove(index)}
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
