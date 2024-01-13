import React, { useEffect, useState } from "react";
import { Radio, Button, Modal } from "antd";
import { Line } from "@ant-design/charts";
import { DatePicker, Space } from "antd";
import { useSelector } from "react-redux";
import moment from "moment";
const { RangePicker } = DatePicker;

export default function Statistic() {
  const [flag, setFlag] = useState(1);
  const [size, setSize] = useState("middle");
  const [dateRange, setDateRange] = useState([]);
  const {
    statReading,
    statWriting,
    statVocabulary,
    statSpeaking,
    statListening,
    statData
  } = useSelector((state) => state.statistic);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (flag === 6) {
      const sortedData = getData(dateRange[0], dateRange[1], statVocabulary);
      const filterData = sortedData
        .sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() || a.result - b.result
        )
        // .sort((a, b) => a.result - b.result)
        .map((val) => ({
          // item:val.id,
          // type: `Question: ${val.id}`,
          year: `Date: ${moment(val.createdAt).format("DD-MM")}`,
          value: `${val.result}%`,
        }));
      setData(filterData);
    } else if (flag === 7) {
      const sortedData = getData(dateRange[0], dateRange[1], statReading);
      const filterData = sortedData
        .sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() || a.result - b.result
        )
        
        .map((val) => ({
          // item:val.id,
          // type: `Question: ${val.id}`,
          year: `Date: ${moment(val.createdAt).format("DD-MM")}`,
          value: `${val.result}%`,
        }));
      setData(filterData);
    }else if (flag === 8) {
      const sortedData = getData(dateRange[0], dateRange[1], statWriting);
      const filterData = sortedData
        .sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() || a.result - b.result
        )
        
        .map((val) => ({
          // item:val.id,
          // type: `Question: ${val.id}`,
          year: `Date: ${moment(val.createdAt).format("DD-MM")}`,
          value: `${val.result}%`,
        }));
      setData(filterData);
    }
    else if (flag === 9) {
      const sortedData = getData(dateRange[0], dateRange[1], statSpeaking);
      const filterData = sortedData
        .sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() || a.result - b.result
        )
      
        .map((val) => ({
          // item:val.id,
          // type: `Question: ${val.id}`,
          year: `Date: ${moment(val.createdAt).format("DD-MM")}`,
          value: `${val.result}%`,
        }));
      setData(filterData);
    }else if (flag === 7) {
      const sortedData = getData(dateRange[0], dateRange[1], statListening);
      const filterData = sortedData
        .sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() || a.result - b.result
        )
     
        .map((val) => ({
          // item:val.id,
          // type: `Question: ${val.id}`,
          year: `Date: ${moment(val.createdAt).format("DD-MM")}`,
          value: `${val.result}%`,
        }));
      setData(filterData);
    }
  }, [flag, dateRange]);

  function getData(start, end, data) {
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();

    return data.filter((item) => {
      console.log(item);
      const itemTime = new Date(item.createdAt).getTime();

      return itemTime >= startTime && itemTime <= endTime;
    });
  }

  const onChange = (date, dateString) => {
    setDateRange(dateString);
    console.log(dateString);
  };
