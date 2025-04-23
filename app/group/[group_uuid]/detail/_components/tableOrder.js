"use client";
import { TOGGLE_STATUS } from "@/config/api-path";
import { DELETE_ORDER } from "@/config/api-path";
import Swal from "sweetalert2";
import { useGroup } from "@/context/group.js";

export default function GroupDetailTableByItem() {
    const { filteredList, setRefresh } = useGroup();
    const summarizeByItemDetailWithNames = (orders) => {
        const summary = {};

        orders?.forEach((order) => {
            const item = order.item_name;
            const note = order.note;
            const price = parseFloat(order.price);
            const qty = order.quantity || 1;

            const name = qty > 1 ? `${order.name}(${qty})` : order.name;

            const key = note ? `${item} / ${note}` : item;

            if (!summary[key]) {
                summary[key] = {
                    quantity: 0,
                    total: 0,
                    names: new Set(),
                };
            }

            summary[key].quantity += qty;
            summary[key].total += price * qty;
            summary[key].names.add(name);
        });

        return Object.entries(summary).map(([detail, data]) => ({
            detail,
            quantity: data.quantity,
            total: `${data.total.toLocaleString()} 元`,
            names: Array.from(data.names).join("、"),
        }));
    };

    const result = summarizeByItemDetailWithNames(filteredList);
    // console.table(result);

    

    return (
        <>
            <div className="w-full overflow-x-auto ">
                {/* 表頭 */}
                <div className="hidden md:flex bg-gray-100 font-medium text-sm border-y border-gray-200 py-3 min-w-[800px]">
                    <div className="w-[5%] px-2">#</div>
                    <div className="w-[22%] pl-4">訂單明細</div>
                    <div className="w-[12%] px-3">總數量</div>
                    <div className="w-[12%] px-3">總金額</div>
                    <div className="flex-1 px-3">訂購人</div>
                </div>
                {/* 內容 */}
                <div className="max-h-[400px] overflow-y-auto min-w-[800px]">
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
                                key={list.detail}
                            >
                                <div className="w-full md:w-[5%] px-2">
                                    <span className="md:hidden text-gray-500 font-medium">
                                        #{" "}
                                    </span>
                                    {i + 1}
                                </div>
                                <div className="w-full md:w-[22%] md:pl-4 mt-2 md:mt-0 px-3 whitespace-pre-line">
                                    <span className="md:hidden text-gray-500 font-medium">
                                        訂單明細：
                                    </span>
                                    {list.detail}
                                </div>

                                <div className="w-full md:w-[12%] px-3">
                                    <span className="md:hidden text-gray-500 font-medium">
                                        總數量：
                                    </span>
                                    {list.quantity}
                                </div>
                                <div className="w-full md:w-[12%] px-3">
                                    <span className="md:hidden text-gray-500 font-medium">
                                        總金額：
                                    </span>
                                    {list.total}
                                </div>
                                <div className="w-full md:flex-1 px-3">
                                    <span className="md:hidden text-gray-500 font-medium">
                                        訂購人：
                                    </span>
                                    {list.names}
                                </div>
                                
                            </div>
                        ))
                    )}
                </div>
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
