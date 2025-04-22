"use client";
import React, { useState } from "react";
import OrderModal from "./modal";
export default function OrderSelect({
    setFilterStatus = () => {},
    filterStatus = "",
    templateData = [],
    setRefresh = () => {},
    refresh = false,
    endTime = "",
    isEnd = false,
}) {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            {/* 篩選 */}
            <div className="flex items-center justify-between">
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
                            setFilterStatus("Paid");
                        }}
                    >
                        <div
                            className={`py-2 px-5  rounded-full hover:bg-third  hover:text-white ${
                                filterStatus == "Paid"
                                    ? "bg-primary text-white"
                                    : ""
                            }`}
                        >
                            <p>已付款</p>
                        </div>
                    </div>
                    <div
                        className="rounded-full focus:outline-none focus:ring-2 focus:bg-third  ml-1 sm:ml-3 cursor-pointer"
                        onClick={() => {
                            setFilterStatus("Non-payment");
                        }}
                    >
                        <div
                            className={`py-2 px-5  rounded-full hover:bg-third  hover:text-white ${
                                filterStatus == "Non-payment"
                                    ? "bg-primary text-white"
                                    : ""
                            }`}
                        >
                            <p>未付款</p>
                        </div>
                    </div>
                </div>
                <button
                    className="focus:ring-2 focus:ring-offset-2 focus:bg-third inline-flex items-start justify-start px-3 py-2 bg-primary hover:bg-third focus:outline-none rounded"
                    onClick={() => {
                        setShowModal(true);
                    }}
                >
                    <p className="text-xl font-medium leading-none text-white">
                        +
                    </p>
                </button>
            </div>
            <OrderModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                templateFields={templateData}
                setRefresh={setRefresh}
                refresh={refresh}
                endTime={endTime}
                isEnd={isEnd}
            />
        </>
    );
}
