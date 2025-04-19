"use client";
import moment from "moment";
import Link from "next/link";
import { FaTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
export default function Table({ filteredList = [] }) {
    return (
        <>
            <div className="w-full overflow-x-auto">
                {/* 表頭 */}
                <div className="hidden md:flex bg-gray-100 font-medium text-sm border-y border-gray-200 py-3 min-w-[800px]">
                    <div className="w-[5%] px-2">#</div>
                    <div className="w-[15%] px-3">揪團名稱</div>
                    <div className="w-[13%] px-3">揪團代號</div>
                    <div className="w-[15%] px-3">餐廳名稱</div>
                    <div className="w-[8%] px-3">上限</div>
                    <div className="w-[15%] px-3">結束時間</div>
                    <div className="w-[9%] pl-5">狀態</div>
                    <div className="w-[9%] pl-4">查看</div>
                    <div className="w-[5%] pl-2">編輯</div>
                    <div className="w-[5%] px-2">刪除</div>
                </div>
                {/* 內容 */}
                <div className="max-h-[400px] overflow-y-auto min-w-[800px]">
                    {filteredList?.length <= 0 ? (
                        <>
                            <div className="hidden md:flex font-medium text-sm border-y py-5 px-3 min-w-[800px]">
                                空空的，快來揪團吧
                            </div>
                        </>
                    ) : (
                        filteredList?.map((list, i) => (
                            <div
                                key={list.id || i}
                                tabIndex={0}
                                className="flex flex-col md:flex-row items-start md:items-center text-sm border-b border-gray-100 py-4 hover:bg-gray-50 min-w-[800px]"
                            >
                                <div className="w-full md:w-[5%] px-2">
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
                                <div className="w-full md:w-[13%] px-3">
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
                                <div className="w-full md:w-[8%] px-3">
                                    <span className="md:hidden text-gray-500 font-medium">
                                        上限：
                                    </span>
                                    {list.max_people}
                                </div>
                                <div className="w-full md:w-[15%] px-3">
                                    <span className="md:hidden text-gray-500 font-medium">
                                        截止：
                                    </span>
                                    {moment(list.deadline).format(
                                        "YYYY/MM/DD HH:mm"
                                    )}
                                </div>
                                <div className="w-full md:w-[9%] pl-5 mt-2 md:mt-0">
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
                                <div className="w-full md:w-[9%] pl-4 mt-2 md:mt-0">
                                    <Link href={`/group/${list.group_uuid}`}>
                                        <button className="text-xs text-gray-600 py-1 px-4 bg-gray-100 rounded hover:bg-gray-200">
                                            view
                                        </button>
                                    </Link>
                                </div>
                                <div className="w-full md:w-[5%] px-3 ">
                                    <span className="md:hidden text-gray-500 font-medium">
                                        編輯
                                    </span>
                                    <FaEdit className="mx-2"/>
                                </div>
                                <div className="w-full md:w-[5%] px-3">
                                    <span className="md:hidden text-gray-500 font-medium">
                                        刪除
                                    </span>
                                    <FaTrashCan className="mx-2"/>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}
