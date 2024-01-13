import React, { useState } from "react";
import { Tag } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Pagination, Select, Table, Button, Popconfirm } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { DeleteItem } from "../../redux/adminslice/vocabulary";

export default function ContainerTable({ type, list, title,handleQ }) {
  const [page, setPage] = useState(5);
  const [current, setCurrent] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const columns = [
    {
      title: "Title",
      dataIndex: "id",
      key: "id",
      render: (id, record) => (
        <div>
          {
            // <Link
            //   target="_self"
            //   to={`/practice/${type}/${record.index}`}
            //   className="sm:text-[15px] md:text-[21px] font-montserrat font-[400] flex gap-2"
            // >
            //   <p>{record.index}.</p>
            //   <p>{title}</p>
            //   <p>[DB:{record.id}]</p>
            // </Link>
            <button onClick={(e)=>handleQ(record.index)}  className="hover:text-blue-400 sm:text-[15px] md:text-[21px] font-montserrat font-[400] flex gap-2">
            <p>{record.index}.</p><p>{title}</p> <p>[DB:{record.id}]</p>
            
            </button>
          }
        </div>
      ),
    },
    {
      title: "Level-Practiced",
      dataIndex: "level",
      key: "level",
      render: (level, record) => (
        <div className="text-[21px] font-montserrat font-[400] ">
          <Tag className="h-6 shadow-sm" color="volcano">
            {level === 1
              ? "Easy < 90"
              : level === 2
              ? "Medium < 115"
              : "Hard < 130"}
          </Tag>
          <Tag className="h-6 shadow-sm" color="blue">
            Tested: {record.totalTested}
          </Tag>
        </div>
      ),
    },
    {
      title: "Type-Time",
      dataIndex: "type",
      key: "type",
      render: (type, record) => (
        <div className="text-[21px] font-montserrat font-[400] ">
          <Tag className="h-6 shadow-sm" color="volcano">
            Type: {type}
          </Tag>
          <Tag className="h-6 shadow-sm" color="blue">
            {record.time > 1
              ? `${record.time} min`
              : `${Math.floor(record.time * 60)} sec`}
          </Tag>
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "addition",
      key: "addition",
      render: (text, record) => (
        <div className="text-[21px] font-montserrat font-[400] md:flex md:gap-10 flex">
          <EyeOutlined className="cursor-pointer"></EyeOutlined>
          <Link to={`/admin/edit/${type}`} state={record}>
            <EditOutlined className="cursor-pointer"></EditOutlined>
          </Link>
          <Popconfirm
            onConfirm={(e)=> dispatch(DeleteItem(type,record.id))}
            title="Delete the task"
            description="Are you sure to delete this task?"
          >
            <Button className="border-none cursor-pointer mt-[-5px]">
              <DeleteOutlined className="cursor-pointer"></DeleteOutlined>
            </Button>
          </Popconfirm>
          {/* <DeleteOutlined className="cursor-pointer" onClick={(e)=> dispatch(DeleteItem(type,record.id))}></DeleteOutlined> */}
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
      <div className="sm:w-full md:w-[90%] m-auto text-[21px]">
        <Table
          dataSource={list}
          columns={columns}
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
    </div>
  );
}
