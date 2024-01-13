import { Input, InputNumber, Radio, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { UpdatReading } from "../../../redux/adminslice/Reading";
import EditRCI from "./EditRCI";
import EditRCP from "./EditRCP";
import EditRCS from "./EditRCS";
import EditRGPT from "./EditRGPT";
import EditRHA from "./EditRHA";
import EditRHA2 from "./EditRHA2";

export default function EditInteractiveReading() {
  const { state } = useLocation();
  const [data, setData] = useState(state);
  const [type, setType] = useState(3);
  const [tableData, setTableData] = useState([]);
  const [filterData, setFilterData] = useState(tableData);
  const [time, setTime] = useState(1);
  const [level, setLevel] = useState();
  const [innerType, setInnerType] = useState(32);
  const [rcs, setRCS] = useState([]);
  const [rcp, setRCP] = useState([]);
  const [rci, setRCI] = useState([]);
  const [rgpt, setRGPT] = useState([]);
  const [rha, setRHA] = useState([]);
  const [rha2, setRHA2] = useState([]);
  const [busy, isBusy] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    data.interactivereadings.map((val) => {
      if (val?.inner_type === 322) {
        setRCP(val);
      } else if (val?.inner_type === 321) {
        setRCS(val);
      } else if (val?.inner_type === 323) {
        setRCI(val);
      } else if (val?.inner_type === 325) {
        setRGPT(val);
      } else if (val?.inner_type === 324) {
        setRHA(val);
      } else if (val?.inner_type === 326) {
        setRHA2(val);
      }
    });
    isBusy(false);
  }, []);

  const handleUpdateReading = () => {
    const doc = {
      id: data.id,
      time,
      level,
    };
    dispatch(UpdatReading(doc));
  };
  return (
    <div>
      {busy ? (
        <Skeleton></Skeleton>
      ) : (
        <div>
          <div className="h-full">
            <div className="w-[80%] m-auto py-5">
              <Input
                className="text-[20px] font-[600] font-poppins"
                style={{ height: "2rem" }}
                placeholder="Title of Test"
                disabled
                value={`${data?.id}. Interactive Reading`}
              />

              <div>
                <div className="flex gap-3">
                  <div className="flex gap-1 mt-3">
                    <Radio.Group
                      onChange={(e) => setTime(e.target.value)}
                      defaultValue="1"
                    >
                      <Radio.Button value={5}>5 Minute</Radio.Button>
                      <Radio.Button value={6}>6 Minute</Radio.Button>
                      <Radio.Button value={7}>7 Minute</Radio.Button>
                      <Radio.Button value={8}>8 Minute</Radio.Button>
                      <Radio.Button value={9}>9 Minute</Radio.Button>
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
                    <Radio.Group onChange={(e) => setLevel(e.target.value)}>
                      <Radio.Button value={1}>{"Easy < 90"}</Radio.Button>
                      <Radio.Button value={2}>{"Medium < 110"}</Radio.Button>
                      <Radio.Button value={3}>{"Hard < 130"}</Radio.Button>
                    </Radio.Group>

                    <div className="bg-tahiti px-1 py-1">
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
                <div className="flex gap-3">
                  <div className="flex gap-1 mt-3">
                    <InputNumber className="h-min" value={3} disabled />
                    <p className="text-[15px] mt-1">Type</p>
                  </div>
                  <div className="flex gap-1 mt-3">
                    <InputNumber
                      className="h-min"
                      value={data.inner_type}
                      disabled
                    />
                    <p className="text-[15px] mt-1">Inner Type(Q sub cat)</p>
                  </div>

                  <button
                    onClick={handleUpdateReading}
                    className="px-1 py-1 bg-tahiti mt-2 rounded-md w-[20%] text-[18px]"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            {" "}
            <EditRCS data={rcs}></EditRCS>
            <EditRCP data={rcp}></EditRCP>
            <EditRHA data={rha}></EditRHA>
            <EditRCI data={rci}></EditRCI>
            <EditRGPT data={rgpt}></EditRGPT>
            <EditRHA2 data={rha2}></EditRHA2>
          </div>
        </div>
      )}
    </div>
  );
}
