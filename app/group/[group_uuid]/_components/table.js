"use client";
import { TOGGLE_STATUS } from "@/config/api-path";
export default function GroupTable({
    filteredList = [],
    setRefresh = () => {},
}) {
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

    return (
        <>
            <div className="w-full overflow-x-auto ">
                {/* 表頭 */}
                <div className="hidden md:flex bg-gray-100 font-medium text-sm border-y border-gray-200 py-3 min-w-[800px]">
                    <div className="w-[5%] px-2">#</div>
                    <div className="w-[15%] px-3">項目</div>
                    <div className="w-[10%] px-3">金額</div>
                    <div className="w-[10%] px-3">數量</div>
                    <div className="w-[15%] px-3">訂購人</div>
                    <div className="w-[10%] px-3">總額</div>
                    <div className="w-[10%] pl-5">狀態</div>
                    <div className="w-[15%] pl-4">備註</div>
                </div>
                {/* 內容 */}
                <div className="max-h-[400px] overflow-y-auto min-w-[800px]">
                    {filteredList?.length <= 0 ? (
                        <>
                            <div className="hidden md:flex font-medium text-sm border-y py-5 px-3 min-w-[800px]">
                                空空的，快來點餐吧
                            </div>
                        </>
                    ) : (
                        filteredList?.map((list, i) => (
                            <div
                                tabIndex={0}
                                className="flex flex-col md:flex-row items-start md:items-center text-sm border-b border-gray-100 py-4 hover:bg-gray-50 min-w-[800px]"
                                key={list.id}
                            >
                                <div className="w-full md:w-[5%] px-2">
                                    <span className="md:hidden text-gray-500 font-medium">
                                        #{" "}
                                    </span>
                                    {i + 1}
                                </div>
                                <div className="w-full md:w-[15%] px-3">
                                    <span className="md:hidden text-gray-500 font-medium">
                                        項目：
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
                                <div className="w-full md:w-[15%] px-3">
                                    <span className="md:hidden text-gray-500 font-medium">
                                        訂購人：
                                    </span>
                                    {list.name}
                                </div>
                                <div className="w-full md:w-[10%] px-3">
                                    <span className="md:hidden text-gray-500 font-medium">
                                        總額：
                                    </span>
                                    ${" "}
                                    {parseInt(list.quantity) *
                                        parseInt(list.price, 10)}
                                </div>
                                <div className="w-full md:w-[10%] pl-5 mt-2 md:mt-0">
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
                                <div className="w-full md:w-[15%] pl-4 mt-2 md:mt-0">
                                    <span className="md:hidden text-gray-500 font-medium">
                                        備註：
                                    </span>
                                    {list.note}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            {/* 統計資料區塊 */}
            {filteredList.length > 0 && (
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
