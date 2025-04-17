"use client";
import moment from "moment";
export default function Table({filteredList=[]}) {
    return (
        <>
            <table className="w-full whitespace-nowrap">
                <thead>
                    <tr
                        tabIndex={0}
                        className="focus:outline-none h-16 border border-gray-100 rounded"
                    >
                        <td className="px-2 ml-2">#</td>
                        <td className="px-3 ">揪團名稱</td>
                        <td className="px-3 ">揪團代號</td>
                        <td className="px-3 ">餐廳名稱</td>
                        <td className="px-3 ">揪團上限</td>
                        <td className="px-3">結束時間</td>
                        <td className="pl-5 ">狀態</td>
                        <td className="pl-4 ">查看</td>
                    </tr>
                </thead>
                <tbody>
                    {filteredList?.map((list, i) => {
                        return (
                                <tr
                                    tabIndex={0}
                                    className="focus:outline-none h-16 border border-gray-100 rounded "
                                    key={list.id || i}
                                >
                                    <td className="px-2 ml-2">{i + 1}</td>
                                    <td className="px-3">{list.title}</td>
                                    <td className="px-3">{list.group_uuid}</td>
                                    <td className="px-3">{list.restaurant}</td>
                                    <td className="px-3">{list.max_people}</td>
                                    <td className="px-3 text-sm">
                                        {moment(list.deadline).format(
                                            "YYYY/MM/DD HH:mm"
                                        )}
                                    </td>
                                    <td className="pl-5">
                                        {list.status == "closed" ? (
                                            <button className="py-3 px-3 text-sm focus:outline-none leading-none text-red-700 bg-red-100 rounded cursor-default">
                                                已截止
                                            </button>
                                        ) : list.status == "open" ? (
                                            <button className="py-3 px-3 text-sm focus:outline-none leading-none text-green-700 bg-green-100 rounded cursor-default">
                                                開放中
                                            </button>
                                        ) : (
                                            ""
                                        )}
                                    </td>
                                    <td className="pl-4">
                                        <button className="focus:ring-2 focus:ring-offset-2 focus:ring-red-300 text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none">
                                            View
                                        </button>
                                    </td>
                                </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}
