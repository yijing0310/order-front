"use client";
import React, { useState } from "react";

export default function GroupDetailSelect({
    setOrderBy = () => {},
    orderBy = "",
}) {
    return (
        <>
            {/* 篩選 */}
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <div
                        className={`rounded-full focus:outline-none focus:ring-2 focus:bg-third cursor-pointer`}
                        onClick={() => {
                            setOrderBy("person");
                        }}
                    >
                        <div
                             className={`py-2 px-5  rounded-full hover:bg-third  hover:text-white ${
                                orderBy == "person"
                                    ? "bg-primary text-white"
                                    : ""
                            }`}
                        >
                            <p>我要統計</p>
                        </div>
                    </div>
                    <div className="rounded-full focus:outline-none focus:ring-2 focus:bg-third  ml-1 sm:ml-3 cursor-pointer">
                        <div
                            className={`py-2 px-5  rounded-full hover:bg-third  hover:text-white ${
                                orderBy == "item"
                                    ? "bg-primary text-white"
                                    : ""
                            }`}
                            onClick={() => {
                                setOrderBy("item");
                            }}
                        >
                            <p>老闆點餐</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
