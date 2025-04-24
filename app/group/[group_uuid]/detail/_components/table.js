"use client";
import { useRef, useEffect } from "react";
import { useGroup } from "@/context/group.js";

export default function GroupDetailTable({
    setIsDowload = () => {},
    isDowload = false,
}) {
    const { filteredList, announcement } = useGroup();
    const summarizeByPerson = (orders) => {
        const summary = {};

        orders?.forEach((order) => {
            const name = order.name;
            const item = order.item_name;
            const price = parseFloat(order.price);
            const qty = order.quantity || 1;
            const note = order.note;
            const status = order.status;
            const id = order.id;
            if (!summary[name]) {
                summary[name] = {
                    total: 0,
                    count: 0,
                    items: [],
                    statusList: [],
                    orderIds: [],
                };
            }

            summary[name].total += price * qty;
            summary[name].count += qty;
            summary[name].statusList.push(status);
            summary[name].orderIds.push(id);
            note
                ? summary[name].items.push(`${item} x${qty} / ${note}`)
                : summary[name].items.push(`${item} x${qty} `);
        });

        return Object.entries(summary).map(([name, data]) => ({
            name,
            total: `${data.total.toLocaleString()} 元`,
            quantity: data.count,
            details: data.items.join(",\n"),
            allPaid: data.statusList.every((s) => s === "Paid"),
            orderIds: data.orderIds,
        }));
    };
    const result = summarizeByPerson(filteredList);
    // 下載內容
    const pdfRef = useRef();
    const totalRef = useRef();
    const titleRef = useRef();
    const tableRef = useRef();
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
                <div className="hidden md:flex bg-gray-100 font-medium text-sm border-y border-gray-200 py-3 min-w-[800px]">
                    <div className="w-[5%] px-2">#</div>
                    <div className="w-[15%] px-3">訂購人</div>
                    <div className="w-[15%] px-3">總金額</div>
                    <div className="w-[15%] px-3">總數量</div>
                    <div className="w-[30%] pl-4">訂單明細</div>
                    <div className="w-[10%] pl-5">狀態</div>
                </div>
                {/* 內容 */}
                <div
                    className="max-h-[400px] overflow-y-auto min-w-[800px]"
                    ref={tableRef}
                >
                    {result?.length <= 0 ? (
                        <>
                            <div className="hidden md:flex font-medium text-sm border-y py-5 px-3 ">
                                空空的，快來點餐吧
                            </div>
                        </>
                    ) : (
                        result?.map((list, i) => (
                            <div
                                tabIndex={0}
                                className="flex flex-col md:flex-row items-start md:items-center text-sm border-b border-gray-100 py-4 hover:bg-gray-50 "
                                key={i}
                            >
                                <div className="w-full md:w-[5%] px-2">
                                    <span className="md:hidden text-gray-500 font-medium">
                                        #{" "}
                                    </span>
                                    {i + 1}
                                </div>
                                <div className="w-full md:w-[15%] px-3">
                                    <span className="md:hidden text-gray-500 font-medium">
                                        訂購人：
                                    </span>
                                    {list.name}
                                </div>

                                <div className="w-full md:w-[15%] px-3">
                                    <span className="md:hidden text-gray-500 font-medium">
                                        總金額：
                                    </span>
                                    {list.total}
                                </div>
                                <div className="w-full md:w-[15%] px-3">
                                    <span className="md:hidden text-gray-500 font-medium">
                                        總數量：
                                    </span>
                                    {list.quantity}
                                </div>
                                <div className="w-full md:w-[30%] md:pl-4 mt-2 md:mt-0 px-3 whitespace-pre-line">
                                    <span className="md:hidden text-gray-500 font-medium">
                                        訂單明細：
                                    </span>
                                    {list.details}
                                </div>

                                <div className="w-full md:w-[10%] md:pl-4 mt-2 md:mt-0">
                                    <span className="md:hidden text-gray-500 font-medium">
                                        狀態：
                                    </span>
                                    {list.allPaid ? (
                                        <span className="py-1 px-2 text-xs text-green-700 bg-green-100 rounded ">
                                            已付款
                                        </span>
                                    ) : (
                                        <span className="py-1 px-2 text-xs text-red-700 bg-red-100 rounded ">
                                            未付款
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
                {/* 統計資料區塊(列印用) */}
                {filteredList?.length > 0 && (
                    <>
                        <br />
                        <br />
                        <div
                            className=" flex-col items-end mt-7 gap-2 text-sm text-gray-800 px-2 md:px-6 hidden "
                            ref={totalRef}
                        >
                            <div className="bg-white  px-4 py-1  flex items-center gap-2 mt-20">
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
