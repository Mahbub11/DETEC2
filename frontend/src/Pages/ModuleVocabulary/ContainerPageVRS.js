import React, { useEffect, useState } from "react";
import { Select, Input, Skeleton, Modal } from "antd";
import ListData from "../../Components/Module/writing/ListData";
import { useDispatch, useSelector } from "react-redux";
import { getVocabularyList } from "../../redux/slices/getVocList";
import PracticePageVRS from "../PracticeVocabulary/PracticePageVRS";
const { Search } = Input;

export default function ContainerPageVRS() {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.getVocList);
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState(false);
  const [fpracUnprac, setFpracUnprac] = useState(false);
  const [markedFilter, setMarkedFilter] = useState(false);
  const [visual, setVisual] = useState();
  const [tableData, setTableData] = useState(list);
  const [filterData, setFilterData] = useState(list);
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

  const handleCloseModal=()=>{
    isShow(false);
  }



  // useEffect(() => {
  //   const filteredVals = list.filter((entry) =>
  //     entry.index.toString().includes(search)
  //   );
  //   setData(filteredVals);
  // }, [search]);

  // useEffect(() => {
  //   if (level) {
  //     const filteredVals = list.filter((entry) =>
  //       entry.level.toString().includes(level)
  //     );
  //     setData(filteredVals);
  //   } else {
  //     setData(list);
  //   }
  // }, [level]);

  // useEffect(() => {
  //   if (visual === "1") {
  //     const copyData = [...list];
  //     setData(copyData.sort().reverse());
  //   } else if (visual === "3") {
  //     setData(list);
  //   }
  // }, [visual]);

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

  useEffect(()=>{
        if (level || fpracUnprac || markedFilter) {
      const filteredVals = list.filter((entry) =>
        entry.level.toString().includes(level) || 
        entry.practice >0 ||
        entry.bookmark !== undefined
      );
      setFilterData(filteredVals);
    } else {
      setFilterData(list);
    }

  },[level,fpracUnprac,markedFilter,list])

  const handleLevel=(e)=>{
    setLevel(e)
    setFpracUnprac(false)
    setMarkedFilter(false)
    
  }
  const handlePracticeFilter=(e)=>{
    setLevel(false)
    setFpracUnprac(e)
    setMarkedFilter(false)
    
  }

  const handleMarked=(e)=>{
    setLevel(false)
    setFpracUnprac(false)
    setMarkedFilter(e)
  }



  return (
    <div>
      <div>
        <div className="flex justify-between">
          <div className="flex justify-between gap-2 flex-wrap">
            <Select
              onChange={(e) => handleLevel(e)}
              defaultValue="All Level"
              style={{ width: 120 }}
              options={[
                { value: false, label: "ALL" },
                { value: "1", label: "Easy" },
                { value: "2", label: "Medium" },
                { value: "3", label: "Hard" },
                
              ]}
            />
            <Select
            onChange={(e) => handlePracticeFilter(e)}
              defaultValue="Unpracticed"
              style={{ width: 120 }}
              options={[
                { value: 1, label: "Practiced" },
                { value: 0, label: "Unpracticed" },
              ]}
            />
            <Select
            title="Bookmark"
            onChange={(e) => handleMarked(e)}
              defaultValue="All"
              style={{ width: 120 }}
              options={[
                { value: 1, label: "Marked" },
                { value: 0, label: "ALL" },
              ]}
            />
          </div>
          <Search
            className="md:w-[40%] sm:w-[20rem] bg-blue-300 sm:h-[10%] rounded-md "
            placeholder="Search Question Number"
            onChange={handleSearch}
            enterButton
          />
        </div>

        <div className=" h-[20rem] w-full mt-10">
          <ListData
            handleQ={handleQ}
            title={"Vocabulary Test"}
            list={filterData}
            type="vrs-v"
          ></ListData>
        </div>
      </div>
      <div className="flex justify-center m-auto">
        <Modal
          style={config}
          footer={null}
          maskClosable={false}
          closable={false}
          width="md:w-[100%] sm:w-full"
          open={show}
          className=" top-[1rem] m-auto z-10"
        >
          <div>
            <PracticePageVRS  handleCloseModal={handleCloseModal} id={index}></PracticePageVRS>
          </div>
        </Modal>
      </div>
    </div>
  );
}
