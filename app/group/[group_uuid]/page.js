"use client";
import React, { useState, useEffect, useRef } from "react";
// import html2pdf from "html2pdf.js";
import {
    ORDER_LIST_GET,
    ORDER_TEMPLATE_GET,
    ORDER_DETAIL_GET,
} from "@/config/api-path";
import Link from "next/link";
import OrderSelect from "./_components/select";
import GroupTable from "./_components/table";
import Announcement from "./_components/announcement";
import Total from "./_components/total";
import DownloadButton from "./_components/download";
import ShareButton from "./_components/share";
import { useAuth } from "@/context/auth.js";
import { useRouter, useParams } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { MdOutlineRestaurantMenu } from "react-icons/md";
export default function GroupListPage() {
    const { auth, getAuthHeader } = useAuth();
    const [listData, setListData] = useState([]);
    const [templateData, setTemplateData] = useState([]);
    const [error, setError] = useState("");
    const [refresh, setRefresh] = useState(false);
    const [isEnd, setIsEnd] = useState(false); // 是否截止
    const router = useRouter();
    const { group_uuid } = useParams();

    const [filterStatus, setFilterStatus] = useState("all");
    const [announcement, setAnnouncement] = useState();

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
                setTemplateData(data?.data);
            } catch (err) {
                setError("訂餐模板發送請求時發生錯誤:", error);
            }
        };
        getFetchOrderTemplate();
        // 取得揪團詳細資訊
        const getFetchGroupInfo = async () => {
            try {
                const res = await fetch(
                    `${ORDER_DETAIL_GET}?group_uuid=${group_uuid}`
                );
                if (!res.ok) {
                    throw new Error("連接揪團資訊失敗");
                }
                const data = await res.json();
                setAnnouncement(data?.data);
                if (data?.data?.status == "closed") {
                    setIsEnd(true);
                }
            } catch (err) {
                setError("連接揪團資訊時發生錯誤:", error);
            }
        };
        getFetchGroupInfo();
    }, []);
    const filteredList = listData?.data?.filter((item) => {
        if (filterStatus === "all") return true;
        return item.status === filterStatus;
    });
    // 獲取總額總數量
    const getTotalSummary = (data) => {
        if (!data || !Array.isArray(data))
            return { totalQty: 0, totalPrice: 0 };
        const summary = data.reduce(
            (acc, pre) => {
                acc.totalQty += pre.quantity;
                acc.totalPrice += pre.quantity * pre.price;
                return acc;
            },
            { totalQty: 0, totalPrice: 0 }
        );
        return summary;
    };
    const summary = getTotalSummary(filteredList);
    // 下載內容
    const pdfRef = useRef();

    const handleDownload = async () => {
        const html2pdf = (await import("html2pdf.js")).default;
        const element = pdfRef.current;
        const opt = {
            margin: 0.4,
            filename: `${announcement.title}.pdf`,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        };
        html2pdf().set(opt).from(element).save();
    };

    return (
        <>
            <div className="sm:px-6 w-full">
                <div className="flex items-center gap-2">
                    <Link
                        href="/"
                        className="w-[90px] flex items-center text-sm mt-2 hover:text-primary"
                    >
                        <FaHome /> &nbsp;&nbsp;{" "}
                        <span className="mt-2 ">回到首頁</span>
                    </Link>

                    <Link
                        href="/join-group"
                        className="w-[120px] flex items-center text-sm mt-2 hover:text-primary"
                    >
                        <MdOutlineRestaurantMenu /> &nbsp;&nbsp;{" "}
                        <span className="mt-2">其他揪團點餐</span>
                    </Link>
                </div>
                <Announcement announcement={announcement} />

                <div className="px-4 md:px-8 py-4 md:py-3">
                    <div className="flex items-center justify-end">
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
                        <DownloadButton onClick={handleDownload} />
                        <ShareButton />
                    </div>
                </div>
                <Total summary={summary} />
                <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10 mb-6">
                    <OrderSelect
                        setFilterStatus={setFilterStatus}
                        filterStatus={filterStatus}
                        templateData={templateData}
                        setRefresh={setRefresh}
                        refresh={refresh}
                        isEnd={isEnd}
                    />
                    <div className="mt-7 overflow-x-auto" ref={pdfRef}>
                        <GroupTable filteredList={filteredList} />
                    </div>
                </div>
            </div>
            
        </>
    );
}
