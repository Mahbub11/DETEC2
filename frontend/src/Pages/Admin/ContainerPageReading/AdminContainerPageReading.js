import React, { useEffect, useState } from "react";
import { Select, Input, Skeleton, Modal } from "antd";
import ContainerTable from "../../../Components/Admin/ContainerTable";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import CreateRC from "./CreateRC";
import CreateRCS from "./CreateRCS";
import CreateRCP from "./CreateRCP";
import { getListOfReading } from "../../../redux/slices/getReadingList";
import PracticePageRC from "../../PracticeReading/PracticePageRC";
import PracticePageRCI from "../../PracticeReading/PracticePageRCI";
import PracticePageRCP from "../../PracticeReading/PracticePageRCP";
import PracticePageRCS from "../../PracticeReading/PracticePageRCS";
import PracticePageRGP from "../../PracticeReading/PracticePageRGP";
import PracticePageRHA from "../../PracticeReading/PracticePageRHA";
import CreateRCI from "./CreateRCI";
import CreateRGPT from "./CreateRGP";
import CreateRHA from "./CreateRHA";

const { Search } = Input;

export default function AdminContainerPageReading() {
  const dispatch = useDispatch();
  const { listRC, listRCS, listRCP, listRCI, listRHA, listRGPT } = useSelector(
    (state) => state.getReadingList
  );
  const [showCreate, setShowCreate] = useState(false);
  const [state, setState] = useState(true);
  const [busy, isBusy] = useState(true);
  const [type, setType] = useState(31);
  const [tableData, setTableData] = useState([]);
  const [filterData, setFilterData] = useState(tableData);
  const [nameInType, setNameType] = useState({
    title: "Read & Complete",
    inner_type: 31,
    link: "rc-r",
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
    dispatch(getListOfReading([],[]));
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
        title: "Complete the Sentences",
        inner_type: 32,
        link: "rcs-r",
      });
      setTableData(listRCS);
      setFilterData(listRCS);
    } else if (type === 33) {
      setNameType({
        title: "Complete the Passage",
        inner_type: 33,
        link: "rcp-r",
      });
      setTableData(listRCP);
      setFilterData(listRCP);
    } else if (type === 34) {
      setNameType({
        title: "Identify The Idea",
        inner_type: 34,
        link: "rci-r", // identify the idea
      });
      setTableData(listRCI);
      setFilterData(listRCI);
    } else if (type === 35) {
      setNameType({
        title: "Highlight the Answer",
        inner_type: 35,
        link: "rha-r", // select by mouse
      });
      setTableData(listRHA);
      setFilterData(listRHA);
    } else if (type === 36) {
      setNameType({
        title: "Give Passage Title",
        inner_type: 36,
        link: "rgpt-r",
      });
      setTableData(listRGPT);
      setFilterData(listRGPT);
    } else {
      setTableData(listRC);
      setFilterData(listRC);
      setNameType({
        title: "Read & Complete",
        inner_type: 31,
      });
    }
  }, [type, state, listRCI, listRC, listRCP, listRCS, listRHA, listRGPT]);

  console.log(tableData);

  const handlerefetch = () => {
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
                    { value: 32, label: "Complete the Sentence" },
                    { value: 33, label: "Complete the Passage" },
                    { value: 34, label: "Identify The Idea" },
                    { value: 35, label: "Highlight the Answer" },
                    { value: 36, label: "Give Passage Title" },
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
                    <div>
                      <CreateRCS
                        nameInType={nameInType}
                        length={tableData.length}
                        refetch={handlerefetch}
                      ></CreateRCS>
                    </div>
                  ) : (
                    <div></div>
                  )}
                  {nameInType.inner_type === 33 ? (
                    <div>
                      <CreateRCP
                        nameInType={nameInType}
                        length={tableData.length}
                        refetch={handlerefetch}
                      ></CreateRCP>
                    </div>
                  ) : (
                    <div></div>
                  )}
                  {nameInType.inner_type === 34 ? (
                    <div>
                      <CreateRCI
                        nameInType={nameInType}
                        length={tableData.length}
                        refetch={handlerefetch}
                      ></CreateRCI>
                    </div>
                  ) : (
                    <div></div>
                  )}
                  {nameInType.inner_type === 36 ? (
                    <div>
                      <CreateRGPT
                        nameInType={nameInType}
                        length={tableData.length}
                        refetch={handlerefetch}
                      ></CreateRGPT>
                    </div>
                  ) : (
                    <div></div>
                  )}
                  {nameInType.inner_type === 35 ? (
                    <div>
                      <CreateRHA
                        nameInType={nameInType}
                        length={tableData.length}
                        refetch={handlerefetch}
                      ></CreateRHA>
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
                <PracticePageRCS id={index}></PracticePageRCS>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div>
            {nameInType.inner_type === 33 ? (
              <div>
                <PracticePageRCP id={index}></PracticePageRCP>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div>
            {nameInType.inner_type === 34 ? (
              <div>
                <PracticePageRCI id={index}></PracticePageRCI>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div>
            {nameInType.inner_type === 36 ? (
              <div>
                <PracticePageRGP id={index}></PracticePageRGP>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div>
            {nameInType.inner_type === 35 ? (
              <div>
                <PracticePageRHA id={index}></PracticePageRHA>
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
