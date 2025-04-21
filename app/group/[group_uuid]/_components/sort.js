"use client";
import React, { useState } from "react";

export default function Sort({ setSorting }) {
    const [isSort, setIsSort] = useState("預設"); // 排序

    const onSort = (e) => {
        const value = e.target.value;
        setIsSort(value);
        setSorting(value);
    };
    return (
        <div className="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded w-[70%]">
            <p>Sort By:</p>
            <select
                aria-label="select"
                className=" focus:outline-none bg-transparent ml-1"
                onChange={onSort}
                value={isSort}
            >
                <option value="預設" className="text-sm ">
                    請選擇排序方式
                </option>
                <option value="品項名稱" className="text-sm ">
                    品項名稱
                </option>
                <option value="訂購人姓名" className="text-sm ">
                    訂購人姓名
                </option>
                <option value="最高金額" className="text-sm ">
                    最高金額
                </option>
                <option value="最低金額" className="text-sm ">
                    最低金額
                </option>
            </select>
        </div>
    );
}
