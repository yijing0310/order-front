"use client";
import { useState, useRef, useEffect } from "react";
import { TOGGLE_STATUS } from "@/config/api-path";
import { DELETE_ORDER } from "@/config/api-path";
import { FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";
import { useGroup } from "@/context/group.js";

export default function GroupTable({
    setIsDowload = () => {},
    isDowload = false,
}) {
    const { filteredList, setRefresh, announcement } = useGroup();
    const [height, setHeight] = useState(0);
    const tableRef = useRef();
    useEffect(() => {
        if (tableRef.current) {
            setHeight(tableRef.current.scrollHeight);
        }
    }, []);

    const toggleStatus = async (orderId, status) => {
        try {
            const res = await fetch(TOGGLE_STATUS, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ order_id: orderId, status }),
            });

            if (!res.ok) {
                throw new Error("更新狀態失敗");
            }

            const result = await res.json();
            if (result.success) {
                setRefresh((prev) => !prev);
            } else {
                console.error(result.error || "更新失敗");
            }
        } catch (err) {
            console.error("請求錯誤:", err);
        }
    };

    const handleDelete = async (orderId) => {
        Swal.fire({
            title: "確定要刪除此筆資料嗎?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "刪除",
            cancelButtonText: "取消",
            confirmButtonColor: "#DBB5B5",
            reverseButtons: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await fetch(DELETE_ORDER, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ order_id: orderId }),
                    });

                    const data = await res.json();

                    if (data.success) {
                        Swal.fire({
                            title: "刪除成功",
                            icon: "success",
                            confirmButtonColor: "#DBB5B5",
                        });
                        setRefresh?.((prev) => !prev);
                    } else {
                        Swal.fire({
                            title: "刪除失敗",
                            text: data.error || "請稍後再試",
                            icon: "error",
                        });
                    }
                } catch (err) {
                    Swal.fire({
                        title: "發生錯誤",
                        text: err.message || "無法連接伺服器",
                        icon: "error",
                    });
                }
            }
        });
    };

    // 下載內容
    const pdfRef = useRef();
    const totalRef = useRef();
    const titleRef = useRef();

    useEffect(() => {
        const handleDownload = async () => {
            const html2pdf = (await import("html2pdf.js")).default;
            const element = pdfRef.current;
            const contentElement = tableRef.current;
            const totalElement = totalRef.current;
            const titleElement = titleRef.current;

            if (!element || !contentElement || !totalElement || !titleElement)
                return;

            // 取得實際高度
            const fullHeight = contentElement.scrollHeight;

            // 儲存原始樣式
            const originalContentStyle = {
                maxHeight: contentElement.style.maxHeight,
                overflow: contentElement.style.overflow,
            };
            const originalPdfStyle = {
                maxHeight: element.style.maxHeight,
                overflow: element.style.overflow,
            };

            // 展開高度
            contentElement.style.maxHeight = `${fullHeight}px`;
            contentElement.style.overflow = "visible";

            element.style.maxHeight = "auto";
            element.style.overflow = "visible";

            totalElement.style.display = "flex";
            titleElement.style.display = "block";

            const opt = {
                margin: 0.4,
                filename: `${announcement.title}.pdf`,
                image: { type: "jpeg", quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: {
                    unit: "in",
                    format: "letter",
                    orientation: "portrait",
                },
            };

            await html2pdf().set(opt).from(element).save();

            // 還原樣式
            contentElement.style.maxHeight = originalContentStyle.maxHeight;
            contentElement.style.overflow = originalContentStyle.overflow;

            element.style.maxHeight = originalPdfStyle.maxHeight;
            element.style.overflow = originalPdfStyle.overflow;

            totalElement.style.display = "none";
            titleElement.style.display = "none";

            setIsDowload(false);
        };

        if (isDowload) {
            handleDownload();
        }
    }, [isDowload]);

    return (
        <>
            <div className="w-full overflow-x-auto " ref={pdfRef}>
                {/* 標題區塊(列印用) */}
                <div
                    className=" text-lg text-gray-800 px-2  hidden mb-5"
                    ref={titleRef}
                >
                    <p>
                        ◆ {announcement?.title} &nbsp;&nbsp;&nbsp;(
                        {announcement?.restaurant})
                    </p>
                </div>
                {/* 表頭 */}
                <div
                    className={`hidden md:flex bg-gray-100 font-medium text-sm border-y border-gray-200 py-3 min-w-[800px] `}
                >
                    <div className="w-[5%] px-2">#</div>
                    <div className="w-[10%] px-3">訂購人</div>
                    <div className="w-[15%] px-3">品項</div>
                    <div className="w-[10%] px-3">金額</div>
                    <div className="w-[10%] px-3">數量</div>
                    <div className="w-[10%] px-3">總額</div>
                    <div className="w-[10%] pl-5">狀態</div>
                    <div className="w-[18%] pl-4">備註</div>
                    <div
                        className={`w-[8%]  ${
                            parseInt(height) <= 400 ? "pl-5" : "pl-3"
                        }`}
                    >
                        刪除
                    </div>
                </div>
                {/* 內容 */}
                <div
                    className={`max-h-[400px] overflow-y-auto min-w-[800px] `}
                    ref={tableRef}
                >
                    {filteredList?.length <= 0 ? (
                        <>
                            <div className="hidden md:flex font-medium text-sm border-y py-5 px-3 ">
                                空空的，快來點餐吧
                            </div>
                        </>
                    ) : (
                        filteredList?.map((list, i) => (
                            <div
                                tabIndex={0}
                                className="flex flex-col md:flex-row items-start md:items-center text-sm border-b border-gray-100 py-4 hover:bg-gray-50 "
                                key={list.id}
                            >
                                <div className="w-full md:w-[5%] px-2">
                                    <span className="md:hidden text-gray-500 font-medium">
                                        #{" "}
                                    </span>
                                    {i + 1}
                                </div>
                                <div className="w-full md:w-[10%] px-3">
                                    <span className="md:hidden text-gray-500 font-medium">
                                        訂購人：
                                    </span>
                                    {list.name}
                                </div>
                                <div className="w-full md:w-[15%] px-3">
                                    <span className="md:hidden text-gray-500 font-medium">
                                        品項：
                                    </span>
                                    {list.item_name}
                                </div>
                                <div className="w-full md:w-[10%] px-3">
                                    <span className="md:hidden text-gray-500 font-medium">
                                        金額：
                                    </span>
                                    $ {parseInt(list.price, 10)}
                                </div>
                                <div className="w-full md:w-[10%] px-3">
                                    <span className="md:hidden text-gray-500 font-medium">
                                        數量：
                                    </span>
                                    {list.quantity}
                                </div>

                                <div className="w-full md:w-[10%] px-3">
                                    <span className="md:hidden text-gray-500 font-medium">
                                        總額：
                                    </span>
                                    ${" "}
                                    {parseInt(list.quantity) *
                                        parseInt(list.price, 10)}
                                </div>
                                <div className="w-full md:w-[10%] md:pl-4 mt-2 md:mt-0 md:px-0 px-3 ">
                                    <span className="md:hidden text-gray-500 font-medium">
                                        狀態：
                                    </span>
                                    {list.status === "Paid" ? (
                                        <span
                                            className="py-1 px-2 text-xs text-green-700 bg-green-100 rounded cursor-pointer"
                                            onClick={() => {
                                                toggleStatus(
                                                    list.id,
                                                    list.status
                                                );
                                            }}
                                        >
                                            已付款
                                        </span>
                                    ) : (
                                        <span
                                            className="py-1 px-2 text-xs text-red-700 bg-red-100 rounded cursor-pointer"
                                            onClick={() => {
                                                toggleStatus(
                                                    list.id,
                                                    list.status
                                                );
                                            }}
                                        >
                                            未付款
                                        </span>
                                    )}
                                </div>
                                <div className="w-full md:w-[18%] md:pl-4 mt-2 md:mt-0 px-3">
                                    <span className="md:hidden text-gray-500 font-medium">
                                        備註：
                                    </span>
                                    {list.note}
                                </div>
                                <div
                                    className={`w-full md:w-[8%] md:pl-4 mt-2 md:mt-0 px-3 ${
                                        parseInt(height) <= 400 ? "" : "md:ml-2"
                                    }`}
                                >
                                    <span className="md:hidden text-gray-500 font-medium">
                                        刪除：
                                    </span>
                                    <button
                                        onClick={() => {
                                            handleDelete(list.id);
                                        }}
                                        title="刪除此筆資料"
                                        className="hover:text-red-700 transition-colors ml-2"
                                    >
                                        <FaTrashCan className="text-lg" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                {/* 統計資料區塊(列印用) */}
                {filteredList?.length > 0 && (
                    <>
                        <hr />
                        <div
                            className=" flex-col items-end mt-4 gap-2 text-sm text-gray-800 px-2 md:px-6 hidden"
                            ref={totalRef}
                        >
                            <div className="bg-white  px-4 py-1  flex items-center gap-2">
                                <span className="text-gray-600">總件數：</span>
                                <span className="font-semibold">
                                    {filteredList.reduce(
                                        (acc, pre) => acc + pre.quantity,
                                        0
                                    )}{" "}
                                    件
                                </span>
                            </div>
                            <div className="bg-white px-4 py-1 flex items-center gap-2">
                                <span className="text-gray-600">總金額：</span>
                                <span className="font-semibold ">
                                    NT${" "}
                                    {filteredList
                                        .reduce(
                                            (acc, pre) =>
                                                acc +
                                                pre.quantity *
                                                    parseInt(pre.price, 10),
                                            0
                                        )
                                        .toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </>
                )}
            </div>
            {/* 統計資料區塊 */}
            {filteredList?.length > 0 && (
                <div className="flex flex-col items-end mt-4 gap-2 text-sm text-gray-800 px-2 md:px-6">
                    <div className="bg-white  px-4 py-1  flex items-center gap-2">
                        <span className="text-gray-600">總件數：</span>
                        <span className="font-semibold">
                            {filteredList.reduce(
                                (acc, pre) => acc + pre.quantity,
                                0
                            )}{" "}
                            件
                        </span>
                    </div>
                    <div className="bg-white px-4 py-1 flex items-center gap-2">
                        <span className="text-gray-600">總金額：</span>
                        <span className="font-semibold ">
                            NT${" "}
                            {filteredList
                                .reduce(
                                    (acc, pre) =>
                                        acc +
                                        pre.quantity * parseInt(pre.price, 10),
                                    0
                                )
                                .toLocaleString()}
                        </span>
                    </div>
                </div>
            )}
        </>
    );
}
