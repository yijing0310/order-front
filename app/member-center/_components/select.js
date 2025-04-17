"use client";
import React from "react";
import Link from "next/link";
export default function Select({
    setFilterStatus = () => {},
    filterStatus = "",
}) {
    return (
        <>
            {/* 篩選 */}
            <div className="sm:flex items-center justify-between">
                <div className="flex items-center">
                    <div
                        className={`rounded-full focus:outline-none focus:ring-2 focus:bg-third cursor-pointer`}
                        onClick={() => {
                            setFilterStatus("all");
                        }}
                    >
                        <div
                            className={`py-2 px-5  rounded-full hover:bg-third  hover:text-white ${
                                filterStatus == "all"
                                    ? "bg-primary text-white"
                                    : ""
                            }`}
                        >
                            <p>全部</p>
                        </div>
                    </div>
                    <div
                        className="rounded-full focus:outline-none focus:ring-2 focus:bg-third  ml-1 sm:ml-3 cursor-pointer"
                        onClick={() => {
                            setFilterStatus("closed");
                        }}
                    >
                        <div
                            className={`py-2 px-5  rounded-full hover:bg-third  hover:text-white ${
                                filterStatus == "closed"
                                    ? "bg-primary text-white"
                                    : ""
                            }`}
                        >
                            <p>已截止</p>
                        </div>
                    </div>
                    <div
                        className="rounded-full focus:outline-none focus:ring-2 focus:bg-third  ml-1 sm:ml-3 cursor-pointer"
                        onClick={() => {
                            setFilterStatus("open");
                        }}
                    >
                        <div
                            className={`py-2 px-5  rounded-full hover:bg-third  hover:text-white ${
                                filterStatus == "open"
                                    ? "bg-primary text-white"
                                    : ""
                            }`}
                        >
                            <p>進行中</p>
                        </div>
                    </div>
                </div>
                <Link href="/member-center/add-group">
                    <button
                        onclick="popuphandler(true)"
                        className="focus:ring-2 focus:ring-offset-2 focus:bg-third mt-4 sm:mt-0 inline-flex items-start justify-start px-3 py-2 bg-primary hover:bg-third focus:outline-none rounded"
                    >
                        <p className="text-xl font-medium leading-none text-white">
                            +
                        </p>
                    </button>
                </Link>
            </div>
        </>
    );
}
