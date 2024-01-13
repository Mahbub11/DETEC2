import React, { useEffect, useImperativeHandle, useState } from "react";
import { Radio, Select, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { saveUserInput } from "../../redux/slices/fillgap";
import "./selectBox.css";
import { ReactComponent as Tick } from "../../Assets/SVG/tick.svg";
import { ShowOptionView } from "../../redux/slices/app";
const { Option } = Select;

export default function SelectBox({ value, ansWer, indexNumber }) {
  const [selected, setSelected] = useState([]);

  const { userInput } = useSelector((state) => state.fillgap);
  const { visibility } = useSelector((state) => state.fillgap);
  const { common } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ShowOptionView());
  }, [common]);

  const doc = value.split("*");
  const options = [];
  doc[1].split("-").map((val, index) => {
    options.push({
      value: val,
      label: val,
    });
  });

  const handleSelect = (index, e) => {
    setSelected({ ...selected, e });
    dispatch(
      saveUserInput({
        [index]: e,
      })
    );
    
  };

  return (
    <div
      className={`${
        visibility ? "px-2 py-[0.25rem] rounded-md leading-10" : ""
      } font-[23px] mt-[-6px] px-1 py-1`}
    >
      <p
        className={`${
          visibility ? "visible" : "hidden"
        } text-[15px] font-robotomono font[500] text-red-500 absolute ml-1 sm:mt-[-1.3rem] md:mt-[-1.3rem]`}
      >
        {ansWer.trim() === userInput[indexNumber] ? (
          <div className="mt-[10px]">
            {" "}
            <Tick></Tick>
          </div>
        ) : (
          ansWer
        )}
      </p>

      {/* <Select
          className={` ${visibility ? 'mt-[-2rem] ':""}`}
          // value={selected}
          onChange={(e)=>{handleSelect(indexNumber,e)}}
          size={6}
          onBlur={true}
          disabled={visibility ? true : false}
          style={{
            width: 90,
            height:25,
           
          }}
          options={options}
        /> */}

      <Select
        defaultValue={{
          label: `${visibility ? userInput[indexNumber] : ""} `,
          value: 0,
        }}
        style={{
          width: 110,
          height: 27,
        }}
        className={` ${visibility ? "mt-[-2rem] " : ""}`}
        onChange={(value) => handleSelect(indexNumber, value)}
      >
        {options.map((val, index) => {
          return (
            <Option style={{ background: "" }} value={val.value}>
              {common.showOption ? val.lebel : ""}
            </Option>
          );
        })}
      </Select>
    </div>
  );
}
