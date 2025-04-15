'use client'
import React from "react";

export default function Select() {
    return (
        <>
            {/* 篩選 */}
            <div className="sm:flex items-center justify-between">
                <div className="flex items-center">
                    <div
                        className="rounded-full focus:outline-none focus:ring-2   focus:bg-third"
                        href=" javascript:void(0)"
                    >
                        <div className="py-2 px-5 bg-primary text-white rounded-full hover:bg-third  hover:text-white ">
                            <p>全部</p>
                        </div>
                    </div>
                    <div
                        className="rounded-full focus:outline-none focus:ring-2 focus:bg-third  ml-1 sm:ml-3"
                        href="javascript:void(0)"
                    >
                        <div className="py-2 px-5  hover:bg-third hover:text-white rounded-full ">
                            <p>已完成</p>
                        </div>
                    </div>
                    <div
                        className="rounded-full focus:outline-none focus:ring-2 focus:bg-third  ml-1 sm:ml-3"
                        href="javascript:void(0)"
                    >
                        <div className="py-2 px-5  hover:bg-third hover:text-white rounded-full ">
                            <p>進行中</p>
                        </div>
                    </div>
                </div>
                <button
                    onclick="popuphandler(true)"
                    className="focus:ring-2 focus:ring-offset-2 focus:bg-third mt-4 sm:mt-0 inline-flex items-start justify-start px-3 py-2 bg-primary hover:bg-third focus:outline-none rounded"
                >
                    <p className="text-xl font-medium leading-none text-white">
                        +
                    </p>
                </button>
            </div>
        </>
    );
}
