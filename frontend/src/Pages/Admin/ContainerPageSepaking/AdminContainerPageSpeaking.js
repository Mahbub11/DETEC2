import React, { useEffect, useState } from "react";
import { Select, Input, Skeleton, Modal } from "antd";
import ContainerTable from "../../../Components/Admin/ContainerTable";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CreateSAL from "./CreateSAL";
import { getListOfSpeaking } from "../../../redux/slices/getSpeakingList";
import PracticePageSAL from "../../PracticeSpeaking/PracticePageSAL";
import PracticePageSAP from "../../PracticeSpeaking/PracticePageSAP";
import PracticePageSLS from "../../PracticeSpeaking/PracticePageSLS";
import PracticePageSRS from "../../PracticeSpeaking/PracticePageSRS";

import CreateSAP from "./CreateSAP";
import CreateSRS from "./CreateSRS";
import CreateSS from "./CreateSS";
import PracticePageSS from "../../PracticeSpeaking/PracticePageSS";

const { Search } = Input;

export default function AdminContainerPageSpeaking() {
  const dispatch = useDispatch();
  const { listSAL, listSAP, listSRS, listSLS,listSS } = useSelector(
    (state) => state.getSpeakingList
  );
  const [showCreate, setShowCreate] = useState(false);
  const [state, setState] = useState(true);
  const [busy, isBusy] = useState(true);
  const [type, setType] = useState(41);
  const [tableData, setTableData] = useState([]);
  const [filterData, setFilterData] = useState(tableData);
  const [nameInType, setNameType] = useState({
    title: "Read Aloud",
    inner_type: 41,
    link: "sal-s",
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
    dispatch(getListOfSpeaking([],[]));
    isBusy(false);
  }, [showCreate, state]);

  useEffect(() => {
    if (type === 41) {
      setNameType({
        title: "Read Aloud",
        inner_type: 41,
        link: "sal-s",
      });
      setTableData(listSAL);
      setFilterData(listSAL);
    } else if (type === 42) {
      setNameType({
        title: "Speak about the Photo",
        inner_type: 42,
        link: "sap-s",
      });
      setTableData(listSAP);
      setFilterData(listSAP);
    } else if (type === 43) {
      setNameType({
        title: "Read then Speak",
        inner_type: 43,
        link: "srs-s",
      });
      setTableData(listSRS);
      setFilterData(listSRS);
    } else if (type === 44) {
      setNameType({
        title: "Listen then Speak",
        inner_type: 44,
        link: "sls-s",
      });
      setTableData(listSLS);
      setFilterData(listSLS);
    } else if (type === 45) {
      setNameType({
        title: "Speaking Sample",
        inner_type: 45,
        link: "ss-s",
      });
      setTableData(listSS);
      setFilterData(listSS);
    } else {
      setNameType({
        title: "Read Aloud",
        inner_type: 41,
        link: "sal-s",
      });
      setTableData(listSAL);
      setFilterData(listSAL);
    }
  }, [type, state, listSAP, listSAL,listSS]);

  console.log(tableData);

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
                  defaultValue="Read Aloud"
                  style={{ width: 320 }}
                  onChange={(e) => setType(e)}
                  options={[
                    { value: 41, label: "Read Aloud" },
                    { value: 42, label: "Speak about the Photo" },
                    { value: 43, label: "Read then Speak" },
                    { value: 44, label: "Listen then Speak" },
                    { value: 45, label: "Speaking Sample" },
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
                  {nameInType.inner_type === 41 ? (
                    <div>
                      <CreateSAL
                        nameInType={nameInType}
                        length={tableData.length}
                        refetch={handlerefetch}
                      ></CreateSAL>
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
                  {nameInType.inner_type === 42 ? (
                    <div>
                      <CreateSAP
                        nameInType={nameInType}
                        length={tableData.length}
                        refetch={handlerefetch}
                      ></CreateSAP>
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
                  {nameInType.inner_type === 43 ? (
                    <div>
                      <CreateSRS
                        nameInType={nameInType}
                        length={tableData.length}
                        refetch={handlerefetch}
                      ></CreateSRS>
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
                  {nameInType.inner_type === 44 ? (
                    <div>
                      {/* SRS can be used as SLS */}
                      <CreateSRS
                        nameInType={nameInType}
                        length={tableData.length}
                        refetch={handlerefetch}
                      ></CreateSRS>
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
                  {nameInType.inner_type === 45 ? (
                    <div>
                      {/* SRS can be used as SLS */}
                      <CreateSS
                        nameInType={nameInType}
                        length={tableData.length}
                        refetch={handlerefetch}
                      ></CreateSS>
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
            {nameInType.inner_type === 41 ? (
              <div>
                <PracticePageSAL id={index}></PracticePageSAL>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div>
            {nameInType.inner_type === 42 ? (
              <div>
                <PracticePageSAP id={index}></PracticePageSAP>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div>
            {nameInType.inner_type === 44 ? (
              <div>
                <PracticePageSLS id={index}></PracticePageSLS>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div>
            {nameInType.inner_type === 45 ? (
              <div>
                <PracticePageSS id={index}></PracticePageSS>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          
          <div>
            {nameInType.inner_type === 43 ? (
              <div>
                <PracticePageSRS id={index}></PracticePageSRS>
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
