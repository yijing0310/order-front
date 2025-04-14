import React from "react";

export default function Table() {
    return (
        <>
            <table className="w-full whitespace-nowrap">
                <thead>
                    <tr
                        tabIndex={0}
                        className="focus:outline-none h-16 border border-gray-100 rounded"
                    >
                        <td className="px-2">#</td>
                        <td className="px-3 ">揪團名稱</td>
                        <td className="px-3 ">揪團上限</td>
                        <td className="px-3">結束時間</td>
                        <td className="pl-5 ">狀態</td>
                        <td className="pl-4 ">查看</td>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        tabIndex={0}
                        className="focus:outline-none h-16 border border-gray-100 rounded  "
                    >
                        <td className="px-2">1</td>
                        <td className="px-3">丹丹漢堡</td>
                        <td className="px-3  ">20</td>
                        <td className="px-3 text-sm">
                            2024/4/20 13:00
                        </td>
                        <td className="pl-5">
                            <button className="py-3 px-3 text-sm focus:outline-none leading-none text-red-700 bg-red-100 rounded">
                                今日截止
                            </button>
                        </td>
                        <td className="pl-4">
                            <button className="focus:ring-2 focus:ring-offset-2 focus:ring-red-300 text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none">
                                View
                            </button>
                        </td>
                        <td>
                            <div className="relative px-5 pt-2">
                                <button
                                    className="focus:ring-2 rounded-md focus:outline-none"
                                    onclick="dropdownFunction(this)"
                                    role="button"
                                    aria-label="option"
                                ></button>
                                <div className="dropdown-content bg-white shadow w-24 absolute z-30 right-0 mr-6 hidden">
                                    <div
                                        tabIndex={0}
                                        className="focus:outline-none focus:text-indigo-600 text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white"
                                    >
                                        <p>Edit</p>
                                    </div>
                                    <div
                                        tabIndex={0}
                                        className="focus:outline-none focus:text-indigo-600 text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white"
                                    >
                                        <p>Delete</p>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}
