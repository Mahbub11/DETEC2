import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, List, Radio, Space, Tag, Input } from "antd";
import { Link } from "react-router-dom";
import { Col, Pagination, PaginationProps, Row, Select, Table } from "antd";
import { StarOutlined, StarFilled, StarTwoTone } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import { toggleBookmark } from "../../../redux/slices/bookmark";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
const { Search } = Input;

export default function BookmarkList({ type, list, title, handleRefetch,handleIR }) {
  const [page, setPage] = useState(5);
  const [current, setCurrent] = useState(1);
  const dispatch = useDispatch();

  const handleRemoveBookmark = (id, type, inner_type) => {
    const data = {
      id,
      type,
      inner_type,
    };
    dispatch(toggleBookmark(data));
    handleRefetch();
  };
  

  const columns = [
    {
      title: "Module Name",
      dataIndex: "name",
      key: "name",
      render: (id, record) => (
        <div>
          {record.itype.type === "ri-r" ? (
            <button
            onClick={()=>handleIR(record.qNo)}
            className="sm:text-[15px] md:text-[21px] font-montserrat font-[400] flex gap-2"
          >
            <p>{record.itype.name}</p>
          </button>
          ) : (
            <Link
              target="_self"
              to={`/practice/${record.itype.type}/${record.qNo}`}
              className="sm:text-[15px] md:text-[21px] font-montserrat font-[400] flex gap-2"
            >
              <p>{record.itype.name}</p>
            </Link>
          )}
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "addition",
      key: "addition",
      render: (text, record) => (
        <div className="text-[21px] font-montserrat font-[400] md:flex md:gap-10 flex">
          <Popconfirm
            onConfirm={(e) =>
              handleRemoveBookmark(record.qNo, record.type, record.inner_type)
            }
            title="Delete Bookmark"
            description="Are you sure to delete this item?"
          >
            <Button className="border-none cursor-pointer mt-[-5px]">
              <DeleteOutlined className="cursor-pointer"></DeleteOutlined>
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  //

  const handleChange = (value) => {
    setPage(value);
  };

  const onChangePage = (page) => {
    console.log(page);
    setCurrent(page);
  };

  const handleClick = (myLink) => () => {
    window.location.href = myLink;
  };
  return (
    <div className="m-aut flex flex-col justify-center sm:pb-5">
      <div className="sm:w-full md:w-[90%] m-auto text-[21px] sm:overflow-scroll md:overflow-hidden">
        <Table
          dataSource={list}
          columns={columns}
          rowClassName="bg-[#f8f9fa] "
          style={{ fontSize: "20px" }}
          pagination={{
            pageSize: page,
            current: current,
            style: { display: "none" },
          }}
        />

        <div className="flex justify-center mt-5">
          <Select
            defaultValue={8}
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              {
                value: 5,
                label: "5",
              },
              {
                value: 8,
                label: "8",
              },
            ]}
          />

          <Pagination
            current={current}
            pageSize={page}
            onChange={onChangePage}
            total={list.length}
            // itemRender={itemRender}
          />
        </div>
      </div>

      {/* <List
        pagination={{
          position,
          align,
          default:4
        }}
        size="small"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item>
            <div className="flex justify-between w-full sm:h-[5rem] h-[3rem] ">
              <Link
                // onClick={handleClick(`/practice/${type}/${index}`)}
                to={(`/practice/${type}`)} state={{ id:index }}
                className="cursor-pointer sm:text-[17px] md:text-[19px] font-montserrat font-[400] flex gap-2"
                >
                <h1>
                  {" "}
                  {++index}. {listName}
                </h1>

                <div className="font-[500]">
                  <Tag className="h-6" color="volcano">
                    {"Easy <90"}
                  </Tag>
                  <Tag className="h-6" color="orange">
                    Unpracticed
                  </Tag>
                </div>
              </Link>

              <div className="m-auto font-[500]">
                <Tag color="blue"> Total Attempt:122</Tag>
              </div>
            </div>
          </List.Item>
        )}

        
      />
      <Pagination
            total={100} pageSize={6} showLessItems
          /> */}
    </div>
  );
}
