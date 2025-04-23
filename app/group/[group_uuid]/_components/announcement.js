import React from "react";
import moment from "moment";
import "moment/locale/zh-tw";

export default function Announcement({ announcement }) {
    moment.locale("zh-tw");
    return (
        <div className="   w-full bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 my-4 ">
            <p className="font-semibold text-lg">📢 訂購公告</p>
            <ul className="mt-1 ml-4 list-disc text-sm">
                <li className="mb-1">
                    <strong>主旨：</strong>
                    {announcement?.title}
                </li>
                <li className="mb-1">
                    <strong>餐廳：</strong>
                    {announcement?.restaurant}
                </li>
                {announcement?.menu_link ? (
                    <li className="mb-1">
                        <strong>菜單連結：</strong>
                        <a
                            href={`${announcement?.menu_link}`}
                            target="_blank"
                            className="hover:text-blue-500"
                        >
                            {announcement?.menu_link}
                        </a>
                    </li>
                ) : (
                    ""
                )}
                <li className="mb-1">
                    <strong>狀態：</strong>
                    {announcement?.status === "open" ? (
                        <span className="py-1 px-2 text-xs text-green-700 bg-green-100 rounded">
                            開放中
                        </span>
                    ) : announcement?.status === "closed" ? (
                        <span className="py-1 px-2 text-xs text-red-700 bg-red-100 rounded">
                            已截止
                        </span>
                    ) : (
                        "無"
                    )}
                </li>
                <li className="mb-1">
                    <strong>截止時間：</strong>
                    {moment(announcement?.deadline).format(
                        "YYYY/MM/DD (dddd)  HH:mm"
                    )}
                    {moment(announcement?.deadline).isSame(moment(), "day") &&
                        "（今日）"}
                </li>
                <li className="mb-1">
                    <strong>備註：</strong>
                    {announcement?.description}
                </li>
            </ul>
        </div>
    );
}
