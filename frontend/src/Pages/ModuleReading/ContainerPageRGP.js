import React, { useEffect, useState } from 'react'
import { Select, Space,Input, Modal } from "antd";
import ListData from '../../Components/Module/writing/ListData';
import { useSelector } from 'react-redux';
import PracticePageRGP from "../PracticeReading/PracticePageRGP";
const { Search } = Input;

export default function ContainerPageRGP() {
  const { listRGPT} = useSelector(
    (state) => state.getReadingList
  );

   const [isMobile, setIsMobile] = useState(window.innerWidth < 720);
  const [index, setIndex] = useState();
  const [show, isShow] = useState(false);
  const config = isMobile
    ? { maxWidth: "98vw", padding: 0 }
    : { maxWidth: "80vw" };
  const handleQ = (id) => {
    setIndex(id);
    isShow(true);
  };

  // useEffect(() => {
  //   window.onbeforeunload = function () {
  //     return true;
  //   };
  //   return () => {
  //     window.onbeforeunload = null;
  //   };
  // }, []);
  return (
    <div className="relative">
      <div>
        <div className="flex justify-between">
          <div className="flex justify-between gap-2 flex-wrap">
            <Select
              defaultValue="Easy"
              style={{ width: 120, color: "#000000" }}
              options={[
                { value: "Easy", label: "Easy" },
                { value: "Medium", label: "Medium" },
                { value: "Hard", label: "Hard" },
              ]}
            />
            <Select
              defaultValue="Question Number"
              style={{ width: 120 }}
              options={[
                { value: "New", label: "New" },
                { value: "Tested", label: "Tested" },
                { value: "questionN", label: "Question Number" },
              ]}
            />
            <Select
              defaultValue="Unpracticed"
              style={{ width: 120 }}
              options={[
                { value: "practiced", label: "Practiced" },
                { value: "unpracticed", label: "Unpracticed" },
              ]}
            />
          </div>
          <Search
            className="md:w-[40%] sm:w-[20rem] bg-blue-300 sm:h-[10%] rounded-md "
            placeholder="Search"
            enterButton
          />
        </div>

        <div className=" h-[20rem] w-full mt-10">
          <ListData
            list={listRGPT}
            title="Read and Complete"
            type="rc-r"
            handleQ={handleQ}
          ></ListData>
        </div>
      </div>

      <div className="flex justify-center m-auto">
        <Modal
          style={config}
          footer={null}
          onCancel={() => isShow(false)}
          width="md:w-[100%] sm:w-full"
          open={show}
          maskClosable={false}
          className=" top-[1rem] m-auto z-10"
        >
          <div>
            <PracticePageRGP id={index}></PracticePageRGP>
          </div>
        </Modal>
      </div>
    </div>
  )
}
