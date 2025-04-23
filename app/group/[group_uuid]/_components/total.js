import React from "react";
import { useGroup } from "@/context/group.js";

export default function Total() {
    const { summary } = useGroup();
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:my-6 mb-4 mt-2">
            {/* 總數量 */}
            <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-gray-600 text-sm font-medium mb-1">
                    總訂購數量
                </h3>
                <div className="flex items-center justify-between">
                    <p className="text-xl font-semibold text-gray-800">
                        {summary.totalQty} 件
                    </p>
                    <span className="text-2xl">📦</span>
                </div>
            </div>

            {/* 總金額 */}
            <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-gray-600 text-sm font-medium mb-1">
                    總金額
                </h3>
                <div className="flex items-center justify-between">
                    <p className="text-xl font-semibold text-gray-800">
                        NT$ {summary.totalPrice?.toLocaleString()}
                    </p>
                    <span className="text-2xl text-green-500">💰</span>
                </div>
            </div>

            {/* 已付款金額 */}
            <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-gray-600 text-sm font-medium mb-1">
                    已付款金額
                </h3>
                <div className="flex items-center justify-between">
                    <p className="text-xl text-gray-800">
                        NT$ {summary.paid?.toLocaleString() || 0}
                    </p>
                    <span className="text-2xl text-green-600">✅</span>
                </div>
            </div>

            {/* 未付款金額 */}
            <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-gray-600 text-sm font-medium mb-1">
                    未付款金額
                </h3>
                <div className="flex items-center justify-between">
                    <p className="text-xl  text-gray-800">
                        NT$ {summary.unpaid?.toLocaleString() || 0}
                    </p>
                    <div className="w-6 h-6 flex items-center justify-center bg-red-500 text-white rounded">
                        ✖
                    </div>
                </div>
            </div>
        </div>
    );
}
