"use client";
import React, { useState, useEffect } from "react";
import { GROUP_GET } from "@/config/api-path";
import { useAuth } from "@/context/auth.js";
import moment from "moment";
export default function Table() {
    const { auth, getAuthHeader } = useAuth();
    const [listData, setListData] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const getFetchGroup = async () => {
            try {
                const res = await fetch(GROUP_GET, {
                    headers: { ...getAuthHeader() },
                });
                if (!res.ok) {
                    throw new Error("請求失敗");
                }
                const data = await res.json();
                setListData(data);
            } catch (err) {
                setError("發送請求時發生錯誤:", error);
            }
        };
        getFetchGroup();
    }, [auth, getAuthHeader]);
    return (
        <>
            <table className="w-full whitespace-nowrap">
                <thead>
                    <tr
                        tabIndex={0}
                        className="focus:outline-none h-16 border border-gray-100 rounded"
                    >
                        <td className="px-2">#</td>
                        <td className="px-3 ">揪團名稱</td>
                        <td className="px-3 ">餐廳名稱</td>
                        <td className="px-3 ">揪團上限</td>
                        <td className="px-3">結束時間</td>
                        <td className="pl-5 ">狀態</td>
                        <td className="pl-4 ">查看</td>
                    </tr>
                </thead>
                <tbody>
                    {listData?.data?.map((list, i) => {
                        return (
                            <>
                                <tr
                                    tabIndex={0}
                                    className="focus:outline-none h-16 border border-gray-100 rounded  "
                                >
                                    <td className="px-2">{i + 1}</td>
                                    <td className="px-3">{list.title}</td>
                                    <td className="px-3">{list.restaurant}</td>
                                    <td className="px-3">{list.max_people}</td>
                                    <td className="px-3 text-sm">
                                        {moment(list.deadline).format(
                                            "YYYY/MM/DD HH:mm"
                                        )}
                                    </td>
                                    <td className="pl-5">
                                        {list.status == "closed" ? (
                                            <button className="py-3 px-3 text-sm focus:outline-none leading-none text-red-700 bg-red-100 rounded">
                                                已截止
                                            </button>
                                        ) : list.status == "open" ? (
                                            <button className="py-3 px-3 text-sm focus:outline-none leading-none text-green-700 bg-green-100 rounded">
                                                開放中
                                            </button>
                                        ) : (
                                            ""
                                        )}
                                    </td>
                                    <td className="pl-4">
                                        <button className="focus:ring-2 focus:ring-offset-2 focus:ring-red-300 text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none">
                                            View
                                        </button>
                                    </td>
                                </tr>
                            </>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}