;

  const config = {
    data,
    width: 800,
    height: 400,
    autoFit: true,
    xField: "year",
    yField: "value",
    seriesField: "type",
    stepType: "vh",
    xAxis: {
      title: {
        text: "",
        position: "end",
        offset: 0,
        spacing: 8,
        style: {
          fontSize: 11,
          fontWeight: 900,
          textAlign: "start",
        },
      },
      line: {
        style: {
          stroke: "black",
        },
      },
      tickLine: {
        style: {
          stroke: "black",
        },
      },
      label: {
        style: {
          fill: "black",
        },
      },
    },
    yAxis: {
      title: {
        text: "",
        position: "start",
        offset: 0,
        spacing: 8,
        max: 100,
        min: 0,
        reverse: true,
        style: {
          fontSize: 11,
          fontWeight: 900,
          textAlign: "end",
        },
      },
      line: {
        style: {
          stroke: "black",
        },
      },
      tickLine: {
        style: {
          stroke: "black",
        },
      },
      label: {
        style: {
          fill: "black",
        },
      },
    },

    point: {
      size: 5,
      shape: "diamond",
    },
    label: {
      style: {
        fill: "#707",
      },
    },
   
  };

  let chart;

  // Export Image
  const downloadImage = () => {
    chart?.downloadImage();
  };



  return (
    <div className=" h-full w-full md:px-5 md:py-4 sm:mt-[2rem] md:mt-0">
      <div className="md:flex md:flex-row sm:flex sm:flex-col justify-between md:gap-[5rem] sm:gap-2  w-full">
        <div
          className="sm:h-auto md:h-auto md:w-[70%] sm:w-full shadow-sm 
            flex justify-center m-auto items-center"
        >
          <div className="bg-header/30 px-2 rounded-sm py-3">
            <button
              type="button"
              onClick={downloadImage}
              style={{ marginRight: 24 }}
            >
              Export Image
            </button>
            <Space direction="vertical">
              <RangePicker onChange={onChange} size={size} />
            </Space>
            <Line
              {...config}
              onReady={(chartInstance) => (chart = chartInstance)}
            />
          </div>
        </div>
        <div className="flex flex-col w-[40%] bg-header/30 rounded-sm ">
          <div className="h-min md:px-2 mr-[23px] md:py-2 sm:px-1 sm:py-2 self-center">
            <h1 className="font-montserrat text-[20px] ml-1 underline py-2 font-[600]">
              Module
            </h1>
            <div>
              <Radio.Group
                defaultValue={1}
                buttonStyle="solid"
                onChange={(e) => setFlag(e.target.value)}
              >
                <div className="md:flex md:flex-col sm:flex sm:flex-row gap-3 sm:flex-wrap font-montserrat">
                  <Radio.Button
                    style={{
                      background: flag === 6 ? "#3AB7BF" : "#FFFF",
                      color: flag === 6 ? "#FFFF" : "	#000000",
                      fontFamily: "inherit",
                    }}
                    value={6}
                  >
                    VOCABULARY
                  </Radio.Button>
                  <div className="flex gap-1">
                    <Radio.Button
                      style={{
                        background: flag === 7 ? "#3AB7BF" : "#FFFF",
                        color: flag === 7 ? "#FFFF" : "	#000000",
                        fontFamily: "inherit",
                      }}
                      value={7}
                    >
                      READING
                    </Radio.Button>
                  </div>

                  <div className="flex gap-1 ">
                    <Radio.Button
                      style={{
                        background: flag === 8 ? "#3AB7BF" : "#FFFF",
                        color: flag === 8 ? "#FFFF" : "	#000000",
                        fontFamily: "inherit",
                      }}
                      value={8}
                    >
                      WRITING
                    </Radio.Button>
                  </div>

                  <div className="flex gap-1">
                    <Radio.Button
                      style={{
                        background: flag === 9 ? "#3AB7BF" : "#FFFF",
                        color: flag === 9 ? "#FFFF" : "	#000000",
                        fontFamily: "inherit",
                      }}
                      value={9}
                    >
                      SPEAKING
                    </Radio.Button>
                  </div>
                  <div className="flex gap-1">
                    <Radio.Button
                      style={{
                        background: flag === 10 ? "#3AB7BF" : "#FFFF",
                        color: flag === 10 ? "#FFFF" : "	#000000",
                        fontFamily: "inherit",
                      }}
                      value={10}
                    >
                      LISTENING
                    </Radio.Button>
                  </div>
                </div>
              </Radio.Group>
            </div>
          </div>

          <div className="h-min w-auto md:px-5 md:py-2 sm:px-1 sm:py-2 self-center">
            <h1 className="font-poppins text-[17px] underline py-2 font-[600]">
              Grand Score
            </h1>
            <div className="">
              <Radio.Group
                defaultValue={1}
                buttonStyle="solid"
                onChange={(e) => setFlag(e.target.value)}
              >
                <div className="md:flex md:flex-col sm:flex sm:flex-row gap-3 sm:flex-wrap font-montserrat">
                  <Radio.Button
                    style={{
                      background: flag === 1 ? "#3AB7BF" : "#FFFF",
                      color: flag === 1 ? "#FFFF" : "	#000000",
                      fontFamily: "inherit",
                    }}
                    value={1}
                  >
                    LITERACY
                  </Radio.Button>
                  <div className="flex gap-1">
                    <Radio.Button
                      style={{
                        background: flag === 2 ? "#3AB7BF" : "#FFFF",
                        color: flag === 2 ? "#FFFF" : "	#000000",
                        fontFamily: "inherit",
                      }}
                      value={2}
                    >
                      COMPREHENSION
                    </Radio.Button>
                  </div>

                  <div className="flex gap-1 ">
                    <Radio.Button
                      style={{
                        background: flag === 3 ? "#3AB7BF" : "#FFFF",
                        color: flag === 3 ? "#FFFF" : "	#000000",
                        fontFamily: "inherit",
                      }}
                      value={3}
                    >
                      PRODUCTION
                    </Radio.Button>
                  </div>

                  <div className="flex gap-1">
                    <Radio.Button
                      style={{
                        background: flag === 4 ? "#3AB7BF" : "#FFFF",
                        color: flag === 4 ? "#FFFF" : "	#000000",
                        fontFamily: "inherit",
                      }}
                      value={4}
                    >
                      CONVERSATION
                    </Radio.Button>
                  </div>
                </div>
              </Radio.Group>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
