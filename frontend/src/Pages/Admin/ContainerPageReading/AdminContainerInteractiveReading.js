import React, { useEffect, useState } from "react";
import { Select, Input, Skeleton, Modal, Radio, InputNumber } from "antd";
import ContainerTable from "../../../Components/Admin/ContainerTable";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CreateRC from "./CreateRC";
import CreateRCS from "./CreateRCS";
import CreateRCP from "./CreateRCP";
import { getListOfReading } from "../../../redux/slices/getReadingList";
import PracticePageRC from "../../PracticeReading/PracticePageRC";
import CreateRCI from "./CreateRCI";
import CreateRGPT from "./CreateRGP";
import CreateRHA from "./CreateRHA";
import CreateRHA2 from "./CreateRHA2";
import {
  inilizeInteractiveReading,
} from "../../../redux/adminslice/Reading";
import { ShowNotification } from "../../../redux/actions";
import InteractiveReadingPracticeContainer from "../../ModuleReading/InteractiveReadingPracticeContainer";

const { Search } = Input;

export default function AdminContainerInteractiveReading() {
  const dispatch = useDispatch();
  const {
    listRC,
    listInteractive,
  } = useSelector((state) => state.getReadingList);
  const [showCreate, setShowCreate] = useState(false);
  const [state, setState] = useState(true);
  const [module, setModule] = useState(false);
  const [busy, isBusy] = useState(true);
  const [type, setType] = useState(3);
  const [tableData, setTableData] = useState([]);
  const [filterData, setFilterData] = useState(tableData);
  const [time, setTime] = useState(1);
  const [level, setLevel] = useState();
  const [data, setData] = useState()
  const [innerType, setInnerType] = useState(32);
  const [nameInType, setNameType] = useState({
    title: "Read & Complete",
    inner_type: 31,
    link: "rc-r",
  });

  const { initializeData } = useSelector((state) => state.Reading);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 720);
  const [index, setIndex] = useState();
  const [show, isShow] = useState(false);
  const config = isMobile
    ? { maxWidth: "98vw", padding: 0 }
    : { maxWidth: "80vw" };

  const handleQ = (id) => {
    setIndex(id);
    if(nameInType.inner_type ===32){
      const tempdata = listInteractive.filter((val) => id === val.index);
    setData(tempdata)
    }
    isShow(true);
  };
 

  useEffect(() => {
    if (initializeData && nameInType.inner_type === 32) {
      setModule(true);
    } else {
      setModule(false);
    }
  }, [initializeData, showCreate]);

  console.log(listInteractive);

  useEffect(() => {
    dispatch(getListOfReading([], []));
    isBusy(false);
  }, [showCreate, state]);

  useEffect(() => {
    if (type === 31) {
      setNameType({
        title: "Read & Complete",
        inner_type: 31,
        link: "rc-r",
      });
      setTableData(listRC);
      setFilterData(listRC);
    } else if (type === 32) {
      setNameType({
        title: "Interactive Reading",
        inner_type: 32,
        link: "rcs-r",
      });
      setTableData(listInteractive);
      setFilterData(listInteractive);
    } else {
      setTableData(listRC);
      setFilterData(listRC);
      setNameType({
        title: "Read & Complete",
        inner_type: 31,
        link: "rc-r",
      });
    }
  }, [type, state, listRC, listInteractive]);

  const handlerefetch = () => {
    setState(!state);
    // dispatch(clearInterActiveInitial())
  };
  const handleSearch = (e) => {
    if (e.target.value.length === 0) {
      setFilterData(tableData);
    } else {
      const newData = tableData.filter(
        (val) => val.index === parseInt(e.target.value)
      );

      setFilterData(newData);
    }
  };

  const initializeModule = () => {
    const data = {
      time,
      type:3,
      innerType,
      level,
    };

    if (time && type && innerType && level) {
      dispatch(inilizeInteractiveReading(data));
    } else {
      dispatch(
        ShowNotification({ severity: "error", message: "All Filled Required" })
      );
    }
  };

  return (
    <div>
      <div>
        {busy ? (
          <Skeleton active></Skeleton>
        ) : (
          <div>
            <div>
              <h1 className="text-center text-[25px] font-[500] px-2 py-2 underline">
                Reading CRUD | Type:3
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
                <Select
                  defaultValue="Read & Complete"
                  style={{ width: 320 }}
                  onChange={(e) => setType(e)}
                  options={[
                    { value: 31, label: "Read & Complete" },
                    { value: 32, label: "Interactive Reading" },
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
                placeholder="Search"
                enterButton
                onChange={handleSearch}
              />
            </div>

            <div className=" h-auto w-full mt-10">
              <ContainerTable
                handleQ={handleQ}
                title={nameInType.title}
                list={filterData}
                type={nameInType.link}
              ></ContainerTable>
            </div>
            <div className="h-auto">
              {showCreate ? (
                <div>
                  {nameInType.inner_type === 31 ? (
                    <div>
                      <CreateRC
                        nameInType={nameInType}
                        length={tableData.length}
                        refetch={handlerefetch}
                      ></CreateRC>
                    </div>
                  ) : (
                    <div></div>
                  )}
                  {nameInType.inner_type === 32 ? (
                    <div className="h-full">
                      <div className="w-[80%] m-auto py-5">
                        <Input
                          className="text-[20px] font-[600] font-poppins"
                          style={{ height: "2rem" }}
                          placeholder="Title of Test"
                          disabled
                          value={`${initializeData?.id}. Interactive Reading`}
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
                              <Radio.Group
                                onChange={(e) => setLevel(e.target.value)}
                                defaultValue="a"
                              >
                                <Radio.Button value={1}>
                                  {"Easy < 90"}
                                </Radio.Button>
                                <Radio.Button value={2}>
                                  {"Medium < 110"}
                                </Radio.Button>
                                <Radio.Button value={3}>
                                  {"Hard < 130"}
                                </Radio.Button>
                              </Radio.Group>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <div className="flex gap-1 mt-3">
                              <InputNumber
                                className="h-min"
                                value={3}
                                disabled
                              />
                              <p className="text-[15px] mt-1">Type</p>
                            </div>
                            <div className="flex gap-1 mt-3">
                              <InputNumber
                                className="h-min"
                                value={nameInType.inner_type}
                                disabled
                              />
                              <p className="text-[15px] mt-1">
                                Inner Type(Q sub cat)
                              </p>
                            </div>

                            <button
                              onClick={initializeModule}
                              className="px-2 py-2 bg-tahiti mt-3 rounded-md w-[20%] text-[18px]"
                            >
                              initialize
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div></div>
                  )}

                  {module ? (
                    <div>
                      <div>
                        <CreateRCS
                          id={initializeData?.id}
                          refetch={handlerefetch}
                        ></CreateRCS>
                      </div>
                      <div>
                        <CreateRCP
                          id={initializeData?.id}
                          refetch={handlerefetch}
                        ></CreateRCP>
                      </div>
                      
                      <div>
                        <CreateRHA
                          id={initializeData.id}
                          refetch={handlerefetch}
                        ></CreateRHA>
                      </div>
                      <div>
                        <CreateRCI
                          id={initializeData.id}
                          refetch={handlerefetch}
                        ></CreateRCI>
                      </div>
                      <div>
                        <CreateRGPT
                          id={initializeData.id}
                          refetch={handlerefetch}
                        ></CreateRGPT>
                      </div>
                      <div>
                        <CreateRHA2
                          id={initializeData.id}
                          refetch={handlerefetch}
                        ></CreateRHA2>
                      </div>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              ) : (
                ""
              )}
            </div>

            <div></div>
          </div>
        )}
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
            {nameInType.inner_type === 31 ? (
              <div>
                <PracticePageRC id={index}></PracticePageRC>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div>
            {nameInType.inner_type === 32 ? (
              <div>
                
                <InteractiveReadingPracticeContainer data={data}></InteractiveReadingPracticeContainer>
              </div>
            ) : (
              <div></div>
            )}
          </div>
         
        </Modal>
      </div>
    </div>
  );
}
