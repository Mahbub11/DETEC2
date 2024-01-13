import { Modal, Radio } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookmarkList from "../../Components/Module/writing/BookmarkList";
import InteractiveReadingPracticeContainer from "../ModuleReading/InteractiveReadingPracticeContainer";

export default function Bookmark() {
  const dispatch = useDispatch();
  const [fetch, setFetch] = useState(false);
  const {listInteractive } = useSelector((state) => state.getReadingList);
  const {
    bookmarkList,
    listVocabulary,
    listReading,
    listWriting,
    listSpeaking,
    listListening,
  } = useSelector((state) => state.bookmark);
  const [flag, setFlag] = useState("1");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 720);
  const [data, setData] = useState([]);
  const [iData,setIdata]= useState();
  const [show,isShow]= useState(false)
  const config = isMobile
    ? { maxWidth: "98vw", padding: 0 }
    : { maxWidth: "80vw" };


  useEffect(() => {
    if (flag === "1") {
      setData(
        listVocabulary.map((val) => ({
          ...val,
          itype: {
            type: "vrs-v",
            name: "Vocabulary Test",
          },
        }))
      );
    } else if (flag === "2") {
      setData(
        listWriting.map((val) => ({
          ...val,
          itype:
            val.inner_type === 21
              ? {
                  type: "wap-w",
                  name: "Write about the Photo",
                }
              : val.inner_type === 22
              ? {
                  type: "rtw-w",
                  name: "Read then Write",
                }
              : "",
        }))
      );
    } else if (flag === "3") {
      setData(
        listReading.map((val) => ({
          ...val,
          itype:
            val.inner_type === 31
              ? {
                  type: "rc-r",
                  name: "Read and Complete",
                }
              : val.inner_type === 32
              ? {
                  type: "ri-r",
                  name: "Interactive Reading",
                }
              : "",
        }))
      );
    } else if (flag === "4") {
      setData(
        listSpeaking.map((val) => ({
          ...val,
          itype:
            val.inner_type === 41
              ? {
                  type: "sal-s",
                  name: "Read Aloud",
                }
              : val.inner_type === 42
              ? {
                  type: "sap-s",
                  name: "Speak about the Photo",
                }
              : val.inner_type === 43
              ? {
                  type: "srs-s",
                  name: "Read then Speak",
                }
              : val.inner_type === 44
              ? {
                  type: "sls-s",
                  name: "Listen then Speak",
                }
              : "",
        }))
      );
    } else if (flag === "5") {
      setData(
        listListening.map((val) => ({
          ...val,
          itype:
            val.inner_type === 51
              ? {
                  type: "llt-l",
                  name: "Listen and Type",
                }
              : val.inner_type === 52
              ? {
                  type: "llr-l",
                  name: "Listen and Respond",
                }
              : "",
        }))
      );
    } else {
      setData(
        listVocabulary.map((val) => ({
          ...val,
          itype: "vrs-v",
        }))
      );
    }
  }, [flag, fetch]);

  const handleRefetch = () => {
    setFetch(!fetch);
  };

  const handleIR =(id)=>{
    const tempdata = listInteractive.filter((val) => id === val.id);
    setIdata(tempdata)
    isShow(true)

  }
  const modalClose=()=>{
    isShow(false)
   
  }
  const handleCloseModal=()=>{
    isShow(false);
  
  }


  return (
    <div
      className="md:flex md:flex-row sm:flex sm:flex-col  justify-center gap-3 h-full  
             w-full mt-[2rem] "
    >
      <div className="py-5 px-4 md:w-[80%] sm:w-full">
        <BookmarkList handleIR={handleIR} list={data} handleRefetch={handleRefetch}></BookmarkList>
      </div>
      <div>
        <div className="h-min w-auto  md:px-5 md:py-5 sm:px-2 sm:py-4">
          <Radio.Group
            onChange={(e) => setFlag(e.target.value)}
            defaultValue="1"
            buttonStyle="solid"
          >
            <div className="md:flex md:flex-col sm:flex sm:flex-row sm:flex-wrap gap-3 font-montserrat">
              <Radio.Button
                style={{
                  background: flag === "1" ? "#3AB7BF" : "#FFFF",
                  color: flag === "1" ? "#FFFF" : "	#000000",
                  fontFamily: "inherit",
                }}
                value="1"
              >
                Vocabulary
              </Radio.Button>
              <div className="flex gap-1">
                <Radio.Button
                  style={{
                    background: flag === "3" ? "#3AB7BF" : "#FFFF",
                    color: flag === "3" ? "#FFFF" : "	#000000",
                    fontFamily: "inherit",
                  }}
                  value="3"
                >
                  Reading
                </Radio.Button>
              </div>

              <div className="flex gap-1 ">
                <Radio.Button
                  style={{
                    background: flag === "2" ? "#3AB7BF" : "#FFFF",
                    color: flag === "2" ? "#FFFF" : "	#000000",
                    fontFamily: "inherit",
                  }}
                  value="2"
                >
                  Writing
                </Radio.Button>
              </div>

              <div className="flex gap-1">
                <Radio.Button
                  style={{
                    background: flag === "4" ? "#3AB7BF" : "#FFFF",
                    color: flag === "4" ? "#FFFF" : "	#000000",
                    fontFamily: "inherit",
                    width: "100%",
                    height: "100%",
                  }}
                  value="4"
                >
                  Speaking
                </Radio.Button>
              </div>
              <div className="flex gap-1">
                <Radio.Button
                  style={{
                    background: flag === "5" ? "#3AB7BF" : "#FFFF",
                    color: flag === "5" ? "#FFFF" : "	#000000",
                    fontFamily: "inherit",
                  }}
                  value="5"
                >
                  Listening
                </Radio.Button>
              </div>
            </div>
          </Radio.Group>
        </div>
      </div>
      <div className="flex justify-center m-auto">
        <Modal
          style={config}
          footer={null}
          closable={false}
          width="md:w-[100%] sm:w-full"
          open={show}
          maskClosable={false}
          className=" top-[1rem] m-auto z-10"
         >
          <div>
            <InteractiveReadingPracticeContainer  handleCloseModal={handleCloseModal}  data={iData}></InteractiveReadingPracticeContainer>
          </div>
        </Modal>
      </div>
    </div>
  );
}
