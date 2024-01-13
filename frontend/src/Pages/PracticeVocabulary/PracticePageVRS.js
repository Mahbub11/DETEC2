import React, { useEffect, useState } from "react";
import { notification, Collapse, Skeleton } from "antd";
import { Statistic } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  ToggleVisibility,
  DisableVisibility,
} from "../../redux/slices/fillgap";
import SingleWordChoice from "../../Components/Vocabulary/SingleWordChoice";
import { getWordDetails } from "../../redux/slices/disctionary";
import {
  CleanUserchoice,
  removeChecked,
  saveVocStatistic,
} from "../../redux/slices/wordSelect";
import IconCross from "../../Assets/SVG/IconCross";
import IconsArrowLeft from "../../Assets/SVG/IconsArrowLeft";
import IconsArrowRight from "../../Assets/SVG/IconsArrowRight";
import { StarOutlined, StarFilled, StarTwoTone } from "@ant-design/icons";
import { toggleBookmark } from "../../redux/slices/bookmark";
const { Countdown } = Statistic;

export default function PracticePageVRS({ id,handleCloseModal }) {
  const [api, contextHolder] = notification.useNotification();
  const [timeDanger, setTimeDanger] = useState(false);
  const [busy, isBusy] = useState(true);
  const dispatch = useDispatch();
  let [vocData, setVocData] = useState({});
  let [vocIndex, setVocIndex] = useState(id);
  const [deadline, setDeadline] = useState(1);
  const { list } = useSelector((state) => state.getVocList);
  const { userChoice, error } = useSelector((state) => state.wordSelect);
  const { userInfo } = useSelector((state) => state.auth);
  const [bColor, setBcolor] = useState(true);
  const [showModelAns, setShowModelAns] = useState(false);
  const { rid } = useParams();
  let dataLength = list.length;

  const openNotification = () => {
    
    notification.open({
      message: `Times Up`,
      placement: "top",
      type: "warning",
      style: {
        border: "2px solid red",
      },
    });
  };
  useEffect(() => {
    setVocIndex(id);
  }, [id]);

  useEffect(() => {
    if (id) {
      const data = list.filter((val, index) => vocIndex === val.index);
      setVocData(data[0]);
      setBcolor(data[0].bookmark);
    } else {
      const data = list.filter((val, index) => parseInt(rid) === val.id);
      setBcolor(data[0].bookmark);
      setVocData(data[0]);
    }

    isBusy(false);
    setDeadline(Date.now() + vocData.time * 60000);
    dispatch(DisableVisibility());
    dispatch(CleanUserchoice());
  }, [vocData, vocIndex, busy]);

  const handleNext = () => {
    if (vocIndex <= --dataLength) {
      setVocIndex(++vocIndex);
      dispatch(removeChecked());
      setShowModelAns(false)
    }
  };
  const handlePrev = () => {
    if (vocIndex > 1) {
      setVocIndex(--vocIndex);
      dispatch(removeChecked());
      setShowModelAns(false)
    }
  };

  const handleEvaluate = () => {
    dispatch(ToggleVisibility());
    setShowModelAns(true)

    const correctResult = vocData.qa.a.filter((element) =>
      userChoice.includes(element)
    );
    const ansLength = vocData.qa.a.length;

    const statData = {
      user: userInfo.id,
      qn: vocData.id,
      level: vocData.level,
      type: vocData.type,
      inner_type: vocData.inner_type,
      time: vocData.time,
      result: ((correctResult.length / ansLength) * 100).toFixed(2),
    };

    dispatch(saveVocStatistic(statData));
    dispatch(CleanUserchoice());
  };
  const handleMeaning = (val) => {
    dispatch(getWordDetails(val.target.textContent));
  };

  const handleRetry = () => {
    setShowModelAns(false)
    dispatch(removeChecked());
    dispatch(DisableVisibility());
  };
  const handleBookmark = (id, type, inner_type) => {
    setBcolor(!bColor);
    const data = {
      id,
      type,
      inner_type,
    };
    dispatch(toggleBookmark(data));
  };

  const closeModalWindow = () => {
   setShowModelAns(false)
    setDeadline(null);
    handleCloseModal();

  };

  return (
    <div>
      {busy ? (
        <div>
          {" "}
          <Skeleton active></Skeleton>
        </div>
      ) : (
        <div className="h-auto w-[99%] m-auto bg-[#fffffff7] md:px-5 md:py-5">
           <div
              onClick={closeModalWindow}
              className="absolute right-0 mr-3 md:mt-[-1rem] cursor-pointer"
            >
             <span><IconCross height='1rem' width='1rem'></IconCross></span>
            </div>
          <div className="flex flex-col gap-5">
            <h1 className="text-[22px] font-montserrat font-[500] underline self-center">
              Read and Select
            </h1>
            <div className="flex justify-between m-auto w-full">
              <div className="self-start ">
                <div className="flex justify-start gap-4  font-[400] sm:ml-3 md:ml-0">
                  <p className="bg-[#EFECEC] px-2 py-2 rounded-md">
                    {vocData.level === 1
                      ? "Easy"
                      : vocData.level === 2
                      ? "Medium "
                      : "Hard"}
                  </p>
                  <p className="bg-[#EFECEC] px-2 py-2 rounded-md">
                    Practice: {vocData.practice}
                  </p>
                  <p className="bg-[#EFECEC] px-2 py-2 rounded-md">
                    Total Attempt: {vocData.total_tested}
                  </p>
                </div>
              </div>
              <div
                className="cursor-pointer"
                onClick={() =>
                  handleBookmark(vocData.id, vocData.type, vocData.inner_type)
                }
              >
                {bColor ? (
                  <StarFilled
                    style={{ fontSize: "20px", color: "#08c" }}
                  ></StarFilled>
                ) : (
                  <StarOutlined
                    style={{ fontSize: "20px", color: "#08c" }}
                  ></StarOutlined>
                )}
              </div>
            </div>

            <div className="ml-1 font-[500] text-[22px] bg-[#DDE9F8] w-min px-2 py-2 rounded-md fixed sm:right-0 top-20">
              <Countdown
                onChange={(e) => (e <= 60000 ? setTimeDanger(true) : "")}
                valueStyle={timeDanger ? { color: "red" } : { color: "blue" }}
                onFinish={openNotification}
                value={deadline}
                format="mm:ss"
              />
            </div>

            <h1 className="sm:text-[17px] md:text-[22px] md:block self-center font-poppins">
              Select the real English words in this list
            </h1>

            <div>
              <SingleWordChoice data={vocData?.qa}></SingleWordChoice>
            </div>

            <div className="flex gap-5 justify-center mt-10 font-poppins font-[500] sm:text-[12px] md:text-[15px]">
              <button
                onClick={handleRetry}
                className="bg-[#DDE9F8]  px-6 py-3 rounded-md drop-shadow-sm"
              >
                Retray
              </button>
              <button
                onClick={handleEvaluate}
                className="bg-[#DDE9F8]  px-6 py-3 rounded-md  drop-shadow-sm"
              >
                Evaluate
              </button>
            </div>

            <div className="mr-3">
              <div className="flex gap-2 justify-center m-auto w-min">
                <span
                  onClick={handlePrev}
                  className="m-auto w-min cursor-pointer"
                >
                  {" "}
                  <IconsArrowLeft width="1rem" height="1rem"></IconsArrowLeft>
                </span>
                <h1 className="border-[2px] text-[20px] font-[600] border-[#3AB7BF] px-2 py-2 rounded-md">
                  {vocIndex}
                </h1>
                <span
                  onClick={handleNext}
                  className="m-auto w-min cursor-pointer"
                >
                  {" "}
                  <IconsArrowRight width="1rem" height="1rem"></IconsArrowRight>
                </span>
              </div>
            </div>

            <div className={`${showModelAns ? 'block':'hidden'}`}>
              <div className="h-auto w-[95%] m-auto">
                <Collapse
                  accordion
                  items={[
                    {
                      key: "1",
                      label: "Model Answer",
                      children: (
                        <p className="flex gap-3">
                          {vocData.qa["a"].map((val) => (
                            <p
                              className="cursor-pointer md:hover:text-tahiti"
                              onClick={handleMeaning}
                            >
                              {val + "  "}
                            </p>
                          ))}
                        </p>
                      ),
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
