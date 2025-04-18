import React from "react";

export default function Total({ summary = {} }) {
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-gray-600 text-sm font-medium mb-1">
                        總訂購數量
                    </h3>
                    <div className="flex items-center justify-between">
                        <p className="text-xl font-semibold text-gray-800">
                            {summary.totalQty} 件
                        </p>
                        <span className="text-2xl text-primary">📦</span>
                    </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-gray-600 text-sm font-medium mb-1">
                        總金額
                    </h3>
                    <div className="flex items-center justify-between">
                        <p className="text-xl font-semibold text-gray-800">
                            NT$ {summary.totalPrice.toLocaleString()}
                        </p>
                        <span className="text-2xl text-green-500">💰</span>
                    </div>
                </div>
            </div>
        </>
    );
}
