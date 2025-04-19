"use client";
import React, { useState, useEffect } from "react";
import { GROUP_GET } from "@/config/api-path";
import Select from "./_components/select";
import Table from "./_components/table";
import { useAuth } from "@/context/auth.js";
import { useRouter } from "next/navigation";

export default function MemberCenterPage() {
    const { auth, getAuthHeader } = useAuth();
    const [listData, setListData] = useState([]);
    const [error, setError] = useState("");
    const router = useRouter();
    const [filterStatus, setFilterStatus] = useState("all");
    const [refresh, setRefresh] = useState(false);
    useEffect(() => {
        // if (!auth.id) {
        //     router.push("/");
        // }
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
    }, [auth, getAuthHeader,refresh]);
    const filteredList = listData?.data?.filter((item) => {
        if (filterStatus === "all") return true;
        return item.status === filterStatus;
    });

    return (
        <>
            <div className="sm:px-6 w-10/12">
                <div className="px-4 md:px-10 py-4 md:py-7">
                    <div className="flex items-center justify-between">
                        <p
                            tabIndex={0}
                            className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal"
                        >
                            我的揪團
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
                <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10 mb-7">
                    <Select
                        setFilterStatus={setFilterStatus}
                        filterStatus={filterStatus}
                    />
                    <div className="mt-7 overflow-x-auto ">
                        <Table filteredList={filteredList} setRefresh={setRefresh}/>
                    </div>
                </div>
            </div>
        </>
    );
}
