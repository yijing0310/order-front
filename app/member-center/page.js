"use client";
import React, { useState, useEffect } from "react";
import { GROUP_GET } from "@/config/api-path";
import Select from "./_components/select";
import Table from "./_components/table";
import MeberCenterSearch from "./_components/search";
import MemberSort from "./_components/sort";
import { useAuth } from "@/context/auth.js";
import { useRouter } from "next/navigation";
export default function MemberCenterPage() {
    const { auth, getAuthHeader } = useAuth();
    const [listData, setListData] = useState([]);
    const [error, setError] = useState("");
    const router = useRouter();
    const [filterStatus, setFilterStatus] = useState("all");
    const [refresh, setRefresh] = useState(false);
    const [isSearch, setIsSearch] = useState(""); // 搜尋
    const [sorting, setSorting] = useState(""); // 排序

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
    }, [auth, getAuthHeader, refresh]);
    const filteredList = listData?.data
        ?.filter((item) => {
            if (filterStatus === "all") return true;
            return item.status === filterStatus;
        })
        ?.filter((item) => {
            const keyword = isSearch.toLowerCase();
            return (
                item.title?.toLowerCase().includes(keyword) ||
                item.restaurant?.toLowerCase().includes(keyword)
            );
        })
        ?.sort((a, b) => {
            switch (sorting) {
                case "最新截止日":
                    return new Date(b.deadline) - new Date(a.deadline);
                case "最舊截止日":
                    return new Date(a.deadline) - new Date(b.deadline);
                case "揪團名稱":
                    return a.title.localeCompare(b.title, "zh-Hant", {
                        sensitivity: "base", // 忽略大小寫與重音符號
                        numeric: true, // 數值大小來排序含數字的字串
                    });
                case "餐廳名稱":
                    return a.restaurant.localeCompare(b.restaurant, "zh-Hant", {
                        sensitivity: "base",
                        numeric: true,
                    });
                default:
                    return 0; // 預設不排序
            }
        });

    return (
        <>
            <div className="sm:px-6 w-full">
                <div className="px-4 md:px-10 py-4 md:py-7 mt-5 md:mt-0">
                    <div className="flex md:flex-row flex-col md:gap-0 gap-3  md:items-center justify-between">
                        <p
                            tabIndex={0}
                            className="focus:outline-none  text-xl lg:text-2xl font-bold leading-normal"
                        >
                            我的揪團
                        </p>
                        <div className=" flex  items-center gap-4 md:gap-0">
                            <MeberCenterSearch onSearch={setIsSearch} />
                            <MemberSort setSorting={setSorting} />
                        </div>
                    </div>
                </div>
                <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10 mb-7">
                    <Select
                        setFilterStatus={setFilterStatus}
                        filterStatus={filterStatus}
                    />
                    <div className="mt-7 overflow-x-auto ">
                        <Table
                            filteredList={filteredList}
                            setRefresh={setRefresh}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
