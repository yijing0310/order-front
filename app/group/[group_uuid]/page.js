"use client";
import React, { useState, useEffect } from "react";
import { ORDER_LIST_GET, ORDER_TEMPLATE_GET } from "@/config/api-path";
import OrderSelect from "./_components/select";
import GroupTable from "./_components/table";
import { useAuth } from "@/context/auth.js";
import { useRouter, useParams } from "next/navigation";

export default function GroupListPage() {
    const { auth, getAuthHeader } = useAuth();
    const [listData, setListData] = useState([]);
    const [templateData, setTemplateData] = useState([]);
    const [error, setError] = useState("");
    const [refresh, setRefresh] = useState(false);
    const router = useRouter();
    const { group_uuid } = useParams();

    const [filterStatus, setFilterStatus] = useState("all");
    useEffect(() => {
        // 取得訂餐列表
        const getFetchOrderList = async () => {
            try {
                const res = await fetch(
                    `${ORDER_LIST_GET}?group_uuid=${group_uuid}`
                );
                if (!res.ok) {
                    throw new Error("取得訂餐列表請求失敗");
                }
                const data = await res.json();
                setListData(data);
            } catch (err) {
                setError("取得訂餐列表發送請求時發生錯誤:", error);
            }
        };
        getFetchOrderList();
    }, [refresh]);
    useEffect(() => {
        // 取得訂餐模板
        const getFetchOrderTemplate = async () => {
            try {
                const res = await fetch(
                    `${ORDER_TEMPLATE_GET}?group_uuid=${group_uuid}`
                );
                if (!res.ok) {
                    throw new Error("取得訂餐模板請求失敗");
                }
                const data = await res.json();
                setTemplateData(data?.data?.fields);
            } catch (err) {
                setError("訂餐模板發送請求時發生錯誤:", error);
            }
        };
        getFetchOrderTemplate();
    }, []);
    const filteredList = listData?.data?.filter((item) => {
        if (filterStatus === "all") return true;
        return item.status === filterStatus;
    });

    return (
        <>
            <div className="sm:px-6 w-full">
                <div className="px-4 md:px-10 py-4 md:py-7">
                    <div className="flex items-center justify-between">
                        <p
                            tabIndex={0}
                            className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal"
                        >
                            麻古
                        </p>
                        <div className="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
                            <p>Sort By:</p>
                            <select
                                aria-label="select"
                                className="focus:text-indigo-600 focus:outline-none bg-transparent ml-1"
                            >
                                <option className="text-sm text-indigo-800">
                                    Latest
                                </option>
                                <option className="text-sm text-indigo-800">
                                    Oldest
                                </option>
                                <option className="text-sm text-indigo-800">
                                    Latest
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
                    <OrderSelect
                        setFilterStatus={setFilterStatus}
                        filterStatus={filterStatus}
                        templateData={templateData}
                        setRefresh={setRefresh}
                        refresh={refresh}
                    />
                    <div className="mt-7 overflow-x-auto">
                        <GroupTable filteredList={filteredList} />
                    </div>
                </div>
            </div>
        </>
    );
}
