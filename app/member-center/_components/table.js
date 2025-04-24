"use client";
import { useState, useRef, useEffect } from "react";
import moment from "moment";
import { useJoin } from "@/context/join";
import { useRouter } from "next/navigation";
import { FaEdit } from "react-icons/fa";
import EditModal from "./modal";
import { IoShareSocialSharp } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Table({ filteredList = [], setRefresh = () => {} }) {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [editData, setEditData] = useState({});
    const tableRef = useRef();
    const [height, setHeight] = useState(0);
    const { joinin } = useJoin();

    useEffect(() => {
        if (tableRef.current) {
            setHeight(tableRef.current.scrollHeight);
        }
    }, []);
    const editInfo = (list_data) => {
        setEditData(list_data);
        setShowModal(true);
    };
    const notify = () => {
        toast.success("已複製連結 !");
    };
    const handleShare = (group_uuid) => {
        const url = `${window.location.origin}/join-group?group_id=${group_uuid}`;
        navigator.clipboard.writeText(url);
        notify();
    };
    const onEnter = (groupId, password) => {
        if (!groupId.length) {
            setError({ group_uuid: "請輸入揪團ID" });
            return;
        }
        const fetchJoinGroup = async () => {
            const r = await joinin(groupId, password);
            if (r.success == true) {
                router.push(`/group/${groupId}`);
            }
        };
        fetchJoinGroup();
    };
    return (
        <>
            <div className="w-full overflow-x-auto  min-w-[800px]">
                {/* 表頭 */}
                <div
                    className={`hidden md:flex bg-gray-100 font-medium text-sm border-y border-gray-200 py-3 `}
                >
                    <div className="w-[5%] px-2">#</div>
                    <div className="w-[15%] px-3">揪團名稱</div>
                    <div className="w-[15%] px-3">揪團代號</div>
                    <div className="w-[15%] px-3">餐廳名稱</div>
                    {/* <div className="w-[8%] px-3">上限</div> */}
                    <div className="w-[17%] px-3">結束時間</div>
                    <div
                        className={`px-3 ${
                            parseInt(height) < 400 ? "w-[10%]" : "w-[9%] "
                        }`}
                    >
                        狀態
                    </div>
                    <div
                        className={` px-5 ${
                            parseInt(height) < 400 ? "w-[10%]" : "w-[9%]"
                        }`}
                    >
                        查看
                    </div>
                    <div className="w-[6%] px-3">編輯</div>
                    <div className="w-[6%] px-3">分享</div>
                </div>
                {/* 內容 */}
                <div className="max-h-[400px] overflow-y-auto " ref={tableRef}>
                    {filteredList?.length <= 0 ? (
                        <>
                            <div className="hidden md:flex font-medium text-sm border-y py-5 px-3 ">
                                空空的，快來揪團吧
                            </div>
                        </>
                    ) : (
                        filteredList?.map((list, i) => (
                            <div
                                key={list.id || i}
                                tabIndex={0}
                                className="flex flex-col md:flex-row items-start md:items-center text-sm border-b border-gray-100 py-4 hover:bg-gray-50 "
                            >
                                <div className="w-full md:w-[5%] px-3">
                                    <span className="md:hidden text-gray-500 font-medium">
                                        #{" "}
                                    </span>
                                    {i + 1}
                                </div>
                                <div className="w-full md:w-[15%] px-3">
                                    <span className="md:hidden text-gray-500 font-medium">
                                        名稱：
                                    </span>
                                    {list.title}
                                </div>
                                <div className="w-full md:w-[15%] px-3">
                                    <span className="md:hidden text-gray-500 font-medium">
                                        代號：
                                    </span>
                                    {list.group_uuid}
                                </div>
                                <div className="w-full md:w-[15%] px-3">
                                    <span className="md:hidden text-gray-500 font-medium">
                                        餐廳：
                                    </span>
                                    {list.restaurant}
                                </div>
                                {/* <div className="w-full md:w-[8%] px-3">
                                    <span className="md:hidden text-gray-500 font-medium">
                                        上限：
                                    </span>
                                    {list.max_people}
                                </div> */}
                                <div className="w-full md:w-[17%] px-3">
                                    <span className="md:hidden text-gray-500 font-medium">
                                        截止：
                                    </span>
                                    {moment(list.deadline).format(
                                        "YYYY/MM/DD HH:mm"
                                    )}
                                </div>
                                <div className="w-full md:w-[10%]  mt-2 md:mt-0 px-3">
                                    <span className="md:hidden text-gray-500 font-medium">
                                        狀態：
                                    </span>
                                    {list.status === "closed" ? (
                                        <span className="py-1 px-2 text-xs text-red-700 bg-red-100 rounded">
                                            已截止
                                        </span>
                                    ) : (
                                        <span className="py-1 px-2 text-xs text-green-700 bg-green-100 rounded">
                                            開放中
                                        </span>
                                    )}
                                </div>
                                <div className="w-full md:w-[10%] mt-2 md:mt-0 px-3">
                                    <span className="md:hidden text-gray-500 font-medium">
                                        查看：
                                    </span>
                                    <button
                                        className="text-xs text-gray-600 py-1 px-4 bg-gray-100 rounded hover:bg-gray-200"
                                        onClick={() => {
                                            onEnter(
                                                list.group_uuid,
                                                list.password
                                            );
                                        }}
                                    >
                                        view
                                    </button>
                                </div>
                                <div
                                    className="w-full md:w-[6%] px-3 cursor-pointer flex md:block items-center hover:text-primary"
                                    onClick={() => {
                                        editInfo(list);
                                    }}
                                >
                                    <span className="md:hidden text-gray-500 font-medium">
                                        編輯
                                    </span>
                                    <FaEdit className="mx-2" />
                                </div>
                                <div
                                    className="w-full md:w-[6%] px-3 cursor-pointer flex md:block items-center hover:text-primary md:ml-2"
                                    onClick={() => {
                                        handleShare(list.group_uuid);
                                    }}
                                >
                                    <span className="md:hidden text-gray-500 font-medium">
                                        分享
                                    </span>
                                    <IoShareSocialSharp />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <EditModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                editData={editData}
                setRefresh={setRefresh}
            />
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
}
