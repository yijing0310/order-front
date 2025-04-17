"use client";
import React, { useState } from "react";
import Link from "next/link";
import DrinkModal from "./modal";
export default function OrderSelect({
    setFilterStatus = () => {},
    filterStatus = "",
}) {
    const [showModal, setShowModal] = useState(false);

    const drinkTemplate = [
        { label: "訂購人", type: "text", required: true },
        { label: "今天要喝點", type: "text", required: true },
        {
            label: "甜度",
            type: "radio",
            options: ["無糖", "微糖", "半糖", "少糖", "全糖", "固定"],
            required: true,
        },
        {
            label: "冰塊",
            type: "radio",
            options: ["去冰", "微冰", "少冰", "正常冰", "固定", "熱飲"],
            required: true,
        },
        { label: "備註", type: "textarea" },
    ];
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
                                filterStatus == "open"
                                    ? "bg-primary text-white"
                                    : ""
                            }`}
                        >
                            <p>未付款</p>
                        </div>
                    </div>
                </div>
                <button
                    className="focus:ring-2 focus:ring-offset-2 focus:bg-third mt-4 sm:mt-0 inline-flex items-start justify-start px-3 py-2 bg-primary hover:bg-third focus:outline-none rounded"
                    onClick={() => {
                        setShowModal(true);
                    }}
                >
                    <p className="text-xl font-medium leading-none text-white">
                        +
                    </p>
                </button>
            </div>
            <DrinkModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                templateFields={drinkTemplate}
            />
        </>
    );
}
