import React, { useEffect, useState } from "react";
import { Select, Input, Skeleton, Modal } from "antd";
import ContainerTable from "../../../Components/Admin/ContainerTable";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PracticePageLLR from "../../PracticeListening/PracticePageLLR";
import PracticePageLLT from "../../PracticeListening/PracticePageLLT";

import CreateLLT from "./CreateLLT";
import { getListOfListening } from "../../../redux/slices/getListeningList";
import CreateLLR from "./CreateLLR";

const { Search } = Input;

export default function AdminContainerPageListening() {
  const dispatch = useDispatch();
  const { listLLT, listLLR } = useSelector((state) => state.getListeningList);
  const [showCreate, setShowCreate] = useState(false);
  const [state, setState] = useState(true);
  const [busy, isBusy] = useState(true);
  const [type, setType] = useState(51);
  const [tableData, setTableData] = useState([]);
  const [filterData, setFilterData] = useState(tableData);
  const [nameInType, setNameType] = useState({
    title: "Listen and Type",
    inner_type: 51,
    link: "llt-l",
  });

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
    dispatch(getListOfListening([],[]));
    isBusy(false);
  }, [showCreate, state]);

  useEffect(() => {
    if (type === 51) {
      setNameType({
        title: "Listen and Type",
        inner_type: 51,
        link: "llt-l",
      });
      setTableData(listLLT);
      setFilterData(listLLT)
    } else if (type === 52) {
      setNameType({
        title: "Listen and Respond",
        inner_type: 52,
        link: "llr-l",
      });
      setTableData(listLLR);
      setFilterData(listLLR)
    } else {
      setNameType({
        title: "Listen and Type",
        inner_type: 51,
        link: "llt-l",
      });
      setTableData(listLLT);
      setFilterData(listLLT)
    }
  }, [type, state, listLLT, listLLR]);

  const handlerefetch = () => {
    console.log("called");
    setState(!state);
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

  return (
    <div>
      <div>
        {busy ? (
          <Skeleton active></Skeleton>
        ) : (
          <div>
            <div>
              <h1 className="text-center text-[25px] font-[500] px-2 py-2 underline">
                Speaking CRUD | Type:4
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
                  defaultValue="Listen and Type"
                  style={{ width: 320 }}
                  onChange={(e) => setType(e)}
                  options={[
                    { value: 51, label: "Listen and Type" },
                    { value: 52, label: "Listen and Respond" },
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
            <div>
              {showCreate ? (
                <div>
                  {nameInType.inner_type === 51 ? (
                    <div>
                      <CreateLLT
                        nameInType={nameInType}
                        length={tableData.length}
                        refetch={handlerefetch}
                      ></CreateLLT>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              ) : (
                <div></div>
              )}

              {showCreate ? (
                <div>
                  {nameInType.inner_type === 52 ? (
                    <div>
                      <CreateLLR
                        nameInType={nameInType}
                        length={tableData.length}
                        refetch={handlerefetch}
                      ></CreateLLR>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div></div>

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
            {nameInType.inner_type === 51 ? (
              <div>
                <PracticePageLLT id={index}></PracticePageLLT>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div>
            {nameInType.inner_type === 52 ? (
              <div>
                <PracticePageLLR id={index}></PracticePageLLR>
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
