import React, { useEffect, useState } from "react";
import { Select, Input, Modal } from "antd";
import ContainerTable from "../../../Components/Admin/ContainerTable";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getVocabularyList } from "../../../redux/slices/getVocList";
import PracticePageVRS from "../../PracticeVocabulary/PracticePageVRS";
import VocCreate from "./VocCreate";
const { Search } = Input;

export default function AdminContainerPageVoc() {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.getVocList);
  const [showCreate, setShowCreate] = useState(false);
  const [state, setState] = useState(true);
  const [filterData, setFilterData] = useState(list);
  const [data, setData] = useState(list);
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState();
  const [visual, setVisual] = useState();
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


  useEffect(() => {
    dispatch(getVocabularyList([],[]));
  }, [showCreate, state]);

  const handlerefetch = () => {
    setState(!state);
  };

  const handleSearch = (e) => {
    if (e.target.value.length === 0) {
      setFilterData(list);
    } else {
      const newData = list.filter(
        (val) => val.index === parseInt(e.target.value)
      );

      setFilterData(newData);
    }
  };

  return (
    <div>
      <div>
        <div>
          <h1 className="text-center text-[25px] font-[500] px-2 py-2 underline">
            Vocabulary CRUD | Type:1
          </h1>
        </div>
        <div className="flex justify-between mt-5">
          <div className="flex justify-between gap-2 flex-wrap">
            <Select
              defaultValue="Easy"
              style={{ width: 120 }}
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
            <div
              onClick={() => setShowCreate(!showCreate)}
              className="bg-gray-300/40 px-2 py-1 rounded-md"
            >
              {/* <Link to={'create'}> */}
              <PlusOutlined className="cursor-pointer"></PlusOutlined>

              {/* </Link> */}
            </div>
          </div>
          <Search
            className="md:w-[40%] sm:w-[20rem]  "
            placeholder="Type Question Number"
            enterButton
            onChange={handleSearch}
          />
        </div>

        <div className=" h-auto w-full mt-10">
          <ContainerTable
            handleQ={handleQ}
            title={"Vocabulary Test"}
            list={filterData}
            type="vrs-v"
          ></ContainerTable>
        </div>
        <div>
          {showCreate ? (
            <div>
              <VocCreate
                length={list.length}
                refetch={handlerefetch}
              ></VocCreate>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="flex justify-center m-auto">
        <Modal
          style={config}
          footer={null}
          maskClosable={false}
          onCancel={() => isShow(false)}
          width="md:w-[100%] sm:w-full"
          open={show}
          className=" top-[1rem] m-auto z-10"
        >
          <div>
            <PracticePageVRS id={1}></PracticePageVRS>
          </div>
        </Modal>
      </div>
    </div>
  );
}
