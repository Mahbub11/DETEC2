import React, { useEffect, useState } from "react";
import { Select, Input, Skeleton, Modal } from "antd";
import ContainerTable from "../../../Components/Admin/ContainerTable";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import CreateWAP from "./CreateWAP";
import { getListOfWriting } from "../../../redux/slices/getWritingList";
import PracticePageWAP from "../../PracticeWriting/PracticePageWAP";
import PracticePageRTW from "../../PracticeWriting/PracticePageRTW";
import CreateRTW from "./CreateRTW";
import CreateWS from "./CreateWS";
import PracticePageWS from "../../PracticeWriting/PracticePageWS";
const { Search } = Input;

export default function AdminContainerPageWriting() {
  const dispatch = useDispatch();
  const { listWAP, listRTW,listWS } = useSelector((state) => state.getWritingList);
  const [showCreate, setShowCreate] = useState(false);
  const [state, setState] = useState(true);
  const [busy, isBusy] = useState(true);
  const [type, setType] = useState(31);
  const [tableData, setTableData] = useState([]);
  const [filterData, setFilterData] = useState(tableData);
  const [nameInType, setNameType] = useState({
    title: "Write about the Photo",
    inner_type: 21,
    link: "wap-w",
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
    dispatch(getListOfWriting([],[]));
    isBusy(false);
  }, [showCreate, state]);

  useEffect(() => {
    if (type === 21) {
      setNameType({
        title: "Write about the Photo",
        inner_type: 21,
        link: "wap-w",
      });
      setTableData(listWAP);
      setFilterData(listWAP);
    } else if (type === 22) {
      setNameType({
        title: "Read then write",
        inner_type: 22,
        link: "rtw-w",
      });
      setTableData(listRTW);
      setFilterData(listRTW);
    }else if (type === 23) {
      setNameType({
        title: "Writing Sample",
        inner_type: 23,
        link: "ws-w",
      });
      setTableData(listWS);
      setFilterData(listWS);
    } else {
      setNameType({
        title: "Write about the Photo",
        inner_type: 21,
        link: "wap-w",
      });
      setTableData(listWAP);
      setFilterData(listWAP);
    }
  }, [type, state, listWAP, listRTW,listWS]);

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
                Writing CRUD | Type:2
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
                  defaultValue="Write about the Photo"
                  style={{ width: 320 }}
                  onChange={(e) => setType(e)}
                  options={[
                    { value: 21, label: "Write about the Photo" },
                    { value: 22, label: "Read then Write" },
                    { value: 23, label: "Writing Sample" },
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
                  {nameInType.inner_type === 21 ? (
                    <div>
                      <CreateWAP
                        nameInType={nameInType}
                        length={tableData.length}
                        refetch={handlerefetch}
                      ></CreateWAP>
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
                  {nameInType.inner_type === 22 ? (
                    <div>
                      <CreateRTW
                        nameInType={nameInType}
                        length={tableData.length}
                        refetch={handlerefetch}
                      ></CreateRTW>
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
                  {nameInType.inner_type === 23 ? (
                    <div>
                      <CreateWS
                        nameInType={nameInType}
                        length={tableData.length}
                        refetch={handlerefetch}
                      ></CreateWS>
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
            {nameInType.inner_type === 21 ? (
              <div>
                <PracticePageWAP id={index}></PracticePageWAP>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div>
            {nameInType.inner_type === 22 ? (
              <div>
                <PracticePageRTW id={index}></PracticePageRTW>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div>
            {nameInType.inner_type === 23 ? (
              <div>
                <PracticePageWS id={index}></PracticePageWS>
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
