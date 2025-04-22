"use client";
import React, { useState, useEffect, useRef } from "react";
import {
    ORDER_LIST_GET,
    ORDER_TEMPLATE_GET,
    ORDER_DETAIL_GET,
} from "@/config/api-path";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import OrderSelect from "./_components/select";
import GroupTable from "./_components/table";
import Announcement from "./_components/announcement";
import Total from "./_components/total";
import DownloadButton from "./_components/download";
import ShareButton from "./_components/share";
import Search from "./_components/search";
import Sort from "./_components/sort";
import { useAuth } from "@/context/auth.js";
import { FaHome } from "react-icons/fa";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import Loader from "@/app/_components/loader";
export default function GroupListPage() {
    const { auth, getAuthHeader, logout } = useAuth();
    const [listData, setListData] = useState([]);
    const [templateData, setTemplateData] = useState([]);
    const [error, setError] = useState("");
    const [refresh, setRefresh] = useState(false);
    const [isEnd, setIsEnd] = useState(false); // 是否截止
    const router = useRouter();
    const { group_uuid } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState("all");
    const [announcement, setAnnouncement] = useState();
    const [isSearch, setIsSearch] = useState(""); // 搜尋
    const [sorting, setSorting] = useState(""); // 排序

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
    }, []);
    useEffect(() => {
        // 取得揪團詳細資訊
        const getFetchGroupInfo = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(
                    `${ORDER_DETAIL_GET}?group_uuid=${group_uuid}`
                );
                if (!res.ok) {
                    throw new Error("連接揪團資訊失敗");
                }
                const data = await res.json();
                setError(data.error);
                if (data.error == "查無此揪團") {
                    router.push("/join-group");
                }

                setAnnouncement(data?.data);
                if (data?.data?.status == "closed") {
                    setIsEnd(true);
                }
            } catch (err) {
                setError("連接揪團資訊時發生錯誤:", error);
            } finally {
                setIsLoading(false);
            }
        };
        getFetchGroupInfo();
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

    const filteredList = listData?.data
        ?.filter((item) => {
            if (filterStatus === "all") return true;
            return item.status === filterStatus;
        })
        ?.filter((item) => {
            const keyword = isSearch.toLowerCase();
            return (
                item.name?.toLowerCase().includes(keyword) ||
                item.item_name?.toLowerCase().includes(keyword)
            );
        })
        ?.sort((a, b) => {
            switch (sorting) {
                case "品項名稱":
                    return a.item_name.localeCompare(b.item_name, "zh-Hant", {
                        sensitivity: "base", // 忽略大小寫與重音符號
                        numeric: true, // 數值大小來排序含數字的字串
                    });
                case "訂購人姓名":
                    return a.name.localeCompare(b.name, "zh-Hant", {
                        sensitivity: "base",
                        numeric: true,
                    });
                case "最高金額":
                    return b.price - a.price;
                case "最低金額":
                    return a.price - b.price;
                default:
                    return 0; // 預設不排序
            }
        });
    // 獲取總額總數量
    const getTotalSummary = (data) => {
        if (!data || !Array.isArray(data))
            return { totalQty: 0, totalPrice: 0 };
        const summary = data.reduce(
            (acc, pre) => {
                acc.totalQty += pre.quantity;
                acc.totalPrice += pre.quantity * pre.price;
                if (pre.status === "Paid") {
                    acc.paid += pre.quantity * pre.price;
                } else {
                    acc.unpaid += pre.quantity * pre.price;
                }
                return acc;
            },
            { totalQty: 0, totalPrice: 0, paid: 0, unpaid: 0 }
        );
        return summary;
    };
    const summary = getTotalSummary(listData?.data);
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
            {isLoading ? (
                <div className="text-center mt-10">
                    <Loader />
                </div>
            ) : error === "查無此揪團" ? (
                <div className="sm:px-6 w-full ">沒有資料</div>
            ) : (
                <div className="sm:px-6 w-full ">
                    <div className="flex items-center justify-between gap-2">
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
                        <div className="hidden lg:flex lg:flex-1 lg:justify-end  mt-2">
                            {auth.id ? (
                                <>
                                    <Link
                                        href="/member-center"
                                        className="text-sm font-semibold mr-4 mt-2 text-gray-700"
                                    >
                                        H i ! {auth.name}
                                    </Link>
                                    <div
                                        className="text-sm  cursor-pointer hover:text-primary mt-2"
                                        onClick={logout}
                                    >
                                        {" "}
                                        登出{" "}
                                    </div>
                                </>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                    <Announcement announcement={announcement} />

                    <div className="px-4 md:px-8 py-4 md:py-3">
                        <div className="flex flex-col md:flex-row  items-end md:items-center justify-end">
                            <div className="flex items-center justify-end -order-first md:order-1 mt-3 md:mt-0 w-4/5 md:w-2/5">
                                <Search onSearch={setIsSearch} />
                            </div>
                            <div className="flex items-center justify-end -order-last md:order-1">
                                <Sort setSorting={setSorting} />
                                <DownloadButton onClick={handleDownload} />
                                <ShareButton group_uuid={group_uuid} />
                            </div>
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
                            endTime={announcement?.deadline}
                            isEnd={isEnd}
                        />
                        <div className="mt-7" ref={pdfRef}>
                            <GroupTable
                                filteredList={filteredList}
                                setRefresh={setRefresh}
                                refresh={refresh}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
