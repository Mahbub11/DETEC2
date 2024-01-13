import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ReactComponent as Tick } from "../../Assets/SVG/tick.svg";
import "./wordSelect.css";
const getUniqueId = (() => {
  const now = Date.now();
  let seed = 0;
  return () => `checkbox-button-${now}-${seed++}`;
})();

const CheckboxButton = ({ label, handleInputVal, answer }) => {
  let [checked, setChecked] = useState(false);
  const [uid, setUid] = useState(getUniqueId());
  const { visibility } = useSelector((state) => state.fillgap);

  const { checkbox } = useSelector((state) => state.wordSelect);

  useEffect(() => {
 
    setChecked(false);
  }, [label]);

  useEffect(() => {
    if (checked) {
      setChecked(false);
      setUid(getUniqueId())
    }
  }, [checkbox]);



  function handleChange(e) {
    // console.log(e.target, e.target.value, e.target.checked);
    setChecked(e.target.checked);
  }

  const cls = ` ${checked ? "checkbox-button-checked" : ""}`;

  return (
    <div className="font-poppins">
      <input
        disabled={visibility ? true : false}
        type="checkbox"
        value={label}
        id={uid}
        className={`${
          visibility ? "hidden" : "visible"
        } checkbox-button-hidden mt-[1rem] cursor-pointer sm:w-[95%]
         md:w-full border-[2px] border-blue-400 rounded-md block leading-10 px-2 py-2`}
        onChange={handleChange}
      />

      <span htmlFor={uid} className={`${visibility ? "visible" : "hidden"}`}>
        {answer.includes(label) ? (
          <div className="ml-[7px]">
            <Tick></Tick>
          </div>
        ) : (
          <div className="invisible">
            <Tick></Tick>
          </div>
        )}
      </span>
      <label
        onClick={(e) => handleInputVal(label)}
        htmlFor={uid}
        className={` ${cls} 
      text-[15px] mt-[-20px] text-center font-[400] pb-2 checkbox-button m-1 cursor-pointer sm:w-[95%] md:w-full
      border-[2px] border-blue-400 rounded-md block leading-10 sm:px-2 sm:py-2 md:px-3 md:py-2`}
      >
        {label}
      </label>
    </div>
  );
};

export default CheckboxButton;
